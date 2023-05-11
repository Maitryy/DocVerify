import React, {useState, useEffect, useContext} from 'react';
import styles from './FindDocs.module.css';
import SearchIcon from '@mui/icons-material/Search';
import tick from '../../assets/tick.svg';
import { useNavigate } from "react-router-dom";
import { ContractContext } from "../../contexts/ContractContext";


const FindDocs = () => {
    const {state} = useContext(ContractContext);
    const navigate = useNavigate();
    const [orgInfo, setOrgInfo] = useState({});
    const [userAddress, setUserAddress] = useState("");
    const [docList, setDocList] = useState([]);


    const handleDocClick = (obj) => {
        navigate("/doc", {state:obj});
    }

    const searchUserRecords = async () => {
        const {  contract } = state;
        try{
            const res = await contract.methods.getDocsList(`${userAddress}`, Number(orgInfo.type_org)).call();
            console.log(res);
            setDocList(res);
        }catch(err){
            console.log(err)
        }
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

    return (
        <div className={styles.findDocsPageContainer}>
            <div className={styles.findDocsPageContent}>
                <div className={styles.orgNameContainer}>
                    <span className="Home_tagLine__jypHz"  style={{width: "20%"}}>{orgInfo.name ? orgInfo.name : "Loading..."}</span>
                    <div className={styles.verifyIconContainer}>
                        {(orgInfo.isVerified && orgInfo.isVerified == true) ? <img className={styles.verifyIcon} src={tick}/> : <></> }
                    </div>
                </div>
                <div className="Home_tagLine__jypHz" style={{fontSize: "30px", marginLeft: "-380px"}}>Search User Records</div>
                <div className={styles.recordSearchForm}>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel} >Person's Address</span>
                        <input style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)", marginLeft: "30px", marginTop: "10px" }} value={userAddress} onChange={(e) => {setUserAddress(e.target.value)}} className={`${styles.customInput} ${styles.smallInput}`} type="text" placeholder={"Ethereum Address"} />
                    </div>
                    <div className={styles.inputGroup}>
                        <button onClick={searchUserRecords} className={styles.verifyBtn}>
                            <SearchIcon />
                        </button>
                    </div>
                </div>
                <div className={styles.subTitleResults} style={{marginLeft: "30px"}}>Results</div>
                <div className={styles.docListContainer}>
                    {
                        docList.map((doc, index) => {
                            return <div onClick={()=>{handleDocClick(doc);}} className={styles.docCard} key={index}>
                                <span className={styles.docCardTitle}>{doc.doc_title}</span>
                                <span className={styles.docCardOrg}>by {doc.org_name}</span>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default FindDocs;