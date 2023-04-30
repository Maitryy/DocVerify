import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";

const Register = () => {
  const navigate = useNavigate();

  const handleIndividualRegBtn = () => {
    navigate("/registerPerson");
  };

  const handleOrganizationRegBtn = () => {
    navigate("/organizations");
  };

  return (
    <div>
      {/* <div className={styles.homePageContainer}>
      <div className={styles.lineSepeartor}></div>
      </div> */}
      <div className="Home_mainContainer__3jV_j">
        <div className="Home_mainContent__tv_6Y">
          <div style={{ marginTop: "-100px" }}>
            {/* <div className={styles.registerContentContainer}> */}
            <div
              className="Home_tagLine__jypHz"
              style={{ margin: "0px -300px" }}
            >
              DeDocs
            </div>
            <div
              style={{ margin: "10px 200px", color: "white", fontSize: "20px" }}
            >
              If you are an individual, just head over to the individual section
              and get yourself registered.
              <br />
              <br />
              If you are an organization, just move over to the organization
              section, and get registered as any of the Educational, Medical or
              Criminal organization
            </div>

            <div
              className="Home_tagLine__jypHz"
              style={{ margin: "0px -170px" }}
            >
              Create new account
            </div>

            <div
              className={styles.registerOptionContainer}
              style={{ margin: "0px 200px" }}
            >
              <div>
                <div
                  className={styles.registerCard}
                  onClick={handleIndividualRegBtn}
                  style={{ marginRight: "40px" }}
                >
                  <PersonIcon sx={{ fontSize: 50, marginBottom: 1 }} />
                  <span>Individual</span>
                </div>
              </div>
              <div
                className={styles.registerCard}
                onClick={handleOrganizationRegBtn}
              >
                <LocationCityIcon sx={{ fontSize: 50, marginBottom: 1 }} />
                <span>Organization</span>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
