import './Bids.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { __bidapiurl, __productapiurl } from '../../../API_URL';
import { Link, useParams } from 'react-router-dom';


function View_bids() {
  const params = useParams()
  const [bList, setBidList] = useState([])
  const [lowestBidder, setLowestBidder] = useState()

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

  // var PDetails = {
  //     condition_obj: { "_id": params._id },
  //     content_obj: { "alloted_to": lowestBidder.t_id}
  //   }

  //   axios.patch(__productapiurl + "update", PDetails).then((response) => {
     
  //   }).catch((error) => {
  //     console.log("failed  to update bid status", error);

  //   })


  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">


            {/* Text with fade-left animation */}
            <div className="col-lg-12" >

              <h2 className="text-light text-uppercase fw-bold mb-3  ">All bids for Product: {params._id}</h2>
              <br />

              {lowestBidder && (<div className="alert alert-success  ">
                <strong >Alloted Transporter:</strong> {lowestBidder.t_id}  <br />
                <strong>Bid Amount:</strong>{lowestBidder.bidamount}
              </div>
              )}

              <br />

              <div className="table-responsive">
                <table className="table table-striped table-dark align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Bidding No</th>
                      <th scope="col">Bidding Amount</th>
                      <th scope="col">Transporter email</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      bList.length == 0 ? (
                        <tr>
                          <td colSpan={10} className='text-center'>No Category</td>
                        </tr>
                      ) : (
                        bList.map((row) => (
                          <tr>

                            <td>{row._id}</td>

                            <td>{row.bidamount}</td>

                            <td>{row.t_id}</td>

                            <td>{new Date(row.info).toLocaleString()}</td>

                          </tr>
                        ))
                      )
                    }


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

export default View_bids;
