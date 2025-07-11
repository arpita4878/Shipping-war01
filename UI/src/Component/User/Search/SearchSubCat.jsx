import './Search.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { __subcategoryapiurl } from '../../../API_URL';
import { useParams, Link } from 'react-router-dom';

function SearchSubCat() {
  const { catnm } = useParams();
  const [scList, setSubCatList] = useState([]);

  useEffect(() => {
    axios.get(__subcategoryapiurl + 'fetch', { params: { catnm } })
      .then((res) => setSubCatList(res.data))
      .catch((err) => console.log(err));
  }, [catnm]);

  return (
    <div className="search-section bg-light text-dark">
      <div className="container py-5">
        <Link to="/search" className="back-link">← Back to Categories</Link>
        <h2 className="section-title">Subcategories in "{catnm}"</h2>

        <div className="category-grid">
          {scList.map((row) => (
            <Link
              to={`/searchproduct/${row.subcatnm}`}
          
              className="category-card"
            >
              <img
                src={`https://shipping-war01.onrender.com/upload/subcategoryicons/${row.subcaticonnm}`}
                alt={row.subcatnm}
                className="category-icon"
              />
              <div className="category-name">{row.subcatnm}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchSubCat;
