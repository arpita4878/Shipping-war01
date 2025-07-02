import './MyProduct.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { __productapiurl, __categoryapiurl, __subcategoryapiurl } from '../../../API_URL';
import { useParams, Link } from 'react-router-dom';

function MyProduct() {

  const [pList, setProList] = useState([]);
  const [cList, setCatList] = useState([]);
  const [scList, setSubCatList] = useState([]);
  const [editData, setEditData] = useState();
  const [formData, setformData] = useState({
    title: '',
    catnm: '',
    subcatnm: '',
    baseamount: '',
    auctionprice: ''
  });


  useEffect(() => {
    axios.get(__categoryapiurl + "fetch").then((response) => {
      setCatList(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  //subcat
  useEffect(() => {
    if (formData.catnm) {
      axios.get(__subcategoryapiurl + "fetch", {
        params: { "catnm": formData.catnm }
      }).then((response) => {
        setSubCatList(response.data)
      }).catch((error) => {
        console.log(error);
      })
    }
    else
      setSubCatList([]);//clear sub cat if cat is clear

  }, [formData.catnm])


  //fetch product 
  const email = localStorage.getItem('email')

  useEffect(() => {

    axios.get(__productapiurl + "fetch", {
      params: { "useremail": email }
    }).then((response) => {
      // console.log(response.data);

      setProList(response.data)
    }).catch((error) => {
      console.log(error);

    })

  })

  //for bid status button
  const manageBidding = (_id, s) => {

    if (s == 'inactive') {
      Swal.fire({
        title: "Are You Sure?",
        text: "This will deactivate bidding!!, If you want to activate again it work only 48h",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, I want to deactivate it!"
      }).then((response) => {
        if (response.isConfirmed) {
          const update_details = {
            condition_obj: { "_id": _id },
            content_obj: { "bid_status": 0 }
          }

          axios.patch(__productapiurl + "update", update_details).then((response) => {
            Swal.fire("Deactivated!", "Bidding deactivated successfully", "info");
          })

        }
      })

    }




    if (s == 'active') {
      Swal.fire({
        title: "Are You Sure?",
        text: "You want to  activate bidding again!!!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, I want to activate it!"
      }).then((response) => {
        if (response.isConfirmed) {
          const update_details = {
            condition_obj: { "_id": _id },
            content_obj: { "bid_status": 1 }
          }

          axios.patch(__productapiurl + "update", update_details).then((response) => {
            Swal.fire("Activated!", "Bidding activated successfully", "success");
          })

        }
      })

    }


  }


  //edit

  const handleEdit = (row) => {
    setEditData(row._id);
    setformData({
      title: row.title,
      catnm: row.catnm,
      subcatnm: row.subcatnm,
      baseamount: row.baseamount,
      auctionprice: row.auctionprice,
    });
  };


  const handleSave = (_id) => {
    const update_details = {
      condition_obj: { "_id": _id },
      content_obj: {
        title: formData.title,
        catnm: formData.catnm,
        subcatnm: formData.subcatnm,
        baseamount: formData.baseamount,
        auctionprice: formData.auctionprice
      }
    };

    axios.patch(__productapiurl + "update", update_details).then((response) => {
      Swal.fire("Updated", "Product Detail Updated", "success");
      setEditData(null); //  Exit edit mode
    }).catch((error) => {
      console.log(error);

    })


    // Refresh product list
    axios.get(__productapiurl + "fetch", {
      params: { "useremail": email }
    }).then((response) => {
      setProList(response.data)
    }).catch((error) => {
      console.log(error);

    })

  }







  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">


            {/* Text with fade-left animation */}
            <div className="col-lg-12" >

              <h2 className="text-light text-uppercase fw-bold mb-3  ">My Product List &gt;&gt;</h2>

              <div className="table-responsive">
                <table className="table table-striped table-dark align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Sub Category</th>
                      <th scope="col">Base Amount</th>
                      <th scope="col">Bidding status</th>
                      <th scope="col">Document File</th>
                      <th scope="col">Bidding Status </th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pList.length == 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center">No products found</td>
                      </tr>) :
                      (
                        pList.map((row) => (
                          <tr >
                            <td>{row._id}</td>
                            <td>
                              <img
                                src={`/assests/upload/Shipment_image/${row.shipment_imagenm}`}
                                alt={row.title}
                                style={{ maxWidth: '100px', maxHeight: '80px', objectFit: 'cover', borderRadius: '6px' }}
                              />
                            </td>
                            <td>
                              {editData == row._id ? (
                                <input type="text"
                                  value={formData.title}
                                  onChange={(e) => setformData({ ...formData, title: e.target.value })}
                                  className="form-control"
                                />
                              ) : (

                                row.title
                              )}
                            </td>


                            <td>{editData == row._id ? (
                              <select
                                value={formData.catnm}
                                onChange={(e) => setformData({ ...formData, catnm: e.target.value })}
                                className="form-control"  >

                                <option value="">Select Category</option>
                                {
                                  cList.map((row) => (
                                    <option value={row.catnm}>{row.catnm}</option>
                                  ))
                                }
                              </select>
                            ) : (

                              row.catnm
                            )}</td>



                            <td>{editData == row._id ? (
                              <select
                                value={formData.subcatnm}
                                onChange={(e) => setformData({ ...formData, subcatnm: e.target.value })}
                                className="form-control"  >

                                <option value="">Select Sub Category</option>
                                {
                                  scList.map((row) => (
                                    <option value={row.subcatnm}>{row.subcatnm}</option>
                                  ))
                                }
                              </select>
                            ) : (

                              row.subcatnm
                            )}</td>


                            <td>{editData == row._id ? (
                              <input type="text"
                                value={formData.baseamount}
                                onChange={(e) => setformData({ ...formData, baseamount: e.target.value })}
                                className="form-control"
                              />
                            ) : (

                              row.baseamount
                            )}</td>


                            <td>
                              <Link to={`/viewbids/${row._id}`}  
                              className='btn btn-sm btn-outline-info'>View Bids/Allotment</Link>
                              </td>



                            <td>
                              {row.description_filenm ? (
                                <a
                                  href={`/assests/upload/description_file/${row.description_filenm}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-outline-light" >
                                  View Doc
                                </a>
                              ) : 'N/A'}
                            </td>

                            <td> <label className="switch"><input
                              type="checkbox"
                              checked={row.bid_status == 1}
                              onChange={() =>
                                manageBidding(row._id, row.bid_status == 1 ? 'inactive' : 'active')
                              } />
                              <span className="slider round"></span>
                            </label>
                            </td>

                            <td>{editData == row._id ? (
                              <>
                                <button className="btn btn-sm btn-success me-1"
                                  onClick={() => handleSave(row._id)}>Save</button>

                                <button className="btn btn-sm btn-secondary me-1"
                                  onClick={() => setEditData(null)}>Cancel</button>
                              </>
                            ) : (
                              <button className='btn btn-sm btn-outline-warning'
                                onClick={() => handleEdit(row)} disabled={row.bid_status == 0}>
                                <i className='fa fa-edit'></i>
                              </button>
                            )
                            }
                            </td>

                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProduct;
