import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import { Container, Spinner, Row, Col, Image, Button } from "react-bootstrap";
import Error500 from "../../components/error/Error500";
import "./DetailBuilding.css";
import CardUnit from "../../components/card/CardUnit";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from "../error/NotFound";
import Slider from "react-slick";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import GMaps from "../../components/gmaps/GMaps";
const DetailBuilding = () => {
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idBuilding = parseInt(query.get("key"));
  const [isLoading, setIsLoading] = useState(false);
  const [building, setBuilding] = useState();
  const [images, setImages] = useState();
  const [isError, setIsError] = useState(false);
  const [mainImg, setMainImg] = useState();
  const [officeHours, setOfficeHours] = useState();
  const [unit, setUnit] = useState();

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
        setImages(JSON.parse(response.data.data.img));
        setOfficeHours(JSON.parse(response.data.data.officehours));
        setMainImg(JSON.parse(response.data.data.img)[0]);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, [idBuilding]);
  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: `http://13.213.57.122:8080/unit/building/${idBuilding}`,
    };

    axios
      .request(option)
      .then(function (response) {
        setUnit(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, [idBuilding]);

  if (isError) {
    <Error500 />;
  }
  if (!idBuilding) {
    return <NotFound />;
  }

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#4f4f4f",
          borderRadius: "50%",
          height: "20px",
          width: "20px",
          paddingTop: "1px",
          paddingRight: "1px",
          marginLeft: "1px",
        }}
        onClick={onClick}
      />
    );
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
                {unit ? null : (
                  <>
                    {" "}
                    {role_id === 1 || role_id === 2 ? (
                      <>
                        <Col lg={2} className="colbccc">
                          <Button
                            variant="dark"
                            size="sm"
                            className="bccc1"
                            as={Link}
                            to={`/unit/add?key=${idBuilding}`}
                          >
                            {" "}
                            <MdOutlineAddCircleOutline size={28} /> Add Unit
                          </Button>
                        </Col>
                      </>
                    ) : null}
                  </>
                )}
                <Container className="con-fitur">
                  <Row className="row-fitur">
                    <Col lg={5}>
                      <Image src={mainImg} alt="main" className="main-img" />
                      <Row className="row-img">
                        {images?.map((v, i) => {
                          return (
                            <>
                              <Col>
                                <Image
                                  src={v}
                                  alt={i}
                                  className={
                                    mainImg === v ? "activeIMG" : "imgs"
                                  }
                                  onClick={() => setMainImg(images[i])}
                                />
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col lg={7}>
                      <p className="textPrice">Start from (sqm per/month)</p>
                      <p className="startprice">
                        {formatRupiah(building?.pricestart)}
                      </p>
                      <p className="textdescription">{building?.description}</p>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Address :</p>
                        </Col>
                        <Col lg={8}>
                          <p>{building?.address}</p>
                        </Col>
                      </Row>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Complex :</p>
                        </Col>
                        <Col lg={8}>
                          <p>{building?.complex.name}</p>
                        </Col>
                      </Row>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Building Size :</p>
                        </Col>
                        <Col lg={8}>
                          <p>{building?.size} m²</p>
                        </Col>
                      </Row>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Count Floor :</p>
                        </Col>
                        <Col lg={8}>
                          <p>{building?.floor}</p>
                        </Col>
                      </Row>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Toilet :</p>
                        </Col>
                        <Col lg={8}>
                          <p>{building?.toilet}</p>
                        </Col>
                      </Row>{" "}
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Office Hours :</p>
                        </Col>
                        <Col lg={8}>
                          <p>Mon - Fri : {officeHours?.weekday}</p>
                          <p>Sat : {officeHours?.saturday}</p>
                          <p>Sun : {officeHours?.sunday}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>{" "}
                </Container>
                {unit ? (
                  <Container className="con-fitur conUnit">
                    <Row className="row-fitur">
                      <Row className="rowTextUnit">
                        <Col lg={10}>
                          <h3>UNIT</h3>{" "}
                        </Col>
                        {role_id === 1 || role_id === 2 ? (
                          <>
                            <Col lg={2} className="colbccc">
                              <Button
                                variant="dark"
                                size="sm"
                                className="bccc"
                                as={Link}
                                to={`/unit/add?key=${idBuilding}`}
                              >
                                {" "}
                                <MdOutlineAddCircleOutline size={28} /> Add Unit
                              </Button>
                            </Col>
                          </>
                        ) : null}
                      </Row>
                      <Row>
                        <Slider {...settings} className="sliderr">
                          {unit?.map((v) => {
                            return (
                              <CardUnit
                                name={v.name}
                                img={JSON.parse(v.img)[0]}
                                price={v.price}
                              />
                            );
                          })}
                        </Slider>
                      </Row>
                    </Row>
                  </Container>
                ) : null}
                <Container className="con-fitur con-building">
                  <Row className="row-fitur " style={{ height: "400px" }}>
                    <h3>NEARBY FACILITIES</h3>
                    <div className="map-building">
                      <GMaps
                        style={{ height: "100%", width: "100%" }}
                        lat={building?.latitude}
                        lng={building?.longitude}
                        name={building?.name}
                      />
                    </div>
                  </Row>
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
