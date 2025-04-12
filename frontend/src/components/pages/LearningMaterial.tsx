import NavBar from "./NavBar";
import styles from "./LearningMaterial.module.css";
// import axiosInstance from "../../services/apiInterceptor";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../utils/Pagination";

const LearningMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerpage, setPostPerpage] = useState(3);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/learning/materials`
        );
        console.log(res.data.results);

        setMaterials(res.data.results);
        const uniqueCategories = new Set(categories);
        res.data.results.forEach((material) => {
          if (!uniqueCategories.has(material.category)) {
            uniqueCategories.add(material.category);
          }
        });
        setCategories([...uniqueCategories]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMaterial();
  }, []);
  const lastPostIndex = currentPage * postPerpage;
  const firstPostIndex = lastPostIndex - postPerpage;
  const currentMaterials = materials.slice(firstPostIndex, lastPostIndex);

  return (
    <div className={`container p-5 ${styles.learning_container}`}>
      <NavBar />
      <h1 className="text-center">Learning Materials</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control p-3"
          placeholder="Search by title or category"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <button className="input-group-text" id="basic-addon2">
          Search
        </button>
      </div>

      <div className="d-flex justify-content-between">
        <div className="" style={{ width: `100%` }}>
          <div className="subjects">
            <h3>Filter & Sort</h3>
            <h4>Categories</h4>
            {categories.map((category, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioDefault"
                  id="radioDefault1"
                />
                <label className="form-check-label" htmlFor="radioDefault1">
                  {category}
                </label>
              </div>
            ))}
          </div>
          <div className="materials">
            <h4>Material Types</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioDefault"
                id="radioDefault1"
                checked
              />
              <label className="form-check-label" htmlFor="radioDefault1">
                All
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioDefault"
                id="radioDefault2"
              />
              <label className="form-check-label" htmlFor="radioDefault2">
                Notes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioDefault"
                id="radioDefault2"
              />
              <label className="form-check-label" htmlFor="radioDefault2">
                Videos
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div>
          {currentMaterials.map((material, index) => (
            <div className="card" style={{ width: `100%` }} key={index}>
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  {" "}
                  {material.title}{" "}
                </h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {material.category}
                </h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <p className="card-link">Uploaded by : {material.uploader}</p>
                <div className=" text-end">
                  <button className={`btn ${styles.material}`}>Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-end">
        <Pagination
          materialsTotal={materials.length}
          postPerpage={postPerpage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default LearningMaterial;
