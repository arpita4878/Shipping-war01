import './CPAdmin.css';

import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { __userapiurl } from '../../../API_URL';

function CPAdmin() {
const navigate = useNavigate()
const [currentpassword , setCurrentPassword]= useState()
const [newpassword , setNewPassword]= useState()
const [confirmnewpassword , setConfirmNewPassword]= useState()
const [output , setOutput] = useState();

const handlesubmit=()=>{

const email = localStorage.getItem("email")
  
axios.get(__userapiurl+"fetch",{
params:{"email":email,"password":currentpassword}
}).then((response)=>{
 //console.log(response.data);

if(newpassword==confirmnewpassword)
{

 var update_details={"condition_obj":{"email":email} , "content_obj":{"password":newpassword}};
 axios.patch(__userapiurl+"update",update_details).then((response)=>{
        alert(" password change successfully");
        navigate("/logout")
      });

}
else
{
  setOutput("New and Confirm new password not matched");
  setNewPassword("")
  setConfirmNewPassword("")
}
 
  
}).catch((error)=>{

  setOutput("Invalid old Password, Please try again")
  setCurrentPassword("")

})




}

  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
            <h1 className="mb-4 text-light fw-bold">
               {output  }
              </h1>

               <h2 className="mb-4 text-light fw-bold">
               Change <span className="text-primary">Password</span> here!!!
              </h2>

          </div>

 <div className="d-flex    bg-dark" style={{ minHeight: '40vh', paddingTop: '20px' }}>
      <div className="col-10 col-sm-8 col-md-6 col-lg-5">
          
           <form> 
          
            <div className="form-group mb-4">
             
              <input
                type="password"
                className="form-control p-3"
                placeholder="Current Password" value={currentpassword}  onChange={(e)=>setCurrentPassword(e.target.value)}/>
              
            </div>
            
            <div className="form-group mb-4">
            
              <input
                type="password"
                className="form-control p-3"
                placeholder=" New Password"value={newpassword} onChange={(e)=>setNewPassword(e.target.value)} />
              
            </div>

            <div className="form-group mb-4">
            
              <input
                type="password"
                className="form-control p-3"
                placeholder="Conform New Password" value={confirmnewpassword} onChange={(e)=>setConfirmNewPassword(e.target.value)} />
              
            </div>
            
            <button
              className="btn btn-primary w-100 py-2"
              type="button" onClick={handlesubmit}  >
           
              Change Password
            </button>
         
          </form>
        
</div>
</div>
          
        </div>
      </div>
    </>
  );
}

export default CPAdmin;
