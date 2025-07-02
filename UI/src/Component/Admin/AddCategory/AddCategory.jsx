import './AddCategory.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { __categoryapiurl } from '../../../API_URL';

function AddCategory() {
 const [catName , setCatName] = useState()
 const [file , setFile] = useState()
 const [output , setOutput] = useState();
 const  [error , setError] =useState({});
 

const validate=()=>{
  const newError={}

  if(!catName) newError.catName="Category Name is required";

  if(!file) newError.file="Icon is required";

  setError(newError);

  return Object.keys(newError).length==0

};


 const handleChange =(event)=>{
  setFile(event.target.files[0]);
 }
 
 const handleSubmit = (event) =>{
event.preventDefault();

if(!validate())return;

var formData=new FormData();
//form data is a prototype

formData.append('catnm',catName);
formData.append('caticon',file);

const config = {
  'content-type': 'multipart/form-data'
};

axios.post(__categoryapiurl+"save", formData,config).then((response)=>{
  setCatName("")
  setOutput("Category Added Successfully")
}).catch((error)=>{
  setOutput("failed to add category, try again",error)
});

 }



  return (
    <>
       <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
        
            {/* Text with fade-left animation */}
           <h1 className="mb-4 text-light fw-bold">
                Welcome to <span className="text-primary">Add Category</span> Pannel
              </h1>

           <h1 className="mb-5 text-light fw-bold text-center">
        {output}       </h1>


 <div className="d-flex    bg-dark" style={{ minHeight: '40vh', paddingTop: '20px' }}>
      <div className="col-10 col-sm-8 col-md-8 col-lg-6">
          
           <form> 
          
           
            
            <div className="form-group mb-4">
            
              <input
                type="text"
                className="form-control p-3"
                placeholder="Category Name " value={catName} onChange={(e)=>setCatName(e.target.value)} />
              {error.catName && <small className='text-danger'>{error.catName}</small>}
            </div>

            <div className="form-group mb-4">
            
              <input
                type="file"
                className="form-control p-8"
                onChange={handleChange} />
               {error.file && <small className='text-danger'>{error.file}</small>}
            </div>
            
            <button
              className="btn btn-primary w-100 py-2"
              type="button" onClick={handleSubmit}  >
           
             Add Category
            </button>
         
          </form>
        
</div>
</div>


          </div>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
