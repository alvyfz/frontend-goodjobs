import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/NavBar";
import "./AddComplex.css";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

const AddComplex = () => {
  const Navigate = useNavigate();
  const role_id = 2;

  useEffect(() => {
    if (role_id !== 1 && role_id !== 2) {
      Navigate(-1);
    }
  }, []);
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const handleImages = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleSubmit = () => {};

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
              <Form className="formComplex">
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
                          <br />
                          <br />
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
export default AddComplex;
