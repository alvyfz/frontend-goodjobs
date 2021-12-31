import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/NavBar";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Spinner,
} from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
// import { FiEdit } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import NotFound from "../error/NotFound";
import axios from "axios";
import { storage } from "../../apps/firebase";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Error500 from "../../components/error/Error500";

const EditBuilding = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idBuilding = parseInt(query.get("key"));
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
  const [errName, setErrName] = useState("");
  const [validate, setValidate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const nameRegex = /^[a-zA-Z\s]{2,15}$/;
  const maxNumber = 4;
  const [idComplex, setIdComplex] = useState();

  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: `http://13.213.57.122:8080/building/${idBuilding}`,
    };

    axios
      .request(option)
      .then(function (response) {
        var d = response.data.data;
        setImages(JSON.parse(d.img));
        setWeekday(JSON.parse(d.officehours).weekday);
        setAddress(d.address);
        setDescription(d.description);
        setFloor(d.floor);
        setLatitude(d.latitude);
        setLongitude(d.longitude);
        setName(d.name);
        setPrice(d.pricestart);
        setSaturday(JSON.parse(d.officehours).saturday);
        setSunday(JSON.parse(d.officehours).sunday);
        setToilet(d.toilet);
        setSize(d.size);
        setIdComplex(d.complex_id);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, [idBuilding]);
  if (role_id !== 1 && role_id !== 2) {
    return <NotFound />;
  }
  if (!idBuilding) {
    return <NotFound />;
  }
  if (isLoading) {
    return (
      <div id="spinner">
        <Spinner animation="border" />
      </div>
    );
  }
  if (isError) {
    return <Error500 />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    var officeHours = {
      weekday: [],
      saturday: [],
      sunday: [],
    };
    officeHours.weekday.push(weekday);
    officeHours.saturday.push(saturday);
    officeHours.weekday.push(sunday);
    if (validate) {
      Swal.fire({
        title: `Are you sure to edit building ${name} ?`,
        showCancelButton: true,
        cancelButtonColor: "#DDDDDD",
        confirmButtonColor: "black",
        confirmButtonText: "Sure",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .put(`http://13.213.57.122:8080/building/${idBuilding}`, {
              name: name,
              address: address,
              img: JSON.stringify(images),
              description: description,
              size: parseFloat(size),
              floor: parseInt(floor),
              toilet: parseInt(toilet),
              officehours: JSON.stringify(officeHours),
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              pricestart: parseInt(price),
              complex_id: parseInt(idComplex),
            })
            .then(function (response) {
              Swal.fire(`edit building ${name} success !`, "", "success");
              setImages([]);
              setWeekday("");
              setAddress("");
              setDescription("");
              setFloor("");
              setLatitude("");
              setLongitude("");
              setName("");
              setPrice("");
              setSaturday("");
              setSunday("");
              setToilet("");
              setSize("");
              Navigate(-1);
            })
            .catch(function (error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something Wrong :( !",
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Format Wrong :( !",
      });
    }
  };
  const handleChangeName = (e) => {
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
      const uploadTask = storage.ref(`building/${image.name}`).put(image);
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
            .ref("building")
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
                      onChange={handleChangeName}
                    />
                    <Form.Text className="formText formErr">
                      {errName}
                    </Form.Text>
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
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Image
                  </Form.Label>
                  <Col sm="10">
                    {" "}
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
                    <p className="ketImg">
                      *The first image will be the main image(Max 4 picture)
                    </p>
                    <Row>
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
export default EditBuilding;
