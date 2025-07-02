import './UpdateCat.css';
import  axios from 'axios'
import { __categoryapiurl } from '../../../API_URL';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UpdateCat() {
const [cList , setCatList] =useState([]);
const [edit_id, setEdit_id] =useState()
const [editData , setEditData] =  useState({
  icon:'',
  catnm:'',
});



useEffect(()=>{
  axios.get(__categoryapiurl+"fetch").then((response)=>{
    setCatList(response.data)
  }).catch((error)=>{
    console.log(error);
    
  })
},[])

// const handleEdit=(row)=>{
//   setEdit_id(row._id)
//   setEditData({
//     catnm:row.catnm,
//     caticon:row.caticonnm
//   });
// }

// const  handleSave=()=>{

// }

  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
          

            {/* Text with fade-left animation */}
            <div className="col-lg-12" >
              <h2 className="text-light text-uppercase fw-bold mb-3">
              Manage  Category here!!!!
              </h2>
            
               <div className="table-responsive">
          <table className="table table-striped table-dark align-middle">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Image</th>
                <th scope="col">Category Name</th>
                <th scope="col">Edit</th>
              </tr>
            </thead> 
             
             <tbody>
                  {
                    cList.length==0?(
                      <tr>
                          <td  colSpan={10} className='text-center'>No Category</td>
                      </tr>
                    ):(
                      cList.map((row)=>(
                        <tr>

                        <td>{row._id}</td>

                        <td>
                        <img src={`assests/upload/categoryicons/${row.caticonnm}`} alt={row.catnm} 
                          style={{maxWidth:'150px','maxHeight':'100px',objectFit:'cover',borderRadius:'6px'}}/>
                          </td>

                          <td>{row.catnm}</td>
                          
                          <td>
                            
                            {/* {
                              edit_id==row._id?(
                                 <>
                                <button  onClick={handleSave(row._id)} className="btn btn-sm btn-success me-2">Save</button>

                                <button onClick={()=>setEdit_id(null)} className="btn btn-sm btn-secondary me-2">Cancel</button>
                                </>
                              ):(
                                 <button className='btn btn-sm btn-outline-primary'onClick={handleEdit(row)}><i  className='fa fa-edit'></i></button>
                              )
                            }
                             */}
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

export default UpdateCat;
