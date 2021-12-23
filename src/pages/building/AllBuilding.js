import NavBar from "../../components/navbar/NavBar";
import Searching from "../../components/searching/Searching";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AllBuilding.css";
import axios from "axios";
import Error500 from "../../components/error/Error500";
import CardBuilding from "../../components/card/CardBuilding";

const AllBuilding = () => {
  const [building, setBuilding] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    var options = {
      method: "GET",
      url: "http://localhost:8000/building",
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setBuilding(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
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
      <NavBar building={true} />
      <Searching />
      <Container fluid className="complexcon">
        {" "}
        <div className="title">
          <Row>
            <Col lg={2}></Col>
            <Col lg={3}>
              <h3>
                <Link className="spanhome" to="/">
                  <span>HOME</span>{" "}
                </Link>
                <span className="spancon"> / ALL BUILDING</span>
              </h3>
            </Col>
          </Row>
        </div>
        <Row className="justify-content-center">
          <Col lg={2}></Col>
          <Col lg={8}>
            <Row className="justify-content-center">
              {building?.slice(0, 6).map((v, i) => {
                return (
                  <Col lg={4} key={v.id}>
                    <Link to={`/building/detail?id=${v.id}`} className="link">
                      <CardBuilding img={v.img} name={v.name} price={450000} />{" "}
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col lg={2}> </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllBuilding;
