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
import InputGroup from "react-bootstrap/InputGroup";
import { ContractContext } from "../contexts/ContractContext";
import { useContext } from "react";

export default function Verify() {
  const {state, name} = useContext(ContractContext);
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
        const { accounts, contract } = state;
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
    <div>
      <div className="blur verify-bg"></div>
      {isVerifier ? (
        <Container>
          <Row xs={1} md={2} lg={3} className="g-4 pt-5">
            {unverifiedRequests.map((_, idx) => (
              <Col key={idx}>
                <Card
                  className="m-2 card-bg "
                  style={{ borderRadius: "16px", fontFamily: "Manrope" }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://www.hindustantimes.com/ht-img/img/2023/04/12/550x309/IMAGE_1679302987_1681265098418_1681265105760_1681265105760.jpg`}
                    style={{
                      height: "370px",
                      width: "400px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body className="text-light">
                    <Card.Title style={{ fontWeight: "bold" }}>
                      {_.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "14px" }}>
                      {_.about}
                    </Card.Text>
                    <Form.Group
                      className="my-4 mx-4"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="text-light">
                        Amount to be raised:
                      </Form.Label>
                      <InputGroup aria-disabled={true}>
                        <InputGroup.Text>ETH</InputGroup.Text>
                        <Form.Control defaultValue={parseInt(_.type_org)} />
                      </InputGroup>
                    </Form.Group>
                    <div className="row" style={{ marginLeft: "0.2vw" }}>
                      <div className="col-2 mt-2">
                        <Button
                          variant="success"
                          onClick={() => {
                            const { accounts, contract } = state;
                            contract.methods
                              .upvoteRequest(_.orgAddress)
                              .send({ from: accounts[0], gas: 1000000 })
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
                      <button variant="primary" className="btn-grad col-7">
                        {" "}
                        <a
                          target="_blank"
                          href={_.pic_hash}
                          style={{ textDecoration: "none", color: "black" }}
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
                              .send({ from: accounts[0], gas: 1000000 })
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
