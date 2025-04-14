import styles from "./AddLearningMaterial.module.css";

const AddLearningMaterials = () => {
  return (
    <div className={`container p-5 ${styles.addlearning_container}`}>
      <h1 className="text-capitalize">
        Share knowledge, <br /> empower learners
      </h1>
      <p className="fs-4">Upload your learning material to help other grow</p>
      <form>
        <h2>Add Learning Material</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="title"
            aria-describedby="title"
            placeholder="e.g Programming fundamentals"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            placeholder=" Enter material description"
            rows={5}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="category"
            aria-describedby="category"
            placeholder="e.g Tech"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="FileURL" className="form-label">
            File URL
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="FileURL"
            aria-describedby="FileURL"
            placeholder="e.g https://www.learn.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ThumbnailURL" className="form-label">
            Thumbnail URL
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="ThumbnailURL"
            aria-describedby="ThumbnailURL"
            placeholder="e.g https://www.learn.com"
          />
        </div>
        <div className={styles.warning}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#0c2d48"
            className="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
          <p>
            Make sure the material is accurate, educational, and clearly titled.
            Uploaded content is reviewed regularly.
          </p>
        </div>

        <button type="submit" className={`btn my-4 p-3 ${styles.button}`}>
          Submit Materials
        </button>
      </form>
    </div>
  );
};

export default AddLearningMaterials;
