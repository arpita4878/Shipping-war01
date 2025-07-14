import './Available.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { __productapiurl } from '../../../API_URL';
import { Link } from 'react-router-dom';

function AvailableProduct() {
  const [pList, setProList] = useState([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axios.get(__productapiurl + 'fetch')
      .then((response) => {
        const allProduct = response.data;
        const active = allProduct.filter(p => p.bid_status == 1);
        const deactive = allProduct.filter(p => p.bid_status == 0);
        const sorted = [...active, ...deactive];
        setProList(sorted);
      })
      .catch((error) => {
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
          axios.patch(__productapiurl + "update", updateDetails)
            .then(() => {
              fetchProduct();
            })
            .catch((error) => {
              console.log("failed to update bid status", error);
            });
        }
      }
    });
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h2 className="mb-4 text-center text-uppercase fw-bold">Product List &gt;&gt;</h2>

        {/* Table for medium and large screens */}
        <div className="table-responsive d-none d-md-block">
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
                    <td>{row._id}</td>
                    <td>
                      <img
                        src={`https://shipping-war01.onrender.com/upload/Shipment_image/${row.shipment_imagenm}`}
                        alt={row.title}
                        style={{
                          maxWidth: '100px',
                          maxHeight: '80px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                    </td>
                    <td>{row.title}</td>
                    <td>{row.catnm}</td>
                    <td>{row.subcatnm}</td>
                    <td>{row.baseamount}</td>
                    <td>{getRemainingTime(row)}</td>
                    <td>
                      {row.bid_status === 1 ? (
                        <Link to={`/bidding/${row._id}`} className="btn btn-sm btn-outline-primary">Participate</Link>
                      ) : row.alloted_to ? (
                        <button className="btn btn-sm btn-success" disabled>Allotted</button>
                      ) : (
                        <button className="btn btn-sm btn-secondary" disabled>Closed</button>
                      )}
                    </td>
                    <td>
                      {row.bid_status === 1 ? (
                        <a href={`https://shipping-war01.onrender.com/upload/description_file/${row.description_filenm}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">View Doc</a>
                      ) : 'Not Available'}
                    </td>
                    <td>
                      <span className={`badge ${row.bid_status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                        {row.bid_status === 1 ? 'Active' : 'Deactive'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Card view for small screens */}
        <div className="d-block d-md-none">
          {pList.length === 0 ? (
            <div className="text-center py-4">No products found</div>
          ) : (
            pList.map(row => (
              <div key={row._id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-start">
                    <img
                      src={`https://shipping-war01.onrender.com/upload/Shipment_image/${row.shipment_imagenm}`}
                      alt={row.title}
                      style={{
                        width: '100px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginRight: '15px'
                      }}
                    />
                    <div>
                      <h5 className="card-title">{row.title}</h5>
                      <p className="card-text mb-1"><strong>Category:</strong> {row.catnm}</p>
                      <p className="card-text mb-1"><strong>Sub Category:</strong> {row.subcatnm}</p>
                      <p className="card-text mb-1"><strong>Base Amount:</strong> {row.baseamount}</p>
                      <p className="card-text mb-1"><strong>Time Left:</strong> {getRemainingTime(row)}</p>
                      <div className="mb-2">
                        {row.bid_status === 1 ? (
                          <Link to={`/bidding/${row._id}`} className="btn btn-sm btn-primary me-2">Participate</Link>
                        ) : row.alloted_to ? (
                          <button className="btn btn-sm btn-success me-2" disabled>Allotted</button>
                        ) : (
                          <button className="btn btn-sm btn-secondary me-2" disabled>Closed</button>
                        )}
                        {row.bid_status === 1 ? (
                          <a href={`https://shipping-war01.onrender.com/upload/description_file/${row.description_filenm}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                            View Doc
                          </a>
                        ) : null}
                      </div>
                      <span className={`badge ${row.bid_status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                        {row.bid_status === 1 ? 'Active' : 'Deactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AvailableProduct;
