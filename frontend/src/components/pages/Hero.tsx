import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className="pt-5 d-flex flex-column justify-content-center   ">
      <div className="hero_title fs-1 text-capitalize ">
        <h2>learn together</h2>
        <h2>Grow together</h2>
        <h2>with ShuleConnect</h2>
      </div>

      <p className="pt-3">
        Access shared resources and collaborate <br /> to enhance your learning
        experience
      </p>
      <div className="btn d-flex flex-column gap-3 flex-sm-row">
        <button className={`btn ${styles.material}`}>Explore materials</button>
        <button className="btn btn-light">Ask a question</button>
        <button className={`btn ${styles.material}`}>add materials</button>
      </div>
    </div>
  );
};

export default Hero;
