import React from "react";
import styles from "./Organizations.module.css";
import { useNavigate } from "react-router-dom";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

const Organization = () => {
  const navigate = useNavigate();

  const handleEduOrgRegBtn = () => {
    navigate("/registerEduOrg");
  };

  const handleMediOrgRegBtn = () => {
    navigate("/registerMediOrg");
  };

  const handleCrimiOrgRegBtn = () => {
    navigate("/registerCrimiOrg");
  };
  return (
    <div>
      <div className="Home_mainContainer__3jV_j">
        <div className="Home_mainContent__tv_6Y">
          <div style={{ marginTop: "-100px" }}>
            <div
              className="Home_tagLine__jypHz"
              style={{marginLeft:"-100px"}}
            >
              Register New Organization
            </div>
            <div
              style={{ margin: "10px 200px", color: "white", fontSize: "20px" }}
            >
              Click on any of the below buttons, based on the type of type of
              organization you are!
              <br />
              <br />
              Organizations act as bodies which distribute Records or Documents
              digitally to the user. It can be an Educational Center, a Medical
              Facility or Crime and Police Department.
            </div>
            <br />
            <br />
            <div
              className={styles.registerOptionContainer}
              style={{ margin: "0px 200px" }}
            >
              <div
                className={styles.registerCard}
                onClick={handleEduOrgRegBtn}
                style={{ marginRight: "40px" }}
              >
                <LocationCityIcon sx={{ fontSize: 50, marginBottom: 1 }} />
                <span className={styles.textWrap}>
                  Educational Organization
                </span>
              </div>
              <div
                className={styles.registerCard}
                onClick={handleMediOrgRegBtn}
                style={{ marginRight: "40px" }}
              >
                <LocalHospitalIcon sx={{ fontSize: 50, marginBottom: 1 }} />
                <span>Medical Organization</span>
              </div>
              <div
                className={styles.registerCard}
                onClick={handleCrimiOrgRegBtn}
              >
                <LocalPoliceIcon sx={{ fontSize: 50, marginBottom: 1 }} />
                <span>Criminal Organization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Organization;
