import './AddShippingProduct.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { __categoryapiurl, __subcategoryapiurl, __productapiurl } from '../../../API_URL';

function AddShippingProduct() {
  const [cList, setCatList] = useState([]);
  const [scList, setSubCatList] = useState([]);
  const [categorynm, setCategorynm] = useState('');
  const [subcategorynm, setSubCategorynm] = useState('');
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [title, setTitle] = useState('');
  const [baseamount, setBaseAmount] = useState('');
  const [descriptionfile, setDescriptionFile] = useState(null);
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};

    if (!categorynm) newError.categorynm = "Category Name is required";
    if (!file) newError.file = "Shipment Image is required";
    if (!subcategorynm) newError.subcategorynm = "Sub Category name is required";
    if (!title) newError.title = "Title is required";
    if (!baseamount) newError.baseamount = "Base Amount is required";
    if (!descriptionfile) newError.descriptionfile = "Description file required";

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  useEffect(() => {
    axios.get(__categoryapiurl + "fetch").then((response) => {
      setCatList(response.data);
    }).catch(console.log);
  }, []);

  useEffect(() => {
    if (categorynm) {
      axios.get(__subcategoryapiurl + "fetch", {
        params: { catnm: categorynm }
      }).then((response) => {
        setSubCatList(response.data);
      }).catch(console.log);
    } else {
      setSubCatList([]);
    }
  }, [categorynm]);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('catnm', categorynm);
    formData.append('subcatnm', subcategorynm);
    formData.append('title', title);
    formData.append('useremail', localStorage.getItem('email'));
    formData.append('baseamount', baseamount);
    formData.append('description_file', descriptionfile);
    formData.append('shipment_image', file);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    axios.post(__productapiurl + "save", formData, config).then(() => {
      setCategorynm('');
      setSubCategorynm('');
      setTitle('');
      setBaseAmount('');
      setFile(null);
      setDescriptionFile(null);
      setOutput("Product Added Successfully");
      setError({});
    }).catch(() => {
      setOutput("Failed to Add Product");
    });
  };

  return (
    <div className="container py-5 light-theme">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h2 className="mb-4 text-center">Add Shipping Product Here!!!</h2>

          {output && <div className="alert alert-info text-center">{output}</div>}

          <form onSubmit={handleSubmit} noValidate>

            <div className="mb-3">
              <input
                type="text"
                className={`form-control p-3 ${error.title ? 'is-invalid' : ''}`}
                placeholder="Add Shipment Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {error.title && <div className="invalid-feedback">{error.title}</div>}
            </div>

            <div className="mb-3">
              <select
                className={`form-select p-3 ${error.categorynm ? 'is-invalid' : ''}`}
                value={categorynm}
                onChange={(e) => setCategorynm(e.target.value)}
              >
                <option value="">Select Category</option>
                {cList.map((row, idx) => (
                  <option key={idx} value={row.catnm}>{row.catnm}</option>
                ))}
              </select>
              {error.categorynm && <div className="invalid-feedback">{error.categorynm}</div>}
            </div>

            <div className="mb-3">
              <select
                className={`form-select p-3 ${error.subcategorynm ? 'is-invalid' : ''}`}
                value={subcategorynm}
                onChange={(e) => setSubCategorynm(e.target.value)}
                disabled={!categorynm}
              >
                <option value="">Select Sub Category</option>
                {scList.map((row, idx) => (
                  <option key={idx} value={row.subcatnm}>{row.subcatnm}</option>
                ))}
              </select>
              {error.subcategorynm && <div className="invalid-feedback">{error.subcategorynm}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Doc Containing All Details About Product (PDF, DOC, DOCX only)</label>
              <input
                type="file"
                className={`form-control ${error.descriptionfile ? 'is-invalid' : ''}`}
                onChange={(e) => setDescriptionFile(e.target.files[0])}
                accept=".pdf,.doc,.docx"
              />
              {error.descriptionfile && <div className="invalid-feedback">{error.descriptionfile}</div>}
            </div>

            <div className="mb-3">
              <input
                type="text"
                className={`form-control p-3 ${error.baseamount ? 'is-invalid' : ''}`}
                placeholder="Base Amount"
                value={baseamount}
                onChange={(e) => setBaseAmount(e.target.value)}
              />
              {error.baseamount && <div className="invalid-feedback">{error.baseamount}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label">Upload Shipment Image (JPG, PNG, GIF only)</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                className={`form-control ${error.file ? 'is-invalid' : ''}`}
                onChange={handleChangeFile}
              />
              {error.file && <div className="invalid-feedback">{error.file}</div>}
            </div>

            <button className="btn btn-primary w-100 py-3" type="submit">
              Add Shipment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddShippingProduct;
