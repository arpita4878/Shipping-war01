import './Search.css';
import axios from 'axios'
import { useEffect , useState} from 'react';
import { __categoryapiurl,__subcategoryapiurl } from '../../../API_URL';
import { useParams ,Link } from 'react-router-dom';
import SearchProduct from './SearchProduct';


function SearchSubCat() {
  const params = useParams()
const [scList, setSubCatList]= useState([])

useEffect(()=>{

  axios.get(__subcategoryapiurl+"fetch",{
    params:{"catnm":params.catnm}
  }).then((response)=>{
    setSubCatList(response.data)
  }).catch((error)=>{
    console.log(error);
    
  })

},[])

  return (
    <>
      <div className="container-fluid py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
           

            {/* Text with fade-left animation */}
            <div className="col-lg-12" data-aos="fade-left">
<Link to='/search' id='text'><h2 className="text-light text-uppercase fw-bold mb-3  " >Category List &gt;&gt;</h2></Link>
  <h2 className="text-light text-uppercase fw-bold mb-3  ">Sub Category List &gt;&gt; {params.catnm}</h2> 
  

<div className="category-grid">
  {
    scList && scList.map((row) => (
      <div className="main_part" >
     <a ><Link to={`/searchproduct/${row.subcatnm}`}>  <img src={`../assests/upload/subcategoryicons/${row.subcaticonnm}`} height="120px" width="150px" alt={row.subcatnm} /></Link> </a>
        <br />
        <b>{row.subcatnm}</b>
      </div>
     

    
    ))
  }
</div>
         
            </div>
          </div>
        </div>
      </div>

       
    </>
  );
}

export default SearchSubCat;
