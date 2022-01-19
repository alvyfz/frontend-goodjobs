import axios from "axios";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  InputGroup,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { BiShow, BiHide } from "react-icons/bi";
import { parseCookies } from "nookies";
import base64 from "base-64";

function ModalChangePassword(props) {
  const auth = parseCookies("auth").auth;
  const [user] = useState(props.user);
  const [password1Up, setPassword1Up] = useState("");
  const [password2Up, setPassword2Up] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassIn, setShowPassIn] = useState(false);
  const [showPassUp1, setShowPassUp1] = useState(false);
  const [showPassUp2, setShowPassUp2] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [validPassword1, setValidPassword1] = useState(false);
  const [validPassword2, setValidPassword2] = useState(false);
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const handleChangePassword1Up = (e) => {
    setPassword1Up(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setErrorPassword(
        "Password format must contain uppercase letters, lowercase letters, and numbers.",
      );
      setValidPassword1(false);
    } else {
      setValidPassword1(true);
      setErrorPassword("");
    }
  };
  const handleChangePassword2Up = (e) => {
    setPassword2Up(e.target.value);
    if (e.target.value !== password1Up) {
      setErrorPassword2("Passwords are not the same.");
      setValidPassword2(false);
    } else {
      setValidPassword2(true);
      setErrorPassword2("");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (validPassword2 && validPassword1) {
      axios
        .post("http://13.213.57.122:8080/user/checking", {
          email: user.email.toLowerCase(),
          password: oldPassword,
        })
        .then(function () {
          axios
            .put(
              `http://13.213.57.122:8080/user/password/${user.id}`,
              {
                password: password2Up,
              },
              {
                headers: {
                  Authorization: `Bearer ${base64.decode(auth)}`,
                },
              },
            )
            .then(function () {
              Swal.fire({
                icon: "success",
                title: "Good",
                text: "Change password success !",
                confirmButtonColor: "black",
              });
              setPassword1Up("");
              setPassword2Up("");
              setOldPassword("");
            })
            .catch(function () {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something wrong!",
              });
              setPassword1Up("");
              setPassword2Up("");
              setOldPassword("");
            });
        })
        .catch(function () {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Old password is wrong!",
          });
          setPassword1Up("");
          setPassword2Up("");
          setOldPassword("");
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Form format is wrong!",
      });
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <InputGroup>
              <Form.Control
                size="lg"
                type={showPassIn ? "text" : "password"}
                placeholder="Old password"
                value={oldPassword}
                className="borderRightNone"
                onChange={(e) => setOldPassword(e.target.value)}
              />{" "}
              <button
                className="btnn"
                onClick={() => setShowPassIn(!showPassIn)}
                type="button"
              >
                {showPassIn ? (
                  <BiShow size={25} />
                ) : (
                  <BiHide size={25} />
                )}
              </button>{" "}
            </InputGroup>{" "}
          </div>
          <div className="mb-3">
            <InputGroup>
              <Form.Control
                size="lg"
                type={showPassUp1 ? "text" : "password"}
                placeholder="New password"
                value={password1Up}
                className="borderRightNone"
                onChange={handleChangePassword1Up}
              />{" "}
              <button
                className="btnn"
                onClick={() => setShowPassUp1(!showPassUp1)}
                type="button"
              >
                {showPassUp1 ? (
                  <BiShow size={25} />
                ) : (
                  <BiHide size={25} />
                )}
              </button>{" "}
            </InputGroup>{" "}
            <Form.Text className="formText" style={{ color: "red" }}>
              {errorPassword}
            </Form.Text>{" "}
          </div>

          <div className="mb-3">
            <InputGroup>
              <Form.Control
                size="lg"
                type={showPassUp2 ? "text" : "password"}
                placeholder="Retry new password"
                value={password2Up}
                className="borderRightNone"
                onChange={handleChangePassword2Up}
              />{" "}
              <button
                className="btnn"
                onClick={() => setShowPassUp2(!showPassUp2)}
                type="button"
              >
                {showPassUp2 ? (
                  <BiShow size={25} />
                ) : (
                  <BiHide size={25} />
                )}
              </button>{" "}
            </InputGroup>{" "}
            <Form.Text className="formText" style={{ color: "red" }}>
              {errorPassword2}
            </Form.Text>{" "}
          </div>

          <Row

          // style={{ margin: "20px 10px 20px 10px" }}
          >
            <Col lg={8}></Col>
            <Col lg={4} style={{ padding: "0" }}>
              <Button
                style={{
                  margin: "5px",
                }}
                variant="sdad"
                onClick={props.onHide}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="dark"
                onSubmit={handleChangePassword}
              >
                <div>Save</div>
              </Button>
            </Col>
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default ModalChangePassword;
