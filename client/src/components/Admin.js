import React, { useState, useEffect,useContext } from "react";
import { Container } from "react-bootstrap";
import "./FormModal.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Spinner, Row, Col, Button, Card } from "react-bootstrap";
import { ContractContext } from "../contexts/ContractContext";
import bgver from "../images/bgver.jpg"
import styles from "../components/Home/Home.module.css"
export default function Admin() {
  const [loader, setLoader] = useState(false);
  const [newVerifier, setNewVerifier] = useState("");
  const [verifiers, setVerifiers] = useState([]);
  const [admin, setAdmin] = useState("");
  const {state, name} = useContext(ContractContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { accounts, contract } = state;
    setLoader(true);
    contract.methods
      .addVerifier(newVerifier)
      .send({ from: accounts[0], gas: 1000000 })
      .then(() => {
        let tmp = verifiers;
        tmp.push(newVerifier);
        setVerifiers(tmp);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        alert("Not added");
        console.log(err);
      });
  };

  useEffect(() => {
    async function getData() {
      const { accounts, contract } = state;
      // console.log(await contract.methods.admin().call());
      // let ad = await contract.methods.admin().call();
      setAdmin(accounts[0]);
      let l = await contract.methods.verifierCount().call();
      let tmp = [];
      for (let i = 0; i < l; ++i) {
        let v = await contract.methods.verifiersArr(i).call();
        tmp.push(v);
      }
      setVerifiers(tmp);
    }
    
      getData();
    
  }, []);

  return (
    <div className={styles.mainContainer} >
      <Container>
        <div
          className="admin_form_bg"
          style={{
            paddingBottom: "20px",
            paddingTop: "2vh",
            marginTop: "3vh",
          }}
        >
          <Form  onSubmit={onSubmitHandler} >
            <Form.Group className="my-3 mx-4" controlId="formHorizontalEmail">
              <Row>
                <Col className="col-2">
                  <Form.Label
                    className="text-light"
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      textAlign: "right",
                    }}
                  >
                    Add Verifier
                  </Form.Label>
                </Col>
                <Col className="col-10">
                  <Form.Control
                    type="text"
                    placeholder="   Verifier Address"
                    style={{ borderRadius: "10px", background: "rgba(0,0,0,0.2)", border: "solid 0px", padding: "10px 0px" }}
                    onChange={(event) => {
                      setNewVerifier(event.target.value);
                    }
                    }
                  />
                </Col>
              </Row>
            </Form.Group>

            {loader ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <button
                variant="primary"
                type="submit"
                style={{
                  marginLeft: "42%",
                  marginTop: "3%",
                  marginBottom: "3vh",
                  fontFamily: "Manrope",
                  fontWeight: "700",
                }}
                className={styles.registerBtn}
                disabled={loader}
              >
                Submit
              </button>
            )}
          </Form>
        </div>
        <div
          className="Home_tagLine__jypHz" style={{ marginLeft: "150px" }}
        >
          Verifiers List
        </div>
        {verifiers.length !== 0 ? (
          <div
            className="admin_form_bg text-light"
            style={{
              paddingBottom: "20px",
              paddingTop: "2vh",
              marginTop: "3vh",
            }}
          >
            {verifiers.map((_, idx) => (
              <Card
                className="bg-transparent text-light"
                style={{ fontFamily: "Manrope" }}
                key={idx}
              >
                <Card.Body>
                  <Row>
                    <Col className="col-3" style={{ fontWeight: "600" }}>
                      Verifier {idx + 1}
                    </Col>
                    <Col className="col-6">{_}</Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => {
                          const { accounts, contract } = state;
                          console.log("HEY");
                          contract.methods
                            .removeVerifier(_)
                            .send({ from: accounts[0], gas: 1000000 })
                            .then(() => {
                              let tmp = verifiers;
                              tmp = tmp
                                .slice(0, idx)
                                .concat(tmp.slice(idx + 1, tmp.length));
                              setVerifiers(tmp);
                            });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}
