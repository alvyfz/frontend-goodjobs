import "./Complex.css";
import Searching from "../../components/searching/Searching";
import CardComplex from "../../components/card/CardComplex";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Error500 from "../../components/error/Error500";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const Complex = () => {
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
          <h3>
            <Link className="spanhome" to="/">
              <span>HOME</span>{" "}
            </Link>
            <span className="spancon"> / COMPLEX</span>
          </h3>
        </div>
        <Row className="justify-content-center">
          <Col lg={2}></Col>
          <Col lg={8}>
            <Row className="justify-content-center">
              {complex?.map((v, i) => {
                return (
                  <Col lg={4} key={v.id}>
                    <Link to={`/complex/detail?id=${v.id}`} className="link">
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
