import React from "react";
import styles from "../Register/Register.module.css";

export default function Navigation() {
  return (
    <div style={{margin: "0px 100px"}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            E-Kagaz
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/" >
                  Home
                </a>
              </li>
              
            </ul>
            <span className="navbar-text">
              Navbar text with an inline element
            </span>
          </div>
        </div>
        
        
      </nav>
      <div className={styles.lineSepeartor}></div>
    </div>
  );
}
