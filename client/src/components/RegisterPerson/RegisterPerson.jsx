import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./RegisterPerson.module.css";
import { ContractContext } from "../../contexts/ContractContext";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import ipfs from "../../ipfs";
import per from "../../images/per.png";


const RegisterPerson = () => {
  const { state, name } = useContext(ContractContext);
  const navigate = useNavigate();
  const uploadImageInput = useRef(null);
  const [fileName, setFileName] = useState("Select file");
  const [imageFile, setImageFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [aadharNum, setAadharNum] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  

    const handleUploadImage = () => {
        uploadImageInput.current.click();
    };

    const handleFileChange = (e) => {
        setFileName(e.target.files[0].name);
        setImageFile(e.target.files[0]);
    }

    const handleGenderChange = (e) =>{
        setGender(e.target.value)
    }

    const handleRegister = async () => {
        if(!isChecked || fileName == "" || fullName === "" || aadharNum === "" || contactNum === "" || gender === "" || physicalAddress === "" || dob == ""){
            alert("Enter all details first");
            return;
        }
        setLoading(true);
        try{
            const { accounts, contract } = state;
            console.log(accounts);

            // new
            console.log(imageFile)
            if (!imageFile) {

                return alert("No files selected");
              }
              const nfiles = [new File([imageFile], "profilepic.jpeg")];
             
              const cid = await ipfs.put(nfiles);
              // let url = "https://ipfs.io/ipfs/" + cid + "/documents.pdf";
              let url = "https://" + cid +".ipfs.w3s.link/profilepic.jpeg"
         

            await contract.methods.registerPerson(`${accounts[0]}`, url, fullName, gender, aadharNum, physicalAddress, dob, contactNum).send({ from: accounts[0] });
            const res5 = await contract.methods.getPerson(`${accounts[0]}`).call();
            console.log(res5);
            navigate("/")


            
        }catch(err){
            console.log(err);
            return;
        }
    };

    return (
        <div className={styles.registerPersonPageContainer}>
            <div className={styles.registerContentContainer}>
            <span className="Home_tagLine__jypHz" style={{ marginLeft: "150px", marginTop: "-35px" }}>
          Your Data. Our Responsibility.
        </span>
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
                <div className={styles.registrationForm} style={{ marginLeft: "200px", marginTop: "50px" }}>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Full Name</span>
                        <input value={fullName} onChange={(e) => {setFullName(e.target.value)}} className={`${styles.customInput} ${styles.smallInput}`} type="text" placeholder={"First Middle Last"} 
                            style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }}
                        />
                    </div>
                    <div></div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Aadhar Number</span>
                        <input value={aadharNum} onChange={(e) => {setAadharNum(e.target.value)}} className={`${styles.customInput}`} type="number" pattern="\d*" maxlength="12" placeholder={"0000-0000-0000-0000"}
                        style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Contact Number</span>
                        <input value={contactNum} onChange={(e) => {setContactNum(e.target.value)}} className={`${styles.customInput}`} type="number" placeholder={""} 
                            style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Date of Birth</span>
                        <input onChange={(e) => {setDob(e.target.value);}} className={`${styles.customInput}`} type="date" placeholder={""} 
                            style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}
                        style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }}>Gender</span>
                        <select value={gender} className={styles.customInput} name="genderInput"
                            onChange={handleGenderChange}
                            style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className={`${styles.inputGroup} ${styles.spanInputGroup}`}>
                        <span className={styles.inputLabel}>Address</span>
                        <textarea value={physicalAddress} onChange={(e) => {setPhysicalAddress(e.target.value)}} className={`${styles.customInput} ${styles.addressInput}`}
                            style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Upload Image Document</span>
                        <button onClick={handleUploadImage} className={styles.uploadFileBtn}
                        style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }}>
                            <UploadIcon sx={{marginRight: 1}}/>
                            {fileName}
                        </button>
                        <input onChange={handleFileChange} ref={uploadImageInput} accept="image/*" className={`${styles.customInput} ${styles.fileUploadInput}`} type="file" placeholder={""} />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.rowInputGroup} ${styles.spanInputGroup}`}>
                        <input onChange={(e) => { setIsChecked(e.target.checked); }} className={`${styles.customCheckInput}`} type="checkbox" placeholder={""} />
                        <span className={styles.inputLabel}>I have read all the terms and conditions</span>
                    </div>
                    {loading ? "Loading..." : 
                    <div className={styles.inputGroup}>
                        <button onClick={handleRegister} className={styles.registerBtn}>REGISTER</button>
                    </div>
                    }
                    
                </div>
                </div>
                
            </div>
            <div className={styles.infoContentContainer}>
            <span className="Home_tagLine__jypHz" style={{ marginLeft: "65px" }}>
          E-Kagaz
        </span>
        <img className={styles.perImage} src={per} />
                <span className={styles.textContent}>
                1.) Enter your basic details like name, Aadhar number etc<br/>
                2.) Upload your profile picture. <br/>
                3.) Check in to adhere to all the terms and conditions<br/>
                4.) And you are done! Just click submit!!<br/>
                </span>
                <div className={styles.endSeperator}></div>
            </div>
        </div>
    );
}

export default RegisterPerson;
