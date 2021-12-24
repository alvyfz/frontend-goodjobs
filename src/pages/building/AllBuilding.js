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

const AllBuilding = () => {
  const [building, setBuilding] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

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
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCards = building?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
