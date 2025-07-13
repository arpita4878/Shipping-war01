import './Available.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { __bidapiurl, __productapiurl } from '../../../API_URL';
import { Link } from 'react-router-dom';

function AvailableProduct() {
  const [pList, setProList] = useState([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axios.get(__productapiurl + 'fetch').then((response) => {
      const allProduct = response.data;
      const active = allProduct.filter(p => p.bid_status == 1);
      const deactive = allProduct.filter(p => p.bid_status == 0);
      const sorted = [...active, ...deactive];
      setProList(sorted);
    }).catch((error) => {
      console.log(error);
    });
  };

  const getRemainingTime = (row) => {
    if (row.bid_status !== 1) return 'Expired';
    const createTime = new Date(row.info).getTime();
    const expiryTime = createTime + 48 * 60 * 60 * 1000;
    const now = Date.now();
    const remaining = expiryTime - now;

    if (remaining <= 0) return 'Expired';

    const hours = Math.floor((remaining % (1000 * 60 * 60 * 48)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      checkBidTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [pList]);

  const checkBidTime = () => {
    const now = Date.now();
    pList.forEach((row) => {
      if (row.bid_status == 1) {
        const createTime = new Date(row.info).getTime();
        const expireTime = createTime + 48 * 60 * 60 * 1000;

        if (now >= expireTime) {
          const updateDetails = {
            condition_obj: { "_id": row._id },
            content_obj: { "bid_status": 0 }
          };
          axios.patch(__productapiurl + "update", updateDetails).then(() => {
            fetchProduct();
          }).catch((error) => {
            console.log("failed to update bid status", error);
          });
        }
      }
    });
  };

  return (
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5 align-items-center">
          <div class="col-lg-12"></div>
          <div className="container py-5 light-theme">
            <h2 className="mb-4 text-center text-uppercase fw-bold">Product List &gt;&gt;</h2>
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Sub Category</th>
                    <th>Base Amount</th>
                    <th>Bidding Time</th>
                    <th>Bidding</th>
                    <th>Doc File</th>
                    <th>Bid Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pList.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center py-4">No products found</td>
                    </tr>
                  ) : (
                    pList.map(row => (
                      <tr key={row._id}>
                        <td data-label="Id">{row._id}</td>
                        <td data-label="Image">
                          <img
                            src={`https://shipping-war01.onrender.com/upload/Shipment_image/${row.shipment_imagenm}`}
                            alt={row.title}
                            style={{ maxWidth: '100px', maxHeight: '80px', objectFit: 'cover', borderRadius: '6px' }}
                          />
                        </td>
                        <td data-label="Title">{row.title}</td>
                        <td data-label="Category">{row.catnm}</td>
                        <td data-label="Sub Category">{row.subcatnm}</td>
                        <td data-label="Base Amount">{row.baseamount}</td>
                        <td data-label="Bidding Time" className="timer-flash">{getRemainingTime(row)}</td>
                        <td data-label="Bidding">
                          {row.bid_status == 1 ? (
                            <Link to={`/bidding/${row._id}`} className="btn btn-sm btn-outline-primary">
                              Participate
                            </Link>
                          ) : row.alloted_to ? (
                            <button className="btn btn-sm btn-success" disabled>
                              Allotted
                            </button>
                          ) : (
                            <button className="btn btn-sm btn-secondary" disabled>
                              Closed
                            </button>
                          )}
                        </td>
                        <td data-label="Doc File">
                          {row.bid_status == 1 ? (
                            <Link
                              to={`https://shipping-war01.onrender.com/upload/description_file/${row.description_filenm}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              View Doc
                            </Link>
                          ) : 'Not Available'}
                        </td>
                        <td data-label="Bid Status">
                          {row.bid_status == 1 ? (
                            <span className="badge bg-success">Active</span>
                          ) : (
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
    
  );
}

export default AvailableProduct;
