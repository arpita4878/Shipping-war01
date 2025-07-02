import './UpdateSubCat.css';
import  axios from 'axios'
import {  __subcategoryapiurl } from '../../../API_URL';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UpdateSubCat() {
const [scList , setSubCatList] =useState([]);
const [formData , setformData] =  useState({
  name:'',
  icon:'',
  catnm:'',
});



useEffect(()=>{
  axios.get(__subcategoryapiurl+"fetch").then((response)=>{
    setSubCatList(response.data)
  }).catch((error)=>{
    console.log(error);
    
  })
},[])

// const handleEdit=(row)=>{
//   setEditId(row._id)
//   setEditIcon(null)
//   setEditName(row.catnm)
// }


  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
          

            {/* Text with fade-left animation */}
            <div className="col-lg-12" >
              <h2 className="text-light text-uppercase fw-bold mb-3">
              Manage Sub Category here!!!!
              </h2>
            
               <div className="table-responsive">
          <table className="table table-striped table-dark align-middle">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Image</th>
                <th scope="col">Category Name</th>
                <th scope="col">SUb Category Name</th>
                <th scope="col">Edit</th>
              </tr>
            </thead> 
             
             <tbody>
                  {
                    scList.length==0?(
                      <tr>
                          <td  colSpan={10} className='text-center'>No Category</td>
                      </tr>
                    ):(
                      scList.map((row)=>(
                        <tr>

                        <td>{row._id}</td>

                        <td>
                        <img src={`assests/upload/subcategoryicons/${row.subcaticonnm}`} alt={row.subcatnm} 
                          style={{maxWidth:'150px','maxHeight':'100px',objectFit:'cover',borderRadius:'6px'}}/>
                          </td>

                          <td>{row.catnm}</td>

                          <td>{row.subcatnm}</td>
                          
                          <td>
                            <button className='btn btn-sm btn-outline-primary'><i  className='fa fa-edit'></i></button>
                          </td>

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

export default UpdateSubCat;
