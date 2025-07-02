import './Search.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { __categoryapiurl, __productapiurl } from '../../../API_URL';
import { useParams, Link } from 'react-router-dom';


function SearchProduct() {
  const params = useParams()
  const [pList, setProList] = useState([])
  const [tick, setTick] = useState(0);

  useEffect(() => {

    axios.get(__productapiurl + "fetch", {
      params: { "subcatnm": params.subcatnm }
    }).then((response) => {
      // console.log(response.data);

      setProList(response.data)
    }).catch((error) => {
      console.log(error);

    })

  }, [])


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
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);//cleanup function
  }, []);


  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">


            {/* Text with fade-left animation */}
            <div className="col-lg-12" >

              <h2 className="text-light text-uppercase fw-bold mb-3  ">Sub Category List &gt;&gt; {params.subcatnm}</h2>
              <h2 className="text-light text-uppercase fw-bold mb-3  ">Product List &gt;&gt;</h2>




              <div className="table-responsive">
                <table className="table table-striped table-dark align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Sub Category</th>
                      <th scope="col">Base Amount</th>
                      <th scope="col">Bidding Time</th>
                      <th scope="col">Bidding </th>
                      <th scope="col">Doc File</th>
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
                              {
                                row.bid_status == 1 ? (
                                  <a ><Link to={`/bidding/${row._id}`} className="btn btn-sm btn-outline-warning">
                                    Participate </Link> </a>

                                ) : (
                                  <button className="btn btn-sm btn-outline-light" disabled>Closed</button>
                                )
                              }
                            </td>

                            <td>
                              {row.description_filenm ? (
                                <Link
                                  to={`/assests/upload/description_file/${row.description_filenm}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-outline-light" >
                                  View Doc
                                </Link>
                              ) : 'N/A'}
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

export default SearchProduct;
