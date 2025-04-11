import style from "./Support.module.css";

const Support = () => {
  return (
    <div>
      <h2>support our mission</h2>
      <div>
        <p>Your donation can make a difference</p>
        <div className="">
          <button className="btn btn-light me-3 mb-2">Small</button>
          <button className="btn btn-light me-3 mb-2">Medium</button>
          <button className="btn btn-light me-3 mb-2">Large</button>
          <button className="btn btn-light me-3 mb-2">Custom</button>
        </div>
        <div className="text-end">
          <button className={`btn my-3 ${style.donate}`}>
            Donate Securely
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
