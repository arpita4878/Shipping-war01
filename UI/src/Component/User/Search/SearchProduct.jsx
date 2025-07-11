import './Search.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { __productapiurl } from '../../../API_URL';
import { useParams, Link } from 'react-router-dom';

function SearchProduct() {
  const { subcatnm } = useParams();
  const [pList, setProList] = useState([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    axios.get(__productapiurl + 'fetch', { params: { subcatnm } })
      .then((res) => setProList(res.data))
      .catch((err) => console.log(err));
  }, [subcatnm]);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = (row) => {
    if (row.bid_status !== 1) return 'Expired';
    const created = new Date(row.info).getTime();
    const expiry = created + 48 * 60 * 60 * 1000;
    const remaining = expiry - Date.now();
    if (remaining <= 0) return 'Expired';

    const h = Math.floor((remaining % (1000 * 60 * 60 * 48)) / (1000 * 60 * 60));
    const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((remaining % (1000 * 60)) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="search-section bg-light text-dark">
      <div className="container py-5">
        <Link to="/search" className="back-link">← Back to Categories</Link>
        <h2 className="section-title">Products in "{subcatnm}"</h2>

        <div className="table-responsive">
          <table className="table table-bordered align-middle table-hover">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Base Amount</th>
                <th>Bidding Time</th>
                <th>Bid</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {pList.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No products found.</td>
                </tr>
              ) : (
                pList.map((row) => (
                  <tr key={row._id}>
                    <td>
                      <img
                        src={`https://shipping-war01.onrender.com/upload/Shipment_image/${row.shipment_imagenm}`}
                        alt={row.title}
                        className="img-thumbnail"
                        style={{ width: '100px', height: '80px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>{row.title}</td>
                    <td>{row.catnm}</td>
                    <td>{row.subcatnm}</td>
                    <td>₹{row.baseamount}</td>
                    <td className="text-danger fw-bold">{getRemainingTime(row)}</td>
                    <td>
                      {row.bid_status === 1 ? (
                        <Link to={`/bidding/${row._id}`} className="btn btn-sm btn-warning">
                          Participate
                        </Link>
                      ) : (
                        <button className="btn btn-sm btn-secondary" disabled>
                          Closed
                        </button>
                      )}
                    </td>
                    <td>
                      {row.bid_status==1 ? (
                        <a
                          href={`/assests/upload/description_file/${row.description_filenm}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          View
                        </a>
                      ) : (
                        'closed'
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

export default SearchProduct;
