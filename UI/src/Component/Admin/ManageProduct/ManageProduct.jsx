import './Product.css';
import axios from 'axios'
import { useEffect , useState} from 'react';
import {  __productapiurl } from '../../../API_URL';
import {  Link } from 'react-router-dom';


function ManageProduct() {

const [pList, setProList]= useState([])

useEffect(()=>{
  fetchProduct()
},[])


const  fetchProduct=()=>{
  axios.get(__productapiurl+"fetch").then((response)=>{
    const allProduct=response.data;

    const activeProduct= allProduct.filter(p=>p.bid_status==1)
    const deactiveProduct= allProduct.filter(p =>p.bid_status!==1)

    const sortedProduct=[...activeProduct, ...deactiveProduct]
   // console.log(response.data);  
    setProList(sortedProduct)
  }).catch((error)=>{
    console.log(error);   
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
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Sub Category</th>
                <th scope="col">Base Amount</th>
                <th scope="col">Bidding Price</th>
                <th scope="col">Doc File</th>
                <th scope='col'>User Email</th>
                <th scope="col">Bid Status</th>
              </tr>
            </thead>
            <tbody>
              {pList.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">No products found</td>
                </tr>):
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
                    <td>{row.baseamount}</td>
                                       
                   
                    <td>
                      {row.description_filenm ? (
                        <Link
                          to={`/assests/upload/description_file/${row.description_filenm}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-light " >  
                          View Doc
                        </Link>
                      ) : 'N/A'}
                    </td>

              <td>{row.useremail}</td>

                        <td>
                <span className={`badge ${row.bid_status == 1 ? 'bg-success' : 'bg-danger'}`}>
                  {row.bid_status === 1 ? 'Active' : 'Deactive'}
                </span>
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

export default ManageProduct;
