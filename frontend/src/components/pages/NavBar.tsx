import Logo from "./Logo";
import styles from "./NavBar.module.css";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg  d-flex ">
      <div className="container-fluid d-flex align-items-center justify-content-between   ">
        <Logo />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className={`nav-link active ${styles.links}`} href="/">
                About us
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link active ${styles.links}`}
                aria-current="page"
                href="/materials"
              >
                learning materials
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link active ${styles.links}`} href="#">
                Q&A Forum
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link active ${styles.links}`} href="#">
                donate
              </a>
            </li>

            <li className="nav-item">
              <a className={`nav-link active ${styles.links}`} href="/register">
                Get started
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
