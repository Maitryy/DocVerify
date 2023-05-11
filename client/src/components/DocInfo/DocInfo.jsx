import React, {useState, useEffect} from 'react';
import styles from './DocInfo.module.css';
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const DocInfo = () => {
    const location = useLocation();
    const [recordInfo, setRecordInfo] = useState({});

    useEffect(() => {
        if(location && location.state){
            setRecordInfo(location.state);
            console.log(location.state);
        }
    },[location])



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
                      {recordInfo.doc_title}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "14px" }}>
                      Uploaded by: {recordInfo.org_name}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "14px" }}>
                      {recordInfo.Description}
                    </Card.Text>
                    <a href={recordInfo.Hash}>
                    <Button className={styles.registerBtn}>
                    <span>View Document</span>
                    </Button>
                    </a>
                      
                  </Card.Body>
                </Card>
                
                
            </div>
        </div>
        </div>
    );
}

export default DocInfo;


