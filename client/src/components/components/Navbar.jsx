import styles from "../Register/Register.module.css";
import { ContractContext } from "../../contexts/ContractContext";
import React, {useContext } from "react";

export default function Navigation() {
  const {state} = useContext(ContractContext);
  const { accounts } = state;
  return (
    <div  style={{padding: "0px 100px", position: "sticky",background: "linear-gradient(to right, #695BB8 , #E2783D)"}}  >
      <nav className="navbar navbar-expand-lg navbar-light" style={{margin: "0px 100px"}}>
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
              {accounts}
            </span>
          </div>
        </div>
        
        
      </nav>
      <div className={styles.lineSepeartor}></div>
    </div>
  );
}
