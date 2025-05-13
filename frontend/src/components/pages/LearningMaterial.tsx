import NavBar from "./NavBar";
import styles from "./LearningMaterial.module.css";
// import axiosInstance from "../../services/apiInterceptor";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import Footer from "./Footer";
import { ILearningMaterial } from "../../interface/material";
import { axiosInstanceNoInterceptor } from "../../services/apiInterceptor";

const LearningMaterial = () => {
  const [materials, setMaterials] = useState<ILearningMaterial[]>([]);
  const [originalMaterials, setOriginalMaterials] = useState<
    ILearningMaterial[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerpage, setPostPerpage] = useState(5);
  const [categories, setCategories] = useState([]); // state used to get all books categories available
  const [title, setTitle] = useState("");
  const [materialCategory, setmaterialCategory] = useState("all");

  const fetchMaterial = async () => {
    try {
      const res = await axiosInstanceNoInterceptor.get(`/learning/materials`);
      console.log(res.data.results);

      setMaterials(res.data.results);
      setOriginalMaterials(res.data.results);
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

  // filter by title
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (value.trim() === "") {
      fetchMaterial();
    } else {
      const filteredMaterials = materials.filter((material) => {
        return material.title.toLowerCase().includes(value.toLowerCase());
      });
      setMaterials(filteredMaterials);
    }
  };

  // filter by category

  const filterByCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setmaterialCategory(value);
    if (value.toLowerCase() === "all") {
      setMaterials(originalMaterials);
    } else {
      let filteredMaterials = originalMaterials.filter((material) => {
        return material.category.toLowerCase().includes(value.toLowerCase());
      });
      setMaterials(filteredMaterials);
    }
  };
  useEffect(() => {
    fetchMaterial();
  }, []);
  const lastPostIndex = currentPage * postPerpage;
  const firstPostIndex = lastPostIndex - postPerpage;
  const currentMaterials = materials.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className={`container p-5 ${styles.learning_container}`}>
        <NavBar />
        <h1 className="">Learning Materials</h1>
        <div
          className="input-group mb-3"
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <input
            type="text"
            className="form-control p-3"
            style={{ backgroundColor: "#FAF3EB" }}
            placeholder="Search by title "
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={title}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-center gap-5">
          <div className="mt-3">
            <div className="subjects">
              <h3>Filter & Sort</h3>
              <h4>Categories</h4>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioDefault"
                  id="radioDefault1"
                  onChange={filterByCategory}
                  value="all"
                />
                <label className="form-check-label" htmlFor="radioDefault1">
                  All
                </label>
              </div>
              {categories.map((category, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault1"
                    onChange={filterByCategory}
                    value={category}
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
            {currentMaterials.map((material, index) => {
              const firstLetter = material.title.charAt(0);
              return (
                <div
                  className={`card m-3 p-3 d-flex flex-row gap-3 ${styles.card}`}
                  style={{ backgroundColor: "#FAF3EB" }}
                  key={index}
                >
                  <div className={` ${styles.icon}`}>
                    <p className={`${styles.first}`}> {firstLetter} </p>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title text-capitalize">
                      {" "}
                      {material.title}{" "}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {material.category}
                    </h6>
                    <p className="card-text">{material.description}</p>
                    <p className="card-link">
                      Uploaded by : {material.uploader}
                    </p>
                  </div>
                  <div className="d-flex justify-content-end flex-column ">
                    <button className={`btn ${styles.material}`}>
                      Preview
                    </button>
                    <button className={`btn ${styles.material}`}>
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
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
      <Footer />
    </>
  );
};

export default LearningMaterial;
