// eslint-disable-next-line
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import NavBar from "../../components/navbar/NavBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../error/NotFound";
import CardComplex from "../../components/card/CardComplex";
import CardBuilding from "../../components/card/CardBuilding";
import { IoIosArrowBack } from "react-icons/io";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import Error500 from "../../components/error/Error500";
import Footer from "../../components/footer/Footer";
import Paginations from "../../components/pagination/Paginations";
const Search = () => {
  const Navigate = useNavigate();
  const { search } = useLocation();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const query = new URLSearchParams(search);
  const value = query.get("key");
  const filter = query.get("filter");
  const [isLoading, setIsLoading] = useState(false);
  const [complex, setComplex] = useState();
  const [building, setBuilding] = useState();
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const [currentPages, setCurrentPages] = useState();

  useEffect(() => {
    window.scrollTo(0, 390);
  }, [currentPages]);
  if (value === null || filter === null) {
    Navigate("/");
  }
  if (filter !== "complex" || filter !== "building") {
    <NotFound />;
  }

  useEffect(() => {
    if (filter === "building") {
      setIsLoading(true);
      var options = {
        method: "GET",
        url: "http://13.213.57.122:8080/buildings",
      };

      axios
        .request(options)
        .then(function (response) {
          setBuilding(response.data.data);
          setIsError(false);
          setIsLoading(false);
        })
        .catch(function (error) {
          setIsError(true);
          setIsLoading(false);
        });
    }
    if (filter === "complex") {
      setIsLoading(true);
      var option = {
        method: "GET",
        url: "http://13.213.57.122:8080/complexes",
      };

      axios
        .request(option)
        .then(function (response) {
          setComplex(response.data.data);
          setIsError(false);

          setIsLoading(false);
        })
        .catch(function (error) {
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [filter]);

  const filteredComplex = complex?.filter((v) => {
    if (v.name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });
  const filteredBuilding = building?.filter((v) => {
    if (v.name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCardsBuilding = filteredBuilding?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const currentCardsComplex = filteredComplex?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentPages(pageNumber);
  };
  if (isError) {
    <Error500 />;
  }
  return (
    <>
      <NavBar />

      <Container fluid className="conheader">
        <div className="textheader">
          <h1 style={{ fontWeight: "700" }}>SEARCH</h1>
        </div>
      </Container>
      <Container fluid className="complexcon">
        <div className="title">
          {" "}
          <Row>
            <Col lg={2}></Col>
            <Col>
              <h3>
                <Link className="spanhome" to="/">
                  <span>SEARCH</span>
                </Link>{" "}
                <Link
                  className="spanhome"
                  to={filter === "building" ? "/buildings" : "/complex"}
                >
                  <span>/ {filter.toUpperCase()} /</span>{" "}
                </Link>
                <span className="spancon"> {value.toUpperCase()}</span>
              </h3>
              <Button variant="\f" className="buttonBack">
                <IoIosArrowBack size={40} onClick={() => Navigate(-1)} />
              </Button>
            </Col>
          </Row>{" "}
        </div>{" "}
        {isLoading ? (
          <div id="spinner">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row className="justify-content-center">
            {filter === "complex" ? (
              <>
                <Col lg={2}></Col>
                {currentCardsComplex?.length === 0 ||
                complex === null ||
                currentCardsComplex === null ? (
                  <>
                    <Container style={{ margin: "100px", textAlign: "center" }}>
                      <h1 style={{ fontSize: "80px", fontWeight: "bold" }}>
                        OPPS
                      </h1>
                      <h2>Complex not found</h2>
                      <h3>
                        {" "}
                        Go back ?{" "}
                        <Button variant="dark" onClick={() => Navigate(-1)}>
                          Back
                        </Button>
                      </h3>
                    </Container>
                  </>
                ) : (
                  <>
                    <Col lg={8}>
                      <Button variant="\f" className="buttonBack">
                        <IoIosArrowBack
                          size={40}
                          onClick={() => Navigate(-1)}
                        />
                      </Button>
                      ;
                      <Row>
                        {currentCardsComplex?.map((v, i) => {
                          return (
                            <Col lg={4} key={v.id}>
                              <Link
                                to={`/complex/detail?key=${v.id}`}
                                className="link"
                              >
                                <CardComplex
                                  img={JSON.parse(v.img)[0]}
                                  name={v.name}
                                  as
                                  width="100%"
                                />
                              </Link>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col lg={2}> </Col>
                  </>
                )}{" "}
              </>
            ) : (
              <>
                {" "}
                <Col lg={2}></Col>
                {currentCardsBuilding?.length === 0 ||
                building === null ||
                currentCardsBuilding === null ? (
                  <>
                    <Container style={{ margin: "100px", textAlign: "center" }}>
                      <h1 style={{ fontSize: "80px", fontWeight: "bold" }}>
                        OPPS
                      </h1>
                      <h2>Building not found</h2>
                      <h3>
                        {" "}
                        Go back ?{" "}
                        <Button variant="dark" onClick={() => Navigate(-1)}>
                          Back
                        </Button>
                      </h3>
                    </Container>
                  </>
                ) : (
                  <>
                    <Col lg={8}>
                      <Row>
                        {currentCardsBuilding?.map((v, i) => {
                          return (
                            <Col
                              lg={4}
                              md={6}
                              sm={12}
                              key={v.Id}
                              className="allbuildingcard"
                            >
                              <CardBuilding
                                role_id={role_id}
                                img={JSON.parse(v.img)[0]}
                                name={v.name}
                                price={v.pricestart}
                                id={v.Id}
                                complex={v.complex.name}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col lg={2}> </Col>
                  </>
                )}{" "}
              </>
            )}
          </Row>
        )}
        <Row className="justify-content-center">
          <Col md={1}>
            <Paginations
              className="paginationStyle"
              totalCards={filteredBuilding?.length || filteredComplex?.length}
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
export default Search;
