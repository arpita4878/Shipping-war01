import './Bidding.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { __productapiurl, __bidapiurl } from '../../../API_URL';


function Bidding() {
  const params = useParams();
  const [pDetails, setPDetails] = useState([]);
  const navigate = useNavigate();
  const [output, setOutput] = useState();
  const [cPrice, setCurrentPrice] = useState([]);
  const [BidPrice, setBidPrice] = useState()
  const [error , setError]=useState({})
  const [owner , setOwner] =useState(false)

  const email =localStorage.getItem("email")

  useEffect(() => {
    axios.get(__productapiurl + "fetch", {
      params: { "_id": params._id }
    }).then((response) => {
      setPDetails(response.data[0])
      setOwner(response.data[0].useremail==email)
    })
  }, [params._id])

  
 useEffect(()=>{
  
    axios.get(__bidapiurl + "fetch", {
      params: { "p_id": params._id }
    }).then((response1) => {
      var min_bidPrice = response1.data[0].bidamount;

      for (let row of response1.data) {
        if (min_bidPrice > row.bidamount) {
          min_bidPrice = row.bidamount
        }
      }
      setCurrentPrice(min_bidPrice)
    }).catch((error) => {
      setCurrentPrice(pDetails.baseamount)
    })
})
    

    const validate=()=>{
      const newError={}
      if(!BidPrice) newError.BidPrice='Bid Price required'
      else if(parseInt(BidPrice)>=parseInt(cPrice)){
        newError.BidPrice='Bid must be lower than current bid'
      }

      setError(newError)
     return Object.keys(newError).length==0
    }



  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate())return;

    var bidDetails = {
      "p_id": params._id, "t_id": localStorage.getItem("email"),
      bidamount: parseInt(BidPrice)
    };

    axios.post(__bidapiurl + "save", bidDetails).then((response) => {
      setOutput("Bid Implement Successfully");
      setBidPrice("")
      navigate("/bidding/" + params._id)
    }).catch((error) => {
      setOutput("Unable to bid,Please try Again");
      setBidPrice("")
    })
  }


  return (
    <><div className="container-fluid py-5 dark-bg">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">

        {/* Output Message */}
        {output && (
          <div className="text-light  fw-bold" >
          <h2>  {output}</h2>
          </div>
        )}

        {/* Bidding Card */}
        <div className="card bg-dark text-light border border-secondary shadow-lg rounded-4">
          <div className="card-header text-center border-bottom border-secondary">
            <h3 className="mb-0 text-light">Bidding Panel</h3>
            <small className="text-light  ">Product ID: {params._id}</small>
          </div>

          <div className="card-body">

            <div className="mb-4">
              <p><strong>Base Price:</strong>  {pDetails.baseamount}</p>
              <p className="text-center text-light fw-bold">
                 Current Bid price: <span className="text-center text-light fw-bold"> {cPrice}</span>
              </p>
            </div>

        {owner ? (<div className="alert alert-warning text-center">
                    You cannot bid on your own product.
                  </div>
                  ):(
            <form>
              <div className="mb-3">
                <label className="form-label">Your Bid Amount</label>
                <input
                  type="number"
                  className="form-control  text-dark"
                  placeholder="Enter Bid Amount here"
                  value={BidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                   />
                   {error.BidPrice && <small className='text-danger'>{error.BidPrice}</small>}
                </div>
             

              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-warning w-100  text-dark fw-bold"   >
              Place Bid
              </button>
            </form>
            )}
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
    </>
  );
}

export default Bidding;


