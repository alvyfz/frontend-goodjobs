/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
} from "react-bootstrap";
import "./Account.css";
import NavBar from "../../components/navbar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import Error500 from "../../components/error/Error500";
import Footer from "../../components/footer/Footer";
import ModalChangeAccount from "../../components/modal/ModalChangeAccount";
import LeftMenu from "../../components/menu/LeftMenu";
import base64 from "base-64";
import ModalChangePassword from "../../components/modal/ModalChangePassword";

const Account = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(
    auth ? base64.decode(auth) : null || jwtDefault,
  );
  const role_id = jwt.Role_ID;
  const [role, setRole] = useState();
  const [user, setUser] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShowAccount, setModalShowAccount] = useState(false);
  const [modalPassowrd, setModalPassowrd] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: `http://13.213.57.122:8080/user/${parseInt(jwt.ID)}`,
    };

    axios
      .request(option)
      .then(function (response) {
        setUser(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    if (role_id === 1) {
      setRole("Super admin");
    } else if (role_id === 2) {
      setRole("Supervisor");
    } else if (role_id === 3) {
      setRole("Consultant");
    } else if (role_id === 4) {
      setRole("User");
    }
  }, []);

  if (isError) {
    <Error500 />;
  }
  if (!role_id) {
    Navigate("/");
  }
  return (
    <>
      <NavBar />
      <Container fluid className="conheader">
        <div className="textheader">
          <h1 style={{ fontWeight: "700" }}>MY ACCOUNT</h1>
          <h3>
            <Link className="spanhome" to="/">
              <span>HOME / </span>
            </Link>{" "}
            <span className="spancon">MY ACCOUNT</span>
          </h3>
        </div>
      </Container>{" "}
      <Container fluid className="complexcon">
        <Row>
          <Col lg={1}></Col>
          <Col lg={10}>
            <Row>
              <Col lg={4}>
                <LeftMenu />
              </Col>
              <Col lg={8}>
                {" "}
                <Container className="con-fitur">
                  <Row className="row-fitur listrowacc">
                    {isLoading ? (
                      <div id="spinner">
                        <Spinner animation="border" />
                      </div>
                    ) : (
                      <>
                        <div className="listdetail">
                          <p>{user?.name}</p>
                          <p>{user?.email}</p>
                          <p>{user?.phone}</p>
                          <p>{role}</p>
                        </div>
                        <Row className="colButtom">
                          <Col lg={6}>
                            {" "}
                            <Button
                              className="buttonacc"
                              variant="outline-dark"
                              onClick={() =>
                                setModalShowAccount(true)
                              }
                            >
                              Edit account
                            </Button>
                            <ModalChangeAccount
                              show={modalShowAccount}
                              onHide={() =>
                                setModalShowAccount(false)
                              }
                              user={user}
                            />
                          </Col>
                          <Col lg={6}>
                            {" "}
                            <Button
                              className="buttonacc"
                              variant="dark"
                              onClick={() => setModalPassowrd(true)}
                            >
                              Change password
                            </Button>
                            <ModalChangePassword
                              show={modalPassowrd}
                              onHide={() => setModalPassowrd(false)}
                              user={user}
                            />
                          </Col>
                        </Row>{" "}
                      </>
                    )}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default Account;
