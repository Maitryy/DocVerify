import React from "react";
import "./Verify.css";
import "./Request.css";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ContractContext } from "../contexts/ContractContext";
import { useContext } from "react";

export default function Verify() {
  const {state} = useContext(ContractContext);
  const [isVerifier, setIsVerifier] = useState(false);
  const [unverifiedRequests, setUnverifiedRequests] = useState([]);

  useEffect(() => {
    async function getVerifiers() {
      
     
      
       setIsVerifier(true);
        
      
    }

      getVerifiers();
    
  }, []);

  useEffect(() => {
    async function getUnverifiedRequests() {
      if (isVerifier) {
        const {  contract } = state;
        let unverifiedRequestsLength = parseInt(
          await contract.methods.activeRequestsLength().call()
        );
        let tmp = [];
        for (let i = 0; i < unverifiedRequestsLength; ++i) {
          let address = await contract.methods.activeRequests(i).call()
          let res = await contract.methods.getOrg(`${address}`).call();
          tmp.push(res);
        }
        setUnverifiedRequests(tmp);
      }
    }
    if (isVerifier) {
      getUnverifiedRequests();
    }
  }, [isVerifier]);

  return (
    
    <div className="mainContainer">
    <div
              className="Home_tagLine__jypHz"
              style={{marginLeft:"-100px", marginTop:"-300px"}}
            >
              Pending Requests
            </div>
      
      {isVerifier ? (
        <Container>
          <Row xs={1} md={2} lg={3} className="g-4 pt-5">
            {unverifiedRequests.map((_, idx) => (
              <Col key={idx}>
                <Card
                  className="m-2 card-bg "
                  style={{ borderRadius: "16px", fontFamily: "Manrope" }}
                >
                  <Card.Body className="text-light">
                    <Card.Title style={{ fontWeight: "bold" }}>
                      {_.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "14px" }}>
                      {_.about}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "14px" }}>
                      Contact No. : {_.contactNo}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "14px" }}>
                      Email : {_.email}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "14px" }}>
                      Address : {_.phyAdd}
                    </Card.Text>
                    
          
                    <Form.Group
                      className="my-4 mx-4"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="text-light">
                        Organisation type: {_.type_org == 0 ? "Education Organisation" : _.type_org ==2 ? "Medical Organisation" : " Criminal Organisation"} 
                      </Form.Label>
                      
                    </Form.Group>
                    <div className="row" style={{ marginLeft: "0.2vw" }}>
                      <div className="col-2 mt-2">
                        <Button
                          variant="success"
                          
                          onClick={() => {
                            const { accounts, contract } = state;
                            contract.methods
                              .upvoteRequest(_.orgAddress)
                              .send({ from: accounts[0] })
                              .once("receipt", (receipt) => {
                                let tmp = unverifiedRequests;
                                tmp = tmp
                                  .slice(0, idx)
                                  .concat(tmp.slice(idx + 1, tmp.length));
                                setUnverifiedRequests(tmp);
                              })
                              .once("error", (error) => {
                                console.log(error);
                              });
                          }}
                        >
                          +
                        </Button>
                      </div>
                      <button className="registerBtn col-7" >
                        {" "}
                        <a
                          target="_blank"
                          href={_.pic_hash}
                          style={{ textDecoration: "none", color: "black" , fontSize: "20px"}}
                        >
                          View Documents
                        </a>{" "}
                      </button>
                      <div className="col-2 mt-2">
                        <Button
                          variant="danger"
                          onClick={() => {
                            const { accounts, contract } = state;
                            contract.methods
                              .downvoteRequest(_.orgAddress)
                              .send({ from: accounts[0] })
                              .once("receipt", (receipt) => {
                                console.log(receipt);
                                let tmp = unverifiedRequests;
                                tmp = tmp
                                  .slice(0, idx)
                                  .concat(tmp.slice(idx + 1, tmp.length));
                                setUnverifiedRequests(tmp);
                              })
                              .once("error", (error) => {
                                console.log(error);
                              });
                          }}
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <div>
          <div className="card-verify text-light">
            <h1 className="pt-5">Sorry!!</h1>
            <h2 className="pb-5">You're unauthorized</h2>
          </div>
        </div>
      )}
    </div>
  );
}
