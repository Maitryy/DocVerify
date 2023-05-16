import React, {useState, useEffect, useRef, useContext} from 'react';
import styles from './OrgAddRecord.module.css';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import tick from '../../assets/tick.svg';
import { ContractContext } from "../../contexts/ContractContext";
import { useNavigate } from 'react-router-dom';
import ipfs from '../../ipfs';

const OrgAddRecord = () => {

    const {state} = useContext(ContractContext);
    const navigate = useNavigate();
    const uploadImageInput = useRef(null);
    const [orgInfo, setOrgInfo] = useState({});
    const [fileName, setFileName] = useState("Select file")
    const [userAddress, setUserAddress] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [recordTitle, setRecordTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [isChecked, setIsChecked] = useState(false);

    const handleUploadImage = () => {
        uploadImageInput.current.click();
    }

    const handleFileChange = (e) => {
        setFileName(e.target.files[0].name);
        setImageFile(e.target.files[0]);
    }

    useEffect(() => {
        async function fetchData() {
        const { accounts, contract } = state;
        if(contract){
          const res = await contract.methods.getOrg(`${accounts[0]}`).call();
          console.log(res);
          setOrgInfo(res);
        //   setPersonInfo(res5);
        }
    }
    fetchData();
      }, [state])

    const searchUser = async () => {
        const { accounts, contract } = state;
        console.log(accounts);
        console.log(contract);
        try{
            const res = await contract.methods.getPerson(`${userAddress}`).call();
            if(res.name === ''){alert("Incorrect"); return;}
            setAadharNumber(res.AadharNo);
            setContactNumber(res.contactNo)
            console.log(res);
        }catch(err){
            console.log(err);
            alert("There is a problem");
        }
    }

    const handleSubmitRecord = async () => {
        if(!isChecked || userAddress === "" || aadharNumber === "" || contactNumber === "" || recordTitle === "" || description === "" || imageFile == null){
            alert("Fill everything first"); return;
        }
        try{
            const { accounts, contract } = state;
            if (!imageFile) {

                return alert("No files selected");
              }
              const nfiles = [new File([imageFile], "documents.pdf")];
             
              const cid = await ipfs.put(nfiles);
            
              let url = "https://" + cid +".ipfs.w3s.link/documents.pdf"
        
                await contract.methods.addPersonDoc(userAddress, Number(orgInfo.type_org), `${accounts[0]}`, `${url}`, recordTitle, description).send({ from: accounts[0] });
                navigate("/");

                
               
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className={styles.orgAddRecordPageContainer}>
            <div className={styles.orgAddRecordContent}>
                <div className={styles.orgNameContainer} style={{justifyContent: "center"}}>
                    <span className="Home_tagLine__jypHz" >{orgInfo.name ? orgInfo.name : "Loading..."}</span>
                    <div className={styles.verifyIconContainer}>
                        {(orgInfo.isVerified && orgInfo.isVerified == true) ? <img className={styles.verifyIcon} src={tick}/> : <></> }
                    </div>
                </div>
                <div className="Home_tagLine__jypHz" style={{ marginLeft: "-400px" }}>Add Record</div>
                <div className={styles.recordForm}>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Person's Address</span>
                        <input style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }} value={userAddress} onChange={(e) => {setUserAddress(e.target.value)}} className={`${styles.customInput} ${styles.smallInput}`} type="text" placeholder={"Ethereum Address"} />
                    </div>
                    <div className={styles.inputGroup}>
                        <button onClick={searchUser} className={styles.verifyBtn}>
                            <SearchIcon />
                        </button>
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Aadhar Number</span>
                        <input style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }} value={aadharNumber} onChange={(e) => {setAadharNumber(e.target.value)}} className={`${styles.customInput} ${styles.disabledInput}`} disabled type="number" pattern="\d*" maxLength="12" placeholder={"0000-0000-0000-0000"} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Contact Number</span>
                        <input style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }} value={contactNumber} onChange={(e) => {setContactNumber(e.target.value)}} className={`${styles.customInput} ${styles.disabledInput}`} disabled type="number" placeholder={""} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Record Title</span>
                        <input style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }} value={recordTitle} onChange={(e) => {setRecordTitle(e.target.value)}} className={`${styles.customInput}`} type="text" placeholder={""} />
                    </div>
                    <div></div>
                    <div className={`${styles.inputGroup} ${styles.spanInputGroup}`}>
                        <span className={styles.inputLabel}>Description</span>
                        <textarea style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }} value={description} onChange={(e) => {setDescription(e.target.value)}} className={`${styles.customInput} ${styles.addressInput}`}/>
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Upload Document</span>
                        <button style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)" }} onClick={handleUploadImage} className={styles.uploadFileBtn}>
                            <UploadIcon sx={{marginRight: 1}}/>
                            {fileName}
                        </button>
                        <input onChange={handleFileChange} ref={uploadImageInput} accept=".pdf"   className={`${styles.customInput} ${styles.fileUploadInput}`} type="file" placeholder={""} />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.rowInputGroup} ${styles.spanInputGroup}`}>
                        <input onChange={(e) => { setIsChecked(e.target.checked); }}  className={`${styles.customCheckInput}`} type="checkbox" placeholder={""} />
                        <span className={styles.inputLabel}>I assure that the above infomation is correct.</span>
                    </div>
                    <div className={styles.inputGroup}>
                        <button onClick={handleSubmitRecord} className={styles.registerBtn}>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrgAddRecord;