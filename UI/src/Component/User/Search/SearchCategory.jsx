import './Search.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { __categoryapiurl } from '../../../API_URL';
import { Link } from 'react-router-dom';

function Search() {
  const [cList, setCatList] = useState([]);

  useEffect(() => {
    axios.get(__categoryapiurl + 'fetch')
      .then((res) => setCatList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="search-section bg-light text-dark">
      <div className="container py-5">
        <h2 className="section-title">Categories</h2>
        <div className="category-grid">
          {cList.map((row) => (
            <Link
              to={`/searchsc/${row.catnm}`}
            
              className="category-card"
            >
              <img
                src={`/assests/upload/categoryicons/${row.caticonnm}`}
                alt={row.catnm}
                className="category-icon"
              />
              <div className="category-name">{row.catnm}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
