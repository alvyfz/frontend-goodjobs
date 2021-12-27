import "./Complex.css";
import Searching from "../../components/searching/Searching";
import CardComplex from "../../components/card/CardComplex";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Error500 from "../../components/error/Error500";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";

const Complex = () => {
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.role_id;
  const [complex, setComplex] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    var options = {
      method: "GET",
      url: "http://localhost:8000/complex",
    };

    axios
      .request(options)
      .then(function (response) {
        setComplex(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, []);

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

  return (
    <>
      <NavBar complex={true} />
      <Searching />
      <Container fluid className="complexcon">
        <div className="title">
          <Row>
            <Col lg={2}></Col>
            <Col lg={3}>
              <h3>
                <Link className="spanhome" to="/">
                  <span>HOME</span>{" "}
                </Link>
                <span className="spancon"> / COMPLEX</span>
              </h3>
            </Col>
            {role_id === 2 || role_id === 1 ? (
              <Col>
                <span>
                  <Button
                    variant="dark"
                    className="bcc"
                    size="sm"
                    as={Link}
                    to="/complex/add"
                  >
                    {" "}
                    <MdOutlineAddCircleOutline size={28} /> Add Complex
                  </Button>
                </span>
              </Col>
            ) : null}{" "}
          </Row>
        </div>
        <Row className="justify-content-center">
          <Col lg={2}></Col>
          <Col lg={8}>
            <Row className="justify-content-center">
              {complex?.map((v, i) => {
                return (
                  <Col lg={4} key={v.id}>
                    <Link to={`/complex/detail?key=${v.id}`} className="link">
                      <CardComplex img={v.img} name={v.name} as width="100%" />{" "}
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col lg={2}> </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Complex;
