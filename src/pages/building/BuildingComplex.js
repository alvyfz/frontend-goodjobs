/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../../components/navbar/NavBar";
import Searching from "../../components/searching/Searching";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./BuildingComplex.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Error500 from "../../components/error/Error500";
import { useLocation } from "react-router-dom";
import CardBuilding from "../../components/card/CardBuilding";
import Paginations from "../../components/pagination/Paginations";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import Footer from "../../components/footer/Footer";

const BuildingComplex = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [building, setBuilding] = useState();
  const idComplex = parseInt(query.get("key"));
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);

  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: `http://13.213.57.122:8080/building/complex/${idComplex}`,
    };

    axios
      .request(option)
      .then(function (response) {
        setBuilding(response.data.data);
        console.log(building);

        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 390);
  }, [currentPage]);

  if (isError) {
    return <Error500 />;
  }

  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCards = building?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(currentCards);
  return (
    <>
      <NavBar complex={true} />
      <Searching />{" "}
      {isLoading ? (
        <div id="spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Container fluid className="complexcon">
            <div className="title">
              <Row>
                <Col lg={2}></Col>
                <Col lg={3}>
                  <h3>
                    <Link className="spanhome" to="/">
                      <span>HOME</span>{" "}
                    </Link>
                    <Link className="spanhome" to="/complex">
                      <span>/ COMPLEX / </span>
                    </Link>
                    <span className="spancon">
                      {building?.[0].complex.name.toUpperCase()}
                    </span>
                  </h3>
                </Col>
                {role_id === 1 || role_id === 2 ? (
                  <>
                    <Col lg={2}>
                      <Button
                        variant="dark"
                        size="sm"
                        as={Link}
                        to={`/building/add?key=${idComplex}`} //key id complex
                      >
                        {" "}
                        <MdOutlineAddCircleOutline size={28} /> Add Building
                      </Button>
                    </Col>
                  </>
                ) : null}
              </Row>
            </div>
            {building?.length === 0 || building === null ? (
              <>
                <Container style={{ margin: "100px", textAlign: "center" }}>
                  <h1 style={{ fontSize: "80px", fontWeight: "bold" }}>OPPS</h1>
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
                {" "}
                <Row className="justify-content-center">
                  <Col lg={2}></Col>
                  <Col lg={8}>
                    <Row className="justify-content-center">
                      {currentCards?.map((v, i) => {
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
                              rating={90}
                              id={v.Id}
                              complex={v.complex.name}
                            />
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
              </>
            )}
          </Container>
        </>
      )}
      <Footer />
    </>
  );
};
export default BuildingComplex;
