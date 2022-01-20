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
import { AiOutlineDelete } from "react-icons/ai";
import NotFound from "../error/NotFound";
import NavBar from "../../components/navbar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";
import { BiSearch } from "react-icons/bi";
import LeftMenu from "../../components/menu/LeftMenu";
import base64 from "base-64";

const AdminEdit = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(
    auth ? base64.decode(auth) : null || jwtDefault,
  );
  const role_id = jwt.Role_ID;
  const [text, settext] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(0);
  const [nameUp, setNameUp] = useState();
  const [emailUp, setEmailUp] = useState();
  const [phone, setPhone] = useState();
  const [errorPhone, setErrorPhone] = useState();
  const [errorName, setErrorName] = useState("");
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const nameRegex = /^[a-zA-Z\s]{2,40}$/;
  const phoneRegex = /^[0-9]{9,12}$/;

  useEffect(()=>{
    if (!role_id) {
      Navigate("/");
    }
    if (!role_id === 1) {
      <NotFound />;
    }
  },[])
  const handleSearchUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://13.213.57.122:8080/user", {
        email: text.toLowerCase(),
      })
      .then(function (response) {
        if (response.data.data.email === "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email not found :( !",
          });
          setRole(0);
          setUser([]);
          setIsLoading(false);
        } else {
          setUser(response.data.data);
          setRole(response.data.data.role_id);
          setNameUp(response.data.data.name);
          setPhone(response.data.data.phone);
          setEmailUp(response.data.data.email);
          settext("");
          setIsLoading(false);
        }
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
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
    if (!phoneRegex.test(e.target.value)) {
      setErrorPhone("Phone number must be number and length 12.");
      setValidPhone(false);
    } else {
      setErrorPhone("");
      setValidPhone(true);
    }
  };
  const handleChangeNameUp = (e) => {
    setNameUp(e.target.value);
    if (!nameRegex.test(e.target.value)) {
      setErrorName("Name must be a letter 2-40.");
      setValidName(false);
    } else {
      setErrorName("");
      setValidName(true);
    }
  };
  const handleChangeEmailUp = (e) => {
    setEmailUp(e.target.value);
  };

  const handleChangeAccount = (e) => {
    e.preventDefault();
    if (validName && validPhone) {
      axios
        .put(
          `http://13.213.57.122:8080/user/${user.id}`,
          {
            name: nameUp,
            email: emailUp.toLowerCase(),
            phone: phone,
            roles_id: parseInt(role),
          },
          {
            headers: {
              Authorization: `Bearer ${base64.decode(auth)}`,
            },
          },
        )
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Good",
            text: "Change account success !",
            confirmButtonColor: "black",
          });

          // Navigate("/myaccount");
          // window.location.reload();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something wrong!",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Form format is wrong!",
      });
    }
  };
  const handleDelete = () => {
    Swal.fire({
      title: `Do you want to delete building ${user.email} ?`,
      showCancelButton: true,
      cancelButtonColor: "#DDDDDD",
      confirmButtonColor: "#A9333A",
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var options = {
          method: "DELETE",
          url: `http://13.213.57.122:8080/user/${user.id}`,
          headers: {
            Authorization: `Bearer ${base64.decode(auth)}`,
          },
        };
        axios
          .request(options)
          .then(function (response) {
            Swal.fire(
              `Delete building ${user.email} success!`,
              "",
              "success",
            );
            window.location.reload();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <NavBar />

      <Container fluid className="conheader">
        <div className="textheader">
          <h1 style={{ fontWeight: "700" }}>CHANGE USER</h1>
          <h3>
            <Link className="spanhome" to="/">
              <span>HOME / </span>
            </Link>{" "}
            <span className="spancon">CHANGE USER</span>
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
                        <Form onSubmit={handleSearchUser}>
                          <Row>
                            <InputGroup>
                              <Form.Control
                                value={text}
                                type="email"
                                placeholder="Seach user by email"
                                variant="light"
                                onChange={(e) =>
                                  settext(e.target.value)
                                }
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

                        {role !== 0 ? (
                          <>
                            {isLoading ? (
                              <div id="spinner">
                                <Spinner animation="border" />
                              </div>
                            ) : (
                              <>
                                {" "}
                                <div className="userListAdmin listdetail">
                                  <Form>
                                    <div className="mb-3">
                                      <Form.Control
                                        size="lg"
                                        type="email"
                                        placeholder="Email"
                                        value={emailUp}
                                        onChange={handleChangeEmailUp}
                                        required
                                        disabled
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Name"
                                        value={nameUp}
                                        onChange={handleChangeNameUp}
                                      />
                                      <Form.Text
                                        className="formText"
                                        style={{ color: "red" }}
                                      >
                                        {errorName}
                                      </Form.Text>{" "}
                                    </div>

                                    <div className="mb-3">
                                      <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={handleChangePhone}
                                      />
                                      <Form.Text
                                        className="formText"
                                        style={{ color: "red" }}
                                      >
                                        {errorPhone}
                                      </Form.Text>
                                    </div>

                                    <Form.Select
                                      id="nationality"
                                      name="Filter"
                                      value={role}
                                      onChange={(e) =>
                                        setRole(e.target.value)
                                      }
                                    >
                                      {" "}
                                      <option value={1}>
                                        Super admin
                                      </option>
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
                                  </Form>
                                  <Row className="d-flex justify-content-end">
                                    <Col lg={8}></Col>
                                    <Col lg={4}>
                                      <Button
                                        variant="danger"
                                        className="buttonAdmin"
                                        onClick={handleDelete}
                                      >
                                        <AiOutlineDelete size={20} />
                                      </Button>
                                      <Button
                                        onClick={handleChangeAccount}
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
              <Col lg={1}></Col>
            </Row>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};
export default AdminEdit;
