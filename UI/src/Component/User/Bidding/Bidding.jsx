import './Bidding.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { __productapiurl, __bidapiurl } from '../../../API_URL';

function Bidding() {
  const params = useParams();
  const [pDetails, setPDetails] = useState([]);
  const navigate = useNavigate();
  const [output, setOutput] = useState();
  const [cPrice, setCurrentPrice] = useState([]);
  const [BidPrice, setBidPrice] = useState();
  const [error, setError] = useState({});
  const [owner, setOwner] = useState(false);

  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.get(__productapiurl + "fetch", {
      params: { "_id": params._id }
    }).then((response) => {
      setPDetails(response.data[0]);
      setOwner(response.data[0].useremail === email);
    });
  }, [params._id]);

  useEffect(() => {
    axios.get(__bidapiurl + "fetch", {
      params: { "p_id": params._id }
    }).then((response1) => {
      var min_bidPrice = response1.data[0].bidamount;

      for (let row of response1.data) {
        if (min_bidPrice > row.bidamount) {
          min_bidPrice = row.bidamount;
        }
      }
      setCurrentPrice(min_bidPrice);
    }).catch(() => {
      setCurrentPrice(pDetails.baseamount);
    });
  });

  const validate = () => {
    const newError = {};
    if (!BidPrice) newError.BidPrice = 'Bid Price required';
    else if (parseInt(BidPrice) >= parseInt(cPrice)) {
      newError.BidPrice = 'Bid must be lower than current bid';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    var bidDetails = {
      "p_id": params._id, "t_id": localStorage.getItem("email"),
      bidamount: parseInt(BidPrice)
    };

    axios.post(__bidapiurl + "save", bidDetails).then(() => {
      setOutput("Bid Implement Successfully");
      setBidPrice("");
      navigate("/bidding/" + params._id);
    }).catch(() => {
      setOutput("Unable to bid,Please try Again");
      setBidPrice("");
    });
  };

  return (
    <div className="container py-5 bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">

          {/* Output Message */}
          {output && (
            <div className="alert alert-info text-center fw-bold py-3 rounded shadow-sm" role="alert" style={{ fontSize: '1.1rem' }}>
              {output}
            </div>
          )}

          {/* Bidding Card */}
          <div className="card shadow-lg rounded-4 border-0 hover-card">
            <div className="card-header text-center bg-white border-bottom py-3">
              <h3 className="mb-0 text-primary fw-bold">Bidding Panel</h3>
              <small className="text-muted">Product ID: {params._id}</small>
            </div>

            <div className="card-body px-4 py-4">

              <div className="mb-4">
                <p className="fs-5"><strong>Base Price:</strong> {pDetails.baseamount}</p>
                <p className="text-center fw-bold text-secondary fs-5">
                  Current Bid price: <span className="text-danger">{cPrice}</span>
                </p>
              </div>

              {owner ? (
                <div className="alert alert-warning text-center fs-6" role="alert">
                  You cannot bid on your own product.
                </div>
              ) : (
                <form>
                  <div className="mb-3">
                    <label htmlFor="bidAmount" className="form-label fw-semibold">Your Bid Amount</label>
                    <input
                      type="number"
                      id="bidAmount"
                      className="form-control rounded-pill border border-secondary"
                      placeholder="Enter Bid Amount here"
                      value={BidPrice}
                      onChange={(e) => setBidPrice(e.target.value)}
                      style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                    />
                    {error.BidPrice && <small className='text-danger'>{error.BidPrice}</small>}
                  </div>

                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary w-100 fw-bold rounded-pill shadow-sm btn-hover"
                    style={{ fontSize: '1.1rem' }}
                  >
                    Place Bid
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Bidding;
