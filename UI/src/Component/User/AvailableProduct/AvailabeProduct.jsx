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
    <div className="container py-5 light-theme">
      <h2 className="mb-4 text-center text-uppercase fw-bold">Product List &gt;&gt;</h2>
      <div className="table-responsive">
        <table className=" table  table-striped table-dark ">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Sub Category</th>
              <th scope="col">Base Amount</th>
              <th scope="col">Bidding Price</th>
              <th scope="col">Bidding Time</th>
              <th scope="col">Bidding</th>
              <th scope="col">Doc File</th>
              <th scope="col">Bid Status</th>
            </tr>
          </thead>
          <tbody>
            {pList.length === 0 ? (
              <tr>
                <td className="text-center">No products found</td>
              </tr>
            ) : (
             pList.map((row) => (
                <tr>
                  <td>
                    <img
                      src={`/uploads/shipmenticons/${row.piconnm}`}
                      alt={row.title}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "80px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </td>
                  <td>{row.title}</td>
                  <td>{row.catnm}</td>
                  <td>{row.subcatnm}</td>
                  <td>{row.baseprice}</td>
                  <td>{row.auctionprice}</td>
                  <td className="timer-flash">
                    {getRemainingTime(row.info)}
                  </td>


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
                  <td>
                    {row.description ? (
                      <a
                        href={`/uploads/shipmentdescriptions/${row.description}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-light"
                      >
                        View Doc
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <span
                      style={{ width: "80px", height: "25pxs" }}
                      className={`badge ${row.bid_status === 1
                          ? "bg-success"
                          : "bg-danger"
                        }`}
                    >
                      {row.bid_status === 1 ? "Active" : "Deactive"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AvailableProduct;
