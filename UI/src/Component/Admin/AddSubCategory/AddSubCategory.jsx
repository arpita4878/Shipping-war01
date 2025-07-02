import './AddSubCategory.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { __categoryapiurl, __subcategoryapiurl } from '../../../API_URL';


function AddSubCategory() {
const [catName , setCatName] = useState()
const [subcatName , setSubCatName] = useState()
const [file , setFile] = useState()
const [output , setOutput] = useState()
const [cList , setCatList] = useState([]) 
const [error, setError] =useState({})


const validate=()=>{
const newError={}

if(!catName) newError.catName='Category Name is required'

if(!subcatName) newError.subcatName='Sub Category Name is required'

if(!file) newError.file='Sub Cat Icon is required'

setError(newError)

return Object.keys(newError).length==0
};


useEffect(()=>{
  axios.get(__categoryapiurl+"fetch").then((response)=>{
    setCatList(response.data);
  }).catch((error)=>{
    console.log(error);
    
  });
},[])


 const handleChange =(event)=>{
  setFile(event.target.files[0]);
 }
 

 const handleSubmit=(event)=>{
event.preventDefault();

  if(!validate()) return;

//formdata------> prototype
var formData=new FormData();
formData.append('catnm',catName);
formData.append('subcatnm',subcatName);
formData.append('caticon',file)

const config={
  'content-type':'multipart/form-data'
};

axios.post(__subcategoryapiurl+"save",formData,config).then((response)=>{
  setCatName("");
  setSubCatName("");
  setOutput("Sub Category Added Successfully")
});
 };



  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
        
           
           <h1 className="mb-5 text-light fw-bold text-center">
        {output}       </h1>


 <div className="d-flex    bg-dark" style={{ minHeight: '40vh', paddingTop: '20px' }}>
      <div className="col-10 col-sm-8 col-md-8 col-lg-6">
          
           <form> 
          
           
            
             <div class="form-group">
    <label for="catnm">Category Name:</label>
    <select class="form-control" value={catName} onChange={e => setCatName(e.target.value)}>
        <option>Select Category</option>
        {
         cList.map((row)=>(
          //in db catnm==category name
            <option>{row.catnm}</option>      
         ))   
        }        
    </select>
    {error.catName && <small className='text-danger'>{error.catName}</small>}
  </div>
            <div className="form-group mb-4">
            
              <input
                type="text"
                className="form-control p-3"
                placeholder="Sub Category Name " value={subcatName} onChange={(e)=>setSubCatName(e.target.value)} />
               {error.subcatName && <small className='text-danger'>{error.subcatName}</small>}
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

export default AddSubCategory;
