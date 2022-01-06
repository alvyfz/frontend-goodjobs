import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ModalChangeAccount(props) {
  const Navigate = useNavigate();
  const [user] = useState(props.user);
  const [nameUp, setNameUp] = useState(user?.name);
  const [emailUp, setEmailUp] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [errorPhone, setErrorPhone] = useState();
  const [errorName, setErrorName] = useState("");
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const nameRegex = /^[a-zA-Z\s]{2,40}$/;
  const phoneRegex = /^[0-9]{9,12}$/;
  console.log(user);
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
        .put(`http://13.213.57.122:8080/user/${user.id}`, {
          name: nameUp,
          email: emailUp.toLowerCase(),
          phone: phone,
          roles_id: user.roles_id,
        })
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Good",
            text: "Change account success !",
            confirmButtonColor: "black",
          });
          setEmailUp("");
          setNameUp("");
          setPhone("");
          Navigate("/myaccount");
          window.location.reload();
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
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <form onSubmit={handleChangeAccount}>
          <div className="mb-3">
            <Form.Control
              disabled
              size="lg"
              type="email"
              placeholder="Email"
              value={emailUp}
              onChange={handleChangeEmailUp}
              disable
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
            <Form.Text className="formText" style={{ color: "red" }}>
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
            <Form.Text className="formText" style={{ color: "red" }}>
              {errorPhone}
            </Form.Text>
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
                onSubmit={handleChangeAccount}
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
export default ModalChangeAccount;
