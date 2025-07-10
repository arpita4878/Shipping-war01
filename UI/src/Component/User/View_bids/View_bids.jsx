import './Bids.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { __bidapiurl, __productapiurl } from '../../../API_URL';
import { useParams } from 'react-router-dom';

function View_bids() {
  const params = useParams();
  const [bList, setBidList] = useState([]);
  const [lowestBidder, setLowestBidder] = useState();

  useEffect(() => {
    axios.get(__bidapiurl + "fetch", {
      params: { p_id: params._id }
    }).then((response) => {
      setBidList(response.data);
    }).catch((error) => {
      console.log("Failed to load bids", error);
    });
  }, [params._id]);

  useEffect(() => {
    if (bList.length > 0) {
      let min_bid = bList[0];
      for (let b of bList) {
        if (b.bidamount < min_bid.bidamount) {
          min_bid = b;
        }
      }
      setLowestBidder(min_bid);
    }
  }, [bList]);

  return (
    <div className="container-fluid py-4 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">

            <h2 className="text-dark text-uppercase fw-bold mb-3 text-center">
              All bids for Product: {params._id}
            </h2>

            {lowestBidder && (
              <div className="alert alert-success text-center">
                <strong>Alloted Transporter:</strong> {lowestBidder.t_id} <br />
                <strong>Bid Amount:</strong> {lowestBidder.bidamount}
              </div>
            )}

            <div className="table-responsive">
              <table className="table table-striped table-light align-middle">
                <thead>
                  <tr>
                    <th scope="col">Bidding No</th>
                    <th scope="col">Bidding Amount</th>
                    <th scope="col">Transporter Email</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bList.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">No Category</td>
                    </tr>
                  ) : (
                    bList.map((row) => (
                      <tr key={row._id}>
                        <td>{row._id}</td>
                        <td>{row.bidamount}</td>
                        <td>{row.t_id}</td>
                        <td>{new Date(row.info).toLocaleString()}</td>
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

export default View_bids;
