import './MyProduct.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { __productapiurl, __categoryapiurl, __subcategoryapiurl } from '../../../API_URL';
import { Link } from 'react-router-dom';

function MyProduct() {
  const [pList, setProList] = useState([]);
  const [cList, setCatList] = useState([]);
  const [scList, setSubCatList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [formData, setformData] = useState({
    title: '',
    catnm: '',
    subcatnm: '',
    baseamount: '',
    auctionprice: ''
  });

  const email = localStorage.getItem('email');

  useEffect(() => {
    axios.get(__categoryapiurl + "fetch").then(res => setCatList(res.data)).catch(console.log);
  }, []);

  useEffect(() => {
    if (formData.catnm) {
      axios.get(__subcategoryapiurl + "fetch", {
        params: { catnm: formData.catnm }
      }).then(res => setSubCatList(res.data)).catch(console.log);
    } else setSubCatList([]);
  }, [formData.catnm]);

  const fetchProducts = () => {
    axios.get(__productapiurl + "fetch", {
      params: { useremail: email }
    }).then(res => setProList(res.data)).catch(console.log);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const manageBidding = (_id, s) => {
    Swal.fire({
      title: "Are You Sure?",
      text: s === 'inactive' ? "This will deactivate bidding!" : "You want to activate bidding again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: s === 'inactive' ? "Yes, Deactivate!" : "Yes, Activate!"
    }).then((result) => {
      if (result.isConfirmed) {
        const update_details = {
          condition_obj: { "_id": _id },
          content_obj: { "bid_status": s === 'inactive' ? 0 : 1 }
        };
        axios.patch(__productapiurl + "update", update_details).then(() => {
          Swal.fire(s === 'inactive' ? "Deactivated!" : "Activated!", "", s === 'inactive' ? "info" : "success");
          fetchProducts();
        });
      }
    });
  };

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
      content_obj: formData
    };

    axios.patch(__productapiurl + "update", update_details)
      .then(() => {
        Swal.fire("Updated", "Product updated successfully", "success");
        setEditData(null);
        fetchProducts();
      })
      .catch(console.log);
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        <h2 className="text-primary text-uppercase fw-bold mb-4">My Product List &gt;&gt;</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle bg-white">
            <thead className="table-light">
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Title</th>
                <th className="d-none d-sm-table-cell">Category</th>
                <th className="d-none d-sm-table-cell">Sub Category</th>
                <th className="d-none d-sm-table-cell">Base Amount</th>
                <th>View Bids</th>
                <th className="d-none d-sm-table-cell">Document</th>
                <th>Bidding</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {pList.length === 0 ? (
                <tr><td colSpan="10" className="text-center text-muted">No products found</td></tr>
              ) : (
                pList.map(row => (
                  <tr key={row._id}>
                    <td>{row._id}</td>
                    <td>
                      <img
                        src={`https://shipping-war01.onrender.com/upload/Shipment_image/${row.shipment_imagenm}`}
                        alt={row.title}
                        className="product-img"
                      />
                    </td>
                    <td>
                      {editData === row._id ? (
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setformData({ ...formData, title: e.target.value })}
                          className="form-control"
                        />
                      ) : row.title}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {editData === row._id ? (
                        <select
                          value={formData.catnm}
                          onChange={(e) => setformData({ ...formData, catnm: e.target.value })}
                          className="form-select"
                        >
                          <option value="">Select Category</option>
                          {cList.map(cat => (
                            <option key={cat.catnm} value={cat.catnm}>{cat.catnm}</option>
                          ))}
                        </select>
                      ) : row.catnm}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {editData === row._id ? (
                        <select
                          value={formData.subcatnm}
                          onChange={(e) => setformData({ ...formData, subcatnm: e.target.value })}
                          className="form-select"
                        >
                          <option value="">Select Sub Category</option>
                          {scList.map(sub => (
                            <option key={sub.subcatnm} value={sub.subcatnm}>{sub.subcatnm}</option>
                          ))}
                        </select>
                      ) : row.subcatnm}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {editData === row._id ? (
                        <input
                          type="text"
                          value={formData.baseamount}
                          onChange={(e) => setformData({ ...formData, baseamount: e.target.value })}
                          className="form-control"
                        />
                      ) : row.baseamount}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/viewbids/${row._id}`}
                        className="btn btn-sm btn-outline-primary w-100 responsive-button"
                      >
                        View Bids
                      </Link>
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {row.description_filenm ? (
                        <a
                          href={`https://shipping-war01.onrender.com/upload/description_file/${row.description_filenm}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View Doc
                        </a>
                      ) : 'N/A'}
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={row.bid_status === 1}
                          onChange={() => manageBidding(row._id, row.bid_status === 1 ? 'inactive' : 'active')}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>
                      {editData === row._id ? (
                        <>
                          <button className="btn btn-sm btn-success me-1" onClick={() => handleSave(row._id)}>Save</button>
                          <button className="btn btn-sm btn-secondary" onClick={() => setEditData(null)}>Cancel</button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => handleEdit(row)}
                          disabled={row.bid_status === 0}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyProduct;
