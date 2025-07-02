import './ManageUser.css'
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../API_URL';
import { Navigate, useNavigate } from 'react-router-dom';

function Manageusers() {
const navigate =useNavigate()

const [ users , setUserDetails ] = useState([]);  

  useEffect(()=>{
    axios.get(__userapiurl+"fetch",{
        params :  {"role":"user"} 
    }).then((response)=>{
       // console.log(response.data);
        setUserDetails(response.data);
    }).catch((error)=>{
        console.log(error);        
    });  
  });    


const manageuserstatus=(_id,s)=>{

    if(s=='active'){
      var update_details={"condition_obj":{"_id":_id} , "content_obj":{"status":1}};

      axios.patch(__userapiurl+"update",update_details).then((response)=>{
         Swal.fire("Activated!","User activated Succesfully","success");
        navigate("/manageuser")
      });
    }


    else if(s=='inactive'){
      var update_details={"condition_obj":{"_id":_id},"content_obj":{"status":0}}

      axios.patch(__userapiurl+"update",update_details).then((response)=>{
       Swal.fire("Deactivated!","User deactivated Succesfully","info")
        navigate("/manageuser")
      });
    }


    else{
      Swal.fire({
        title:'Are you sure?',
        text:'You want to delete this user permanently',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#d33',
        cancelButtonColor:'#3085d6',
        confirmButtonText:'Yes'
      }).then((result)=>{
        if(result.isConfirmed){
           var delete_details={"data":{"_id":_id}};

      axios.delete(__userapiurl+"deleteUser",delete_details).then((response)=>{
         Swal.fire('User deleted successfully')
          navigate("/manageuser")
      })
        }
      })
     
        

    }
  };



  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
           
            <div className="col-lg-12" >
             
              <h1 className="mb-4 text-light fw-bold">
                View & Manage <span className="text-primary">User</span> Pannel
              </h1>
              
              <table  class="table table-bordered  text-light" cellSpacing={10}  cellPadding={10}>

                <tr>
                  
                  <th>_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Gender</th>
                  <th>Info</th>
                  <th>Status</th>
                  <th>Action</th>
                 

                </tr>

              {
                users.map((row)=>(
                    <tr>
                        <td>{row._id} </td>
                        <td>{row.name} </td>
                        <td>{row.email} </td>
                        <td>{row.mobile} </td>
                        <td>{row.address} </td>
                        <td>{row.city} </td>
                        <td>{row.gender} </td>
                        <td>{row.info} </td>
                      
                        <td> <label className="switch"><input
                                    type="checkbox"
                                    checked={row.status == 1}
                                    onChange={() =>
                                      manageuserstatus(row._id, row.status == 1 ? 'inactive' : 'active')
                                    }/>
                                <span className="slider round"></span>  
                              </label>
                        </td>
    
                      
                      
                      <td><a   className="btn btn-sm btn-danger"   onClick={() => manageuserstatus(row._id, 'delete')}>
                                   <i className="bi bi-trash-fill me-1"></i> Delete
                          </a>
                      </td>
                         
                    </tr>
                ))        
                }
              
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Manageusers;
