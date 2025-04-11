import Hero from "./Hero";
import NavBar from "./NavBar";
import styles from "./Homepage.module.css";
import HowItWorks from "./HowItWorks";
import Support from "./Support";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
      <div className={`container p-2 p-sm-5 ${styles.main}`}>
        <section className={`${styles.hero} `}>
          <NavBar />
          <div className={`${styles.hero_container}`}>
            <Hero />
          </div>
        </section>
        <HowItWorks />
        <Support />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
