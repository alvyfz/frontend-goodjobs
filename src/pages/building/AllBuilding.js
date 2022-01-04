import NavBar from "../../components/navbar/NavBar";
import Searching from "../../components/searching/Searching";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AllBuilding.css";
import axios from "axios";
import Error500 from "../../components/error/Error500";
import CardBuilding from "../../components/card/CardBuilding";
import Footer from "../../components/footer/Footer";
import Paginations from "../../components/pagination/Paginations";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";

const AllBuilding = () => {
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const [building, setBuilding] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const [isError, setIsError] = useState(false);
  const [currentPages, setCurrentPages] = useState();

  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: `http://13.213.57.122:8080/buildings`,
    };

    axios
      .request(option)
      .then(function (response) {
        setBuilding(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 390);
  }, [currentPages]);
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
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCards = building?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentPages(pageNumber);
  };
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
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Row>
              {currentCards?.map((v, i) => {
                return (
                  <Col
                    lg={4}
                    md={6}
                    sm={12}
                    key={v.id}
                    className="allbuildingcard"
                  >
                    <CardBuilding
                      role_id={role_id}
                      img={JSON.parse(v.img)[0]}
                      name={v.name}
                      price={v.pricestart}
                      id={v.id}
                      complex={v.complex.name}
                    />{" "}
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col lg={2}> </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={1}>
            <Paginations
              className="paginationStyle"
              totalCards={building?.length}
              cardsPerPage={cardsPerPage}
              paginate={paginate}
              active={currentPage}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default AllBuilding;
