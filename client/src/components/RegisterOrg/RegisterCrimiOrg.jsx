import React, { useState, useContext, useRef } from "react";
import styles from "./RegisterOrg.module.css";

import crime from "../../images/crime2.png";
import { ContractContext } from "../../contexts/ContractContext";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import ipfs from "../../ipfs";


const RegisterCrimiOrg = () => {
  const { state } = useContext(ContractContext);
  const navigate = useNavigate();
  const uploadImageInput = useRef(null);
  const [fileName, setFileName] = useState("Select file");
  const [imageFile, setImageFile] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPhyAddress, setOrgPhyAddress] = useState("");
  const [orgAbout, setOrgAbout] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  const handleUploadImage = () => {
    uploadImageInput.current.click();
  };

  const handleFileChange = (e) => {
    setFileName(e.target.files[0].name);
    setImageFile(e.target.files[0]);
  };

  const handleRegister = async () => {
    if (
      !isChecked ||
      orgName === "" ||
      contactNum === "" ||
      orgLocation === "" ||
      orgEmail === "" ||
      orgPhyAddress === "" ||
      orgAbout === ""
    ) {
      alert("Enter all details first");
      return;
    }

    try {
      const { accounts, contract } = state;
      console.log(accounts);

      if (!imageFile) {
        return alert("No files selected");
      }
      const nfiles = [new File([imageFile], "documents.pdf")];

      const cid = await ipfs.put(nfiles);
      // let url = "https://ipfs.io/ipfs/" + cid + "/documents.pdf";
      let url = "https://" + cid + ".ipfs.w3s.link/documents.pdf";

   

      await contract.methods
        .registerOrg(
          `${accounts[0]}`,
          orgName,
          1,
          `${url}`,
          contactNum,
          orgLocation,
          orgAbout,
          orgPhyAddress,
          orgEmail,
          orgEmail
        )
        .send({ from: accounts[0] });
      const res5 = await contract.methods.getOrg(`${accounts[0]}`).call();
      console.log(res5);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  
  };

  return (
    <div className={styles.registerOrgPageContainer}>
      <div className={styles.registerContentContainer}>
        <div>
          <div>
            <span
              className="Home_tagLine__jypHz"
              style={{ marginLeft: "200px" }}
            >
              Your Data. Our Responsibility.
            </span>
            <br />
            <br />
            <br />
            <div
              className="req_class"
              id="secluding-form"
              style={{
                background: "rgba(00000,00000,00000,0.2)",
                paddingTop: "35px",
                paddingBottom: "35px",
                marginRight: "200px",
                borderRadius: "25px",
              }}
            >
              <div
                className={styles.registrationForm}
                style={{ marginLeft: "200px", marginTop: "50px" }}
              >
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>Organization Name</span>
                  <input
                    value={orgName}
                    onChange={(e) => {
                      setOrgName(e.target.value);
                    }}
                    className={`${styles.customInput} ${styles.smallInput}`}
                    type="text"
                    placeholder={"Name"}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>Contact Number</span>
                  <input
                    value={contactNum}
                    onChange={(e) => {
                      setContactNum(e.target.value);
                    }}
                    className={`${styles.customInput}`}
                    type="number"
                    pattern="\d*"
                    maxLength="12"
                    placeholder={"0000000000"}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>Location</span>
                  <input
                    value={orgLocation}
                    onChange={(e) => {
                      setOrgLocation(e.target.value);
                    }}
                    className={`${styles.customInput}`}
                    type="text"
                    placeholder={""}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>Email</span>
                  <input
                    value={orgEmail}
                    onChange={(e) => {
                      setOrgEmail(e.target.value);
                    }}
                    className={`${styles.customInput}`}
                    type="email"
                    placeholder={""}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <div
                  className={`${styles.inputGroup} ${styles.spanInputGroup}`}
                >
                  <span className={styles.inputLabel}>Address</span>
                  <textarea
                    value={orgPhyAddress}
                    onChange={(e) => {
                      setOrgPhyAddress(e.target.value);
                    }}
                    className={`${styles.customInput} ${styles.addressInput}`}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <div
                  className={`${styles.inputGroup} ${styles.spanInputGroup}`}
                >
                  <span className={styles.inputLabel}>About</span>
                  <textarea
                    value={orgAbout}
                    onChange={(e) => {
                      setOrgAbout(e.target.value);
                    }}
                    className={`${styles.customInput} ${styles.addressInput}`}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>
                    Upload Organization Verification Supporting Document
                  </span>
                  <button
                    onClick={handleUploadImage}
                    className={styles.uploadFileBtn}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  >
                    <UploadIcon sx={{ marginRight: 1 }} />
                    {fileName}
                  </button>
                  <input
                    onChange={handleFileChange}
                    ref={uploadImageInput}
                    accept=".pdf"
                    className={`${styles.customInput} ${styles.fileUploadInput}`}
                    type="file"
                    placeholder={""}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <div
                  className={`${styles.inputGroup} ${styles.rowInputGroup} ${styles.spanInputGroup}`}
                >
                  <input
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                    }}
                    className={`${styles.customCheckInput}`}
                    type="checkbox"
                    placeholder={""}
                    style={{
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                  <span className={styles.inputLabel}>
                    I have read all the terms and conditions
                  </span>
                </div>
                <div className={styles.inputGroup}>
                  <button
                    onClick={handleRegister}
                    className={styles.registerBtn}
                  >
                    REGISTER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoContentContainer}>
        <span className="Home_tagLine__jypHz" style={{ marginLeft: "65px" }}>
          E-Kagaz
        </span>
        <img className={styles.crimeImage} src={crime} />
        <span className={styles.textContent}>
          1) Enter details like organization name, Contact number etc.
          <br />
          2) Upload a supporting document for verification. <br />
          3) Check in to adhere to all the terms and conditions.
          <br />
          4) And you are done! Just click register!
          <br />
        </span>
        <div className={styles.endSeperator}></div>
      </div>
    </div>
  );
};

export default RegisterCrimiOrg;
