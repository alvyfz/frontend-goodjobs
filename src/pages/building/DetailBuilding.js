import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import { Container, Spinner, Row, Col, Image } from "react-bootstrap";
import Error500 from "../../components/error/Error500";
import "./DetailBuilding.css";

const DetailBuilding = () => {
  //   const auth = parseCookies("auth").auth;
  //   const jwtDefault =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  //   const jwt = jwt_decode(auth || jwtDefault);
  //   const role_id = jwt.Role_ID;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idBuilding = parseInt(query.get("key"));
  const [isLoading, setIsLoading] = useState(false);
  const [building, setBuilding] = useState();
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: `http://13.213.57.122:8080/building/${idBuilding}`,
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
  if (isError) {
    <Error500 />;
  }

  return (
    <>
      <NavBar building={true} />{" "}
      {isLoading ? (
        <div id="spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Container fluid className="conheader">
            <div className="textheader">
              <h1 style={{ fontWeight: "700" }}>
                {building?.name.toUpperCase()}
              </h1>
              <h3>
                <Link className="spanhome" to="/">
                  <span>HOME</span>
                </Link>{" "}
                <Link className="spanhome" to="/buildings">
                  <span>/ BUILDING /</span>{" "}
                </Link>
                <span className="spancon"> {building?.name.toUpperCase()}</span>
              </h3>
            </div>
          </Container>
          <Container fluid className="complexcon">
            <Row>
              <Col lg={2}></Col>
              <Col lg={8}>
                <Container className="con-fitur">
                  <Row className="row-fitur">
                    <Col lg={5}>
                      <Image
                        src={JSON.parse(building?.img)[0]}
                        alt="main"
                        className="main-img"
                      />
                      {/* <Row>
                        {images?.map((v, i) => {
                          return <Image src={v} alt={i} className="imgs" />;
                        })}
                      </Row> */}
                    </Col>
                  </Row>{" "}
                </Container>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </Container>{" "}
        </>
      )}
    </>
  );
};

export default DetailBuilding;
