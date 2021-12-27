import "./AddBuilding.css";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/NavBar";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import NotFound from "../error/NotFound";
const AddBuilding = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.role_id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [floor, setFloor] = useState("");
  const [weekday, setWeekday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [toilet, setToilet] = useState("");
  const [images, setImages] = useState([]);
  const maxNumber = 4;
  const handleImages = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  if (role_id !== 1 && role_id !== 2) {
    return <NotFound />;
  }
  const handleSubmit = () => {
    var officeHours = {
      weekday: [],
      saturday: [],
      sunday: [],
    };
    officeHours.weekday.push(weekday);
    officeHours.saturday.push(saturday);
    officeHours.weekday.push(sunday);
    console.log(officeHours);
  };
  handleSubmit();
  return (
    <>
      {" "}
      <NavBar building={true} />
      <Container fluid className="conheader addBuilding">
        <div className="textheader">
          <h1 style={{ fontWeight: "700" }}>ADD NEW BUILDING</h1>
        </div>
      </Container>
      <Container fluid className="containermain">
        <Row className="justify-content-center">
          <Col lg={7}>
            <Button variant="\f" className="buttonBack">
              <IoIosArrowBack size={40} onClick={() => Navigate(-1)} />
            </Button>
            <Container fluid className="conformcomplex">
              <Form className="fromAddBuilding">
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
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Form.Group>{" "}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Price Start <span className="spansqm">(sqm/month) </span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Col>
                </Form.Group>{" "}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Building Size <span className="spansqm">(m²) </span>
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="number"
                      required
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </Col>{" "}
                  <Form.Label column sm="2">
                    Toilet
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="number"
                      required
                      value={toilet}
                      onChange={(e) => setToilet(e.target.value)}
                    />
                  </Col>
                </Form.Group>{" "}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Floor Count
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="number"
                      required
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                    />
                  </Col>{" "}
                </Form.Group>{" "}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Office Hours
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      className="mb-3"
                      type="text"
                      required
                      placeholder="Week Days"
                      value={weekday}
                      onChange={(e) => setWeekday(e.target.value)}
                    />{" "}
                    <Form.Control
                      className="mb-3"
                      type="text"
                      required
                      placeholder="Saturday"
                      value={saturday}
                      onChange={(e) => setSaturday(e.target.value)}
                    />{" "}
                    <Form.Control
                      type="text"
                      required
                      placeholder="Sunday"
                      value={sunday}
                      onChange={(e) => setSunday(e.target.value)}
                    />
                  </Col>
                </Form.Group>{" "}
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
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Latitude
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="number"
                      required
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </Col>{" "}
                  <Form.Label column sm="2">
                    Longitude
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="number"
                      required
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </Col>
                </Form.Group>{" "}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Image
                  </Form.Label>
                  <Col sm="10">
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={handleImages}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <Button
                            variant="outline-dark"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            Upload
                          </Button>
                          &nbsp;
                          <Button onClick={onImageRemoveAll} variant="dark">
                            Remove all
                          </Button>
                          <p className="ketImg">
                            *The first image will be the main image
                          </p>
                          <Row>
                            {imageList.map((image, index) => (
                              <Col lg={4}>
                                <div key={index} className="image-item">
                                  <Card width="50px">
                                    <Card.Img
                                      src={image.data_url}
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
                                        onClick={() => onImageRemove(index)}
                                      >
                                        <GrClose color="white" />
                                      </Button>{" "}
                                      <br />
                                      <Button
                                        style={{
                                          backgroundColor:
                                            "rgba(255, 255, 255, 0.15)",
                                        }}
                                        className="buttomimgform"
                                        variant=""
                                        onClick={() => onImageUpdate(index)}
                                      >
                                        <FiEdit
                                          style={{
                                            color: "black",
                                          }}
                                        />
                                      </Button>
                                    </Card.ImgOverlay>
                                  </Card>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                    </ImageUploading>
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
                      onSubmit={handleSubmit}
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
export default AddBuilding;
