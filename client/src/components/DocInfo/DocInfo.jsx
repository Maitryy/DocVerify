import React, {useState, useEffect, useContext} from 'react';
import styles from './DocInfo.module.css';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddIcon from '@mui/icons-material/Add';
import tick from '../../assets/tick.svg';
import { useNavigate, useLocation } from "react-router-dom";
import { ContractContext } from "../../contexts/ContractContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const DocInfo = () => {
    const {state, name} = useContext(ContractContext);
    const navigate = useNavigate();
    const [orgInfo, setOrgInfo] = useState({});
    const location = useLocation();
    const [recordInfo, setRecordInfo] = useState({});

    useEffect(() => {
        if(location && location.state){
            setRecordInfo(location.state);
            console.log(location.state);
        }
    },[location])

    // useEffect(async() => {
    //     const { accounts, contract } = state;
    //     if(contract){
    //       const res = await contract.methods.getOrg(`${accounts[0]}`).call();
    //       console.log(res);
    //       setOrgInfo(res);
    //     //   setPersonInfo(res5);
    //     }
    //   }, [state])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.docInfoPageContainer}>
            <div className={styles.docInfoContent}>
                <span className="Home_tagLine__jypHz" style={{marginLeft: "-400px"}}>Record</span>
                <Card
                  className="m-2 card-bg "
                  style={{ borderRadius: "16px", fontFamily: "Manrope" }}
                >
                  <Card.Body className="text-light">
                    <Card.Title style={{ fontWeight: "bold", fontSize: "25px" }}>
                      Title name
                    </Card.Title>
                    <Card.Text style={{ fontSize: "14px" }}>
                      Description
                    </Card.Text>
                    
                    <Button className={styles.registerBtn}>
                    <a href={recordInfo.Hash}><span>View Document</span></a>
                    </Button>
                      
                  </Card.Body>
                </Card>
                {/* <div className={styles.subHeading}>Information</div>
                <div className={styles.infoTitle}>Title: Some Title Name</div>
                <div className={styles.infoDescription}>{recordInfo.Description ? recordInfo.Description : ""}</div>
                <div className={styles.infoOrgName}>by {recordInfo.org_name ? recordInfo.org_name : ""}</div> */}
                
            </div>
        </div>
        </div>
    );
}

export default DocInfo;


