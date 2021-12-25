import NavBar from "../../components/navbar/NavBar";
import Searching from "../../components/searching/Searching";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BuildingComplex.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Error500 from "../../components/error/Error500";
import { useLocation } from "react-router-dom";
import CardBuilding from "../../components/card/CardBuilding";
import Paginations from "../../components/pagination/Paginations";
const BuildingComplex = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [complex, setComplex] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [building, setBuilding] = useState();
  const idComplex = parseInt(query.get("id"));
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  useEffect(() => {
    setIsLoading(true);
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
    var option = {
      method: "GET",
      url: "http://localhost:8000/building",
    };

    axios
      .request(option)
      .then(function (response) {
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
  const complexById = complex?.find((v) => v.id === idComplex);
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const filteredBuilding = building?.filter((v) => v.complex_id === idComplex);
  const currentCards = filteredBuilding?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavBar complex={true} />
      <Searching />
      <Container fluid className="complexcon">
        {" "}
        <div className="title">
          <Row>
            <Col lg={2}></Col>
            <Col lg={6}>
              <h3>
                <Link className="spanhome" to="/">
                  <span>HOME</span>{" "}
                </Link>
                <Link className="spanhome" to="/complex">
                  <span>/ COMPLEX / </span>
                </Link>
                <span className="spancon">
                  {complexById?.name.toUpperCase()}
                </span>
              </h3>
            </Col>
          </Row>
        </div>
        <Row className="justify-content-center">
          <Col lg={2}></Col>
          <Col lg={8}>
            <Row className="justify-content-center">
              {currentCards?.map((v, i) => {
                return (
                  <Col lg={4} key={v.id} className="allbuildingcard">
                    <CardBuilding
                      img={v.img[0]}
                      name={v.name}
                      price={450000}
                      rating={90}
                      id={v.id}
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
              totalCards={filteredBuilding?.length}
              cardsPerPage={cardsPerPage}
              paginate={paginate}
              active={currentPage}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default BuildingComplex;
