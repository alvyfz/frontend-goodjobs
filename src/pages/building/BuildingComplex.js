import NavBar from "../../components/navbar/NavBar";
import Searching from "../../components/searching/Searching";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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

const BuildingComplex = () => {
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [complex, setComplex] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [building, setBuilding] = useState();
  const idComplex = parseInt(query.get("key"));
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);

  useEffect(() => {
    setIsLoading(true);
    var options = {
      method: "GET",
      url: `http://13.213.57.122:8080/complex/${idComplex}`,
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
      url: "http://13.213.57.122:8080/buildings",
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
  }, [currentPage]);
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
  const filteredBuilding = building?.filter((v) => v.complex_id === idComplex);
  const currentCards = filteredBuilding?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(filteredBuilding);
  return (
    <>
      <NavBar complex={true} />
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
                <Link className="spanhome" to="/complex">
                  <span>/ COMPLEX / </span>
                </Link>
                <span className="spancon">
                  {complex?.data.name.toUpperCase()}
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
        <Row className="justify-content-center">
          <Col lg={2}></Col>
          <Col lg={8}>
            <Row className="justify-content-center">
              {currentCards?.map((v, i) => {
                return (
                  <Col lg={4} key={v.id} className="allbuildingcard">
                    <CardBuilding
                      role_id={role_id}
                      img={JSON.parse(v.img)[0].data_url}
                      name={v.name}
                      price={v.pricestart}
                      rating={90}
                      id={v.id}
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
