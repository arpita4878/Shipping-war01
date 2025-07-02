import './Search.css';
import axios from 'axios'
import { useEffect , useState} from 'react';
import { __categoryapiurl } from '../../../API_URL';
import { Link } from 'react-router-dom';

function Search() {
const [cList, setCatList]= useState()

useEffect(()=>{

  axios.get(__categoryapiurl+"fetch").then((response)=>{
    setCatList(response.data)
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
   <h2 className="text-light text-uppercase fw-bold mb-3 ">Category List <span> &gt;&gt; </span>  
</h2>  

<div className="category-grid">
  {
    cList && cList.map((row) => (
      <div className="main_part" >
      <a ><Link to={`/searchsc/${row.catnm}`}>  <img src={`/assests/upload/categoryicons/${row.caticonnm}`} height="150px" width="150px" alt={row.catnm} /></Link></a>
        <br />
        <b>{row.catnm}</b>
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

export default Search;
