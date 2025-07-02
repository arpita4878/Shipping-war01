import './Available.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { __bidapiurl, __productapiurl } from '../../../API_URL';
import { Link } from 'react-router-dom';


function AvailableProduct() {

  const [pList, setProList] = useState([])
  const [tick, setTick] = useState(0);


  useEffect(() => {
    fetchProduct()
  }, [])


  const fetchProduct = () => {
    axios.get(__productapiurl + "fetch").then((response) => {

      const allProduct = response.data;

      const active = allProduct.filter(p => p.bid_status == 1)

      const deactive = allProduct.filter(p => p.bid_status == 0)

      const sorted = [...active, ...deactive]

      setProList(sorted)
    }).catch((error) => {
      console.log(error);
    })
  }



  //for timer
  const getRemainingTime = (row) => {
    if (row.bid_status !== 1) return 'Expired'
    const createTime = new Date(row.info).getTime();
    const expiryTime = createTime + 48 * 60 * 60 * 1000;
    const now = Date.now();
    const remaining = expiryTime - now;

    if (remaining <= 0) return 'Expired';

    const hours = Math.floor((remaining % (1000 * 60 * 60 * 48)) / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

    return `${hours}h  ${minutes}m ${seconds}s`

  }


  //update every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1)
      checkBidTime()
    }, 1000);

    return () => clearInterval(interval);//cleanup function
  }, [pList]);


  const checkBidTime = () => {
    const now = Date.now();
    pList.forEach((row) => {
      if (row.bid_status == 1) {
        const createTime = new Date(row.info).getTime()
        const expireTime = createTime + 48 * 60 * 60 * 1000;

        if (row.bid_status == 1 && now >= expireTime) {

          // //fetch lowest bidder
          // axios.get(__bidapiurl + "ftech", {
          //   params: { "p_id": row._id }
          // }).then((response) => {
          //   if (response.length == 0) return;

          //   //find lowest bidder
          //   let lowest_bid = response.data[0];
          //   for (let bid of response.data) {
          //     if (bid.bidamount < lowest_bid.bidamount) {
          //       lowest_bid = bid
          //     }
          //   }
          // })

          //Time over here update  status
          const updateDetails = {
            condition_obj: { "_id": row._id },
            content_obj: { "bid_status": 0  }
            //  , "alloted_to": lowest_bid.u_id
          }
          axios.patch(__productapiurl + "update", updateDetails).then((response) => {
            fetchProduct()
          }).catch((error) => {
            console.log("failed  to update bid status", error);
          })
        }
      }
    })
  }


  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">


            {/* Text with fade-left animation */}
            <div className="col-lg-12" >

              <h2 className="text-light text-uppercase fw-bold mb-3  ">Product List &gt;&gt;</h2>
              <br />
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
                      <th scope="col">Bidding Time</th>
                      <th scope="col">Bidding </th>
                      <th scope="col">Doc File</th>
                      <th scope="col">Bid Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pList.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center">No products found</td>
                      </tr>) :
                      (
                        pList.map(row => (
                          <tr >
                            <td>{row._id}</td>
                            <td>
                              <img
                                src={`/assests/upload/Shipment_image/${row.shipment_imagenm}`}
                                alt={row.title}
                                style={{ maxWidth: '100px', maxHeight: '80px', objectFit: 'cover', borderRadius: '6px' }}
                              />
                            </td>
                            <td>{row.title}</td>
                            <td>{row.catnm}</td>
                            <td>{row.subcatnm}</td>
                            <td>{row.baseamount}</td>
                            
                            <td className="timer-flash">{getRemainingTime(row)}</td>


                            <td>
                              {row.bid_status == 1 ? (
                                <Link to={`/bidding/${row._id}`} className="btn btn-sm btn-outline-warning">
                                  Participate
                                </Link>
                              ) : row.alloted_to ? (
                                <button className="btn btn-sm btn-success" disabled>
                                  Allotted
                                </button>
                              ) : (
                                <button className="btn btn-sm btn-outline-light" disabled>
                                  Closed
                                </button>
                              )}
                            </td>


                            <td>
                              {row.bid_status == 1 ? (
                                <Link
                                  to={`/assests/upload/description_file/${row.description_filenm}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-outline-light " >
                                  View Doc
                                </Link>
                              ) : 'Not Available'}
                            </td>

                            <td>
                              {row.bid_status == 1 ? (
                                <span className="badge bg-success">Active</span>
                              )  : (
                                <span className="badge bg-secondary">Deactive</span>
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
        </div>
      </div>
    </>
  );
}

export default AvailableProduct;
