import './AddShippingProduct.css';
import axios from 'axios'
import { useEffect ,  useState} from 'react';
import {__categoryapiurl  , __subcategoryapiurl , __productapiurl} from '../../../API_URL'

function AddShippingProduct() {
 const [cList ,setCatList ]=useState([])
 const [scList ,setSubCatList ]=useState([])
 const [categorynm ,setCategorynm ]=useState()
 const [subcategorynm ,setSubCategorynm ]=useState()
 const [file , setFile] = useState()
 const [output , setOutput] = useState()
 const [title , setTitle] = useState()
 const [baseamount , setBaseAmount] = useState()
 const [descriptionfile , setDescriptionFile] = useState()
 const [error, setError]= useState({});


const validate=()=>{
  const newError={}

  if(!categorynm) newError.categorynm="Category Name is required";

  if(!file) newError.file=" Shipment Image is required";

  if(!subcategorynm) newError.subcategorynm=" Sub Category name is required";

  if(!title) newError.title=" Title  is required";

  if(!baseamount) newError.baseamount=" Base Amount is required";

  if(!descriptionfile) newError.descriptionfile=" Description file required";

  setError(newError);

  return Object.keys(newError).length==0

};


 useEffect(()=>{

axios.get(__categoryapiurl+"fetch").then((response)=>{
  setCatList(response.data)
}).catch((error)=>{
  console.log(error);
})

 },[])

 useEffect(()=>{
  if(categorynm){
  axios.get(__subcategoryapiurl+"fetch",{
    params:{"catnm":categorynm}
  }).then((response)=>{
    setSubCatList(response.data)
  }).catch((error)=>{
    console.log(error);
    
  })
  }
 },[categorynm])


const handleChange=(event)=>{
  setFile(event.target.files[0])
}

 const handleSubmit=(e)=>{
    e.preventDefault();
    if(!validate()) return;

    var formData= new FormData();
    formData.append('catnm',categorynm)
    formData.append('subcatnm',subcategorynm)
    formData.append('title',title)
    formData.append('useremail',localStorage.getItem('email'))
    formData.append('baseamount',baseamount)
    formData.append('description_file',descriptionfile)
    formData.append('shipment_image',file)

    const config={
      'content-type':'multipart/form-data'
    };

    axios.post(__productapiurl+"save",formData,config).then((response)=>{
      setCategorynm("")
      setSubCategorynm("")
      setTitle("")
      setBaseAmount("")
      setOutput("Product Added Successfully")
    }).catch((error)=>{
      setOutput("Failed to Add Product")
      console.log(error);
      
    });
 }


  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8" >
              <h2 className="text-light text-uppercase fw-bold mb-3">
             Add Shipping Product Here!!!
              </h2>

             <h2 className="text-light  fw-bold mb-3">
            {output}
              </h2>
               
           <form> 

             <div className="form-group mb-4 mt-5">
            
              <input
                type="text"
                className="form-control p-3"
                placeholder="Add Shipment Title "  value={title} onChange={(e)=>setTitle(e.target.value)} />
              {error.title && <small className='text-danger'>{error.title}</small>}              
            </div>

              <div class="form-group mb-4">
                  <select class="form-control" value={categorynm} onChange={(e)=>setCategorynm(e.target.value)} >
                      <option>Select Category</option>
                      {
                      cList.map((row)=>(
                        //in db catnm==category name
                          <option>{row.catnm}</option>      
                      ))   
                      }        
                  </select>
              {error.categorynm && <small className='text-danger'>{error.categorynm}</small>}              
               </div>

               
             <div class="form-group mb-4">
                  <select class="form-control" value={subcategorynm}  onChange={(e)=>setSubCategorynm(e.target.value)}>
                      <option>Select Sub Category</option>
                      {
                      scList.map((row)=>(
                        //in db subcatnm==category name
                          <option>{row.subcatnm}</option>      
                      ))   
                      }        
                  </select>
              {error.subcategorynm && <small className='text-danger'>{error.subcategorynm}</small>}              
               </div>

              <div className="form-group mb-4">

        <label className="text-light mb-2">Upload Doc Contain All Deatil About Product (PDF, DOC, DOCX only)</label>
            <input type="file"className="form-control p-8" 
            onChange={(e)=>setDescriptionFile(e.target.files[0])} 
            accept=".pdf,.doc,.docx"/>
       {error.descriptionfile && <small className='text-danger'>{error.descriptionfile}</small>}                            
            </div>

              <div className="form-group mb-4">
            
              <input
                type="text"
                className="form-control p-3"
                placeholder="Base Amount "value={baseamount} onChange={(e)=>setBaseAmount(e.target.value)} />
         {error.baseamount && <small className='text-danger'>{error.baseamount}</small>}                      
            </div>

            <div className="form-group mb-4">
   <label className="text-light mb-2">Upload Shipment Image (JPG, PNG, GIF only) </label>
              <input
                type="file"
                 accept=".jpg,.jpeg,.png"
                className="form-control p-8"
               onChange={handleChange} />
         {error.file && <small className='text-danger'>{error.file}</small>}                           
            </div>
            
            <button
              className="btn btn-primary w-100 py-2"
              type="button"   onClick={handleSubmit}>
           
             Add Shipment
            </button>
         
          </form>
     
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddShippingProduct;

