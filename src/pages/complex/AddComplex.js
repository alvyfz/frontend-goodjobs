/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/NavBar";
import "./AddComplex.css";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { FiEdit } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import NotFound from "../error/NotFound";
import axios from "axios";
import Swal from "sweetalert2";
import { storage } from "../../apps/firebase";
const AddComplex = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;

  if (role_id !== 1 && role_id !== 2) {
    <NotFound />;
  }

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  // const [image, setImage] = useState([]);
  const [address, setAddres] = useState("");
  const [errName, setErrName] = useState("");
  const [validate, setValidate] = useState(false);
  const nameRegex = /^[a-zA-Z\s]{2,15}$/;
  const maxNumber = 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      axios
        .post("http://13.213.57.122:8080/complex", {
          name: name,
          address: address,
          img: JSON.stringify(images),
        })
        .then(function (response) {
          Swal.fire("Add new complex success!", "", "success");
          setName("");
          setImages([]);
          setAddres("");
          Navigate(-1);
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something Wrong :( !",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something Wrong :( !",
      });
    }
  };
  const handleChangeNameUp = (e) => {
    setName(e.target.value);
    if (!nameRegex.test(e.target.value)) {
      setValidate(false);
      setErrName("Name length maximum 15 character");
    } else {
      setErrName("");
      setValidate(true);
    }
  };
  const handleChangeUploadImage = (e) => {
    const image = e.target.files[0];

    if (image) {
      const uploadTask = storage.ref(`complex/${image.name}`).put(image);
      uploadTask.on(
        "state_change",
        (snapshot) => {},
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something Wrong :( !",
          });
        },
        () => {
          storage
            .ref("complex")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setImages((currentImage) => [...currentImage, url]);
            });
        }
      );
    }
  };
  // console.log(images);
  // const handleChangeUpdateImage = (img) => (e) => {
  //   const imageUpdate = e.target.files[0];
  //   if (imageUpdate) {
  //     const uploadTask = storage
  //       .ref(`complex/${imageUpdate.name}`)
  //       .put(imageUpdate);
  //     uploadTask.on(
  //       "state_change",
  //       (snapshot) => {},
  //       (error) => {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Something Wrong :( !",
  //         });
  //       },
  //       () => {
  //         storage
  //           .ref("complex")
  //           .child(imageUpdate.name)
  //           .getDownloadURL()
  //           .then((url) => {
  //             images.map((v, i) => {
  //               if (v === img) {
  //                 let newArr = [...images];
  //                 newArr[i] = url;
  //                 setImages(newArr);
  //               }
  //             });
  //           });
  //       }
  //     );
  //   }
  // };
  const handleRemove = (image) => {
    var newArray = images.filter((item) => item !== image);
    setImages(newArray);
  };
  return (
    <>
      {" "}
      <NavBar complex={true} />
      <Container fluid className="conheader">
        <div className="textheader">
          <h1 style={{ fontWeight: "700" }}>ADD NEW COMPLEX</h1>
        </div>
      </Container>
      <Container fluid className="containermain">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Button variant="\f" className="buttonBack">
              <IoIosArrowBack size={40} onClick={() => Navigate(-1)} />
            </Button>
            <Container fluid className="conformcomplex">
              <Form className="formComplex" onSubmit={handleSubmit}>
                {" "}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      required
                      value={name}
                      onChange={handleChangeNameUp}
                    />
                    <Form.Text className="formText formErr">
                      {errName}
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Address
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      required
                      value={address}
                      onChange={(e) => setAddres(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Image
                  </Form.Label>
                  <Col sm="10">
                    <input
                      type="file"
                      id="filee"
                      className="filee"
                      accept="image/*"
                      onChange={handleChangeUploadImage}
                    />
                    <Button
                      variant="outline-dark"
                      disabled={images.length === maxNumber ? true : false}
                    >
                      <label for="filee" className="fileee">
                        Upload
                      </label>
                    </Button>{" "}
                    &nbsp;
                    <Button onClick={() => setImages([])} variant="dark">
                      Remove all
                    </Button>
                    <Row style={{ marginTop: "15px" }}>
                      {images.map((image, index) => (
                        <Col lg={4}>
                          <div key={index} className="image-item">
                            <Card width="50px">
                              <Card.Img
                                src={image}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "120px",
                                  objectFit: "cover",
                                }}
                              />
                              <Card.ImgOverlay
                                className="image-item__btn-wrapper"
                                style={{
                                  textAlign: "right",
                                  padding: "0",
                                }}
                              >
                                <Button
                                  style={{
                                    backgroundColor:
                                      "rgba(255, 255, 255, 0.15)",
                                  }}
                                  className="buttomimgform"
                                  variant=""
                                  onClick={() => handleRemove(image)}
                                  // onClick={() => onImageRemove(index)}
                                >
                                  <GrClose color="white" />
                                </Button>{" "}
                                {/* <br />
                                <input
                                  type="file"
                                  id="fileeee"
                                  className="fileeee"
                                  accept="image/*"
                                  onChange={handleChangeUpdateImage(image)}
                                />
                                <Button
                                  style={{
                                    backgroundColor:
                                      "rgba(255, 255, 255, 0.15)",
                                  }}
                                  className="buttomimgform"
                                >
                                  {" "}
                                  <label for="fileeee" className="fileeeee">
                                    <FiEdit
                                      style={{
                                        color: "black",
                                      }}
                                    />
                                  </label>
                                </Button> */}
                              </Card.ImgOverlay>
                            </Card>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Form.Group>
                <Row>
                  <Col lg={8}></Col>
                  <Col lg={2}>
                    <Button
                      variant=""
                      style={{ width: "100%" }}
                      onClick={() => Navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col lg={2}>
                    <Button
                      variant="dark"
                      style={{ width: "100%" }}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default AddComplex;
