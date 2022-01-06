/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import NotFound from "../error/NotFound";
import "./Account.css";
import NavBar from "../../components/navbar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";
import { BiSearch } from "react-icons/bi";
const Admin = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const [text, settext] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState();

  const handleLogout = () => {
    destroyCookie(null, "auth");
    Swal.fire({
      icon: "success",
      title: "Logout success!",
      text: "",
      confirmButtonColor: "black",
    });
    Navigate("/");
    window.location.reload();
  };

  if (!role_id) {
    Navigate("/");
  }
  if (!role_id === 1) {
    <NotFound />;
  }
  const handleSearchUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://13.213.57.122:8080/user", {
        email: text.toLowerCase(),
      })
      .then(function (response) {
        setUser(response.data.data);
        setRole(response.data.data.role_id);
        settext("");
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email not found :( !",
        });
      });
  };
  const handleChangeAdmin = (e) => {
    e.preventDefault();
    axios
      .put(`http://13.213.57.122:8080/user/${user.id}`, {
        name: user.name,
        email: user.email.toLowerCase(),
        phone: user.phone,
        roles_id: parseInt(role),
      })
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Good",
          text: "Change role success !",
          confirmButtonColor: "black",
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something wrong!",
        });
      });
  };
  return (
    <>
      <NavBar />

      <Container fluid className="conheader">
        <div className="textheader">
          <h1 style={{ fontWeight: "700" }}>MANAGEMENT ADMIN</h1>
          <h3>
            <Link className="spanhome" to="/">
              <span>HOME / </span>
            </Link>{" "}
            <span className="spancon">MANAGEMENT ADMIN</span>
          </h3>
        </div>
      </Container>
      {isLoading ? (
        <div id="spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {" "}
          <Container fluid className="complexcon">
            <Row>
              <Col lg={2}></Col>
              <Col lg={8}>
                <Row>
                  <Col lg={4}>
                    <Container className="con-fitur">
                      <Row className="row-fitur listrowacc">
                        <p className="nameLeft">{jwt?.Name}</p>
                        <Row className="barLeft" as={Link} to="/chat">
                          <p>Chat</p>
                        </Row>{" "}
                        <Row className="barLeft" as={Link} to="/myaccount">
                          <p>My account</p>
                        </Row>
                        <Row
                          className="barLeftLog"
                          as="button"
                          onClick={handleLogout}
                        >
                          <p>Log out</p>
                        </Row>
                      </Row>
                    </Container>
                  </Col>
                  <Col lg={8}>
                    {" "}
                    <Container className="con-fitur">
                      <Row className="row-fitur listrowacc">
                        <Form onSubmit={handleSearchUser}>
                          <Row>
                            <InputGroup>
                              <Form.Control
                                value={text}
                                type="text"
                                placeholder="Seach user by email"
                                variant="light"
                                onChange={(e) => settext(e.target.value)}
                                required
                                style={{
                                  height: "35px",
                                  marginTop: "5px",
                                }}
                              />
                              <Button
                                variant="dark"
                                type="submit"
                                style={{
                                  height: "35px",
                                  marginTop: "5px",
                                  fontSize: "15px",
                                }}
                              >
                                <BiSearch size={20} />
                              </Button>{" "}
                            </InputGroup>
                          </Row>{" "}
                        </Form>

                        {user ? (
                          <>
                            {isLoading ? (
                              <div id="spinner">
                                <Spinner animation="border" />
                              </div>
                            ) : (
                              <>
                                {" "}
                                <div className="userListAdmin listdetail">
                                  <p>{user?.name}</p>
                                  <p>{user?.email}</p>
                                  <p>{user?.phone}</p>

                                  <Form.Select
                                    id="nationality"
                                    name="Filter"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                  >
                                    {" "}
                                    <option value={1}>Super admin</option>
                                    <option selected value={2}>
                                      Supervisor
                                    </option>
                                    <option selected value={3}>
                                      Consultant
                                    </option>
                                    <option selected value={4}>
                                      User
                                    </option>
                                  </Form.Select>
                                  <Row>
                                    <Col lg={10}></Col>
                                    <Col lg={2}>
                                      <Button
                                        onClick={handleChangeAdmin}
                                        variant="dark"
                                        className="buttonAdmin"
                                      >
                                        Save
                                      </Button>
                                    </Col>
                                  </Row>
                                </div>
                              </>
                            )}
                          </>
                        ) : null}
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};
export default Admin;
