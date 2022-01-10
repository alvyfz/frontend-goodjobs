import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import {
  Container,
  Spinner,
  Row,
  Col,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import Error500 from "../../components/error/Error500";
import "./DetailBuilding.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from "../error/NotFound";
import Slider from "react-slick";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Rating } from "react-simple-star-rating";
import GMaps from "../../components/gmaps/GMaps";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";
import CardUnit from "../../components/card/CardUnit";

const DetailBuilding = () => {
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;

  const user_id = jwt.ID;
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
  const [valueRating, setValueRating] = useState();
  const [valueArea, setValueArea] = useState();
  const [review, setReview] = useState();
  const [avgReview, setAvgReview] = useState(0);
  const [messageRating, setMessageRating] = useState("No Reviews");
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
  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: `http://13.213.57.122:8080/reviews/building/${idBuilding}`,
    };

    axios
      .request(option)
      .then(function (response) {
        setReview(response.data.data);
        setIsLoading(false);
        const avg = (array) =>
          array?.reduce((a, b) => a + b.rating, 0) / array?.length;
        setAvgReview(avg(response.data.data));
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, [idBuilding]);

  useEffect(() => {
    if (avgReview === 0) {
    } else if (avgReview <= 20 || review?.[0].rating <= 20) {
      setMessageRating("Terrible");
    } else if (avgReview <= 40 || review?.[0].rating <= 40) {
      setMessageRating("Bad");
    } else if (avgReview <= 60 || review?.[0].rating <= 60) {
      setMessageRating("Good");
    } else if (avgReview <= 80 || review?.[0].rating <= 80) {
      setMessageRating("Great");
    } else if (avgReview <= 100 || review?.[0].rating <= 100) {
      setMessageRating("Awesome");
    }
  }, [avgReview, review]);
  const addReviewHandle = (e) => {
    e.preventDefault();
    if (user_id) {
      axios
        .post("http://13.213.57.122:8080/review", {
          user_id: user_id,
          building_id: idBuilding,
          rating: parseInt(valueRating),
          description: valueArea,
        })
        .then(function (response) {
          Swal.fire("Add review success!", "", "success");
          setValueRating();
          setValueArea();
          window.location.reload();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something Wrong :( !",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, you have to login first !",
      });
    }
  };

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
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#B1AEAE",
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

  const userReview = review?.find((element) => element.user_id === user_id);
  const conversiValue = (OldValue) => {
    var OldMax = 100;
    var OldMin = 0;
    var NewMax = 5;
    var NewMin = 0;
    var OldRange = OldMax - OldMin;
    var NewRange = NewMax - NewMin;
    var NewValue = ((OldValue - OldMin) * NewRange) / (OldRange + NewMin);
    return NewValue;
  };
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
                              <Col className="padding0">
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
                          <p className="p-isi">{building?.address}</p>
                        </Col>
                      </Row>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Complex :</p>
                        </Col>
                        <Col lg={8}>
                          <p className="p-isi">{building?.complex.name}</p>
                        </Col>
                      </Row>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Building Size :</p>
                        </Col>
                        <Col lg={8}>
                          <p className="p-isi">{building?.size} m²</p>
                        </Col>
                      </Row>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Count Floor :</p>
                        </Col>
                        <Col lg={8}>
                          <p className="p-isi">{building?.floor}</p>
                        </Col>
                      </Row>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Toilet :</p>
                        </Col>
                        <Col lg={8}>
                          <p className="p-isi">{building?.toilet}</p>
                        </Col>
                      </Row>{" "}
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Office Hours :</p>
                        </Col>
                        <Col lg={8}>
                          <p className="p-isi">
                            Mon - Fri : {officeHours?.weekday}
                          </p>
                          <p className="p-isi">Sat : {officeHours?.saturday}</p>
                          <p className="p-isi">Sun : {officeHours?.sunday}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>{" "}
                </Container>
                {unit ? (
                  <Container
                    className="con-fitur conUnit"
                    style={{ height: "540px" }}
                  >
                    <Row className="row-fitur" s>
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
                                id={v.id}
                                role_id={role_id}
                                buildingName={building?.name}
                              />
                            );
                          })}
                        </Slider>
                      </Row>
                    </Row>
                  </Container>
                ) : null}
                <Container className="con-fitur con-building">
                  <Row className="row-fitur ">
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
                <Container className="con-fitur">
                  <Row className="row-fitur ">
                    {" "}
                    <h3>REVIEWS</h3>
                    <Row className="rowRev">
                      <Col lg={5}>
                        <Row className="row-rev">
                          <Container className="kotak-review">
                            <div className="h1-rev">
                              {conversiValue(
                                avgReview || review?.[0].rating || 0
                              )}
                              /<span className="limaper">5</span>
                            </div>
                            <div className="font-bold">{messageRating}</div>
                            <div className="length-rev">
                              {review?.length || 0} Reviews
                            </div>
                          </Container>
                          <Container className="kotak-bintang">
                            {" "}
                            <Rating
                              className="rating-building"
                              ratingValue={avgReview || review?.[0].rating || 0}
                              allowHover={false}
                              readonly={true}
                              size={30}
                              fillColor="#ccc62a"
                            />{" "}
                          </Container>
                        </Row>
                      </Col>{" "}
                      <Col lg={1} className="col-bd">
                        {review?.length === undefined ? null : (
                          <Button
                            variant="sad"
                            as={Link}
                            to={`/review?key=${idBuilding}&b=${building?.name}`}
                            className="buttom-detail"
                          >
                            detail
                          </Button>
                        )}
                      </Col>
                      <Col lg={6}>
                        {userReview ? (
                          <>
                            <Container className="conyourdesc">
                              <Row className="justify-content-center">
                                {/* <p className="yourReview">Your review</p> */}
                                <Rating
                                  size={30}
                                  ratingValue={userReview}
                                  fillColor="#ccc62a"
                                  allowHover={false}
                                  readonly={true}
                                />

                                <p className="yourdescription">
                                  {userReview.description}
                                </p>
                              </Row>
                            </Container>
                          </>
                        ) : (
                          <>
                            {" "}
                            <p className="writeReview">Write Review</p>
                            <Form>
                              <Rating
                                size={30}
                                onClick={(rate) => setValueRating(rate)}
                                ratingValue={valueRating}
                                fillColor="#ccc62a"
                              />
                              <Form.Group
                                className="mb-2"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Label className="formareare">
                                  What's your review of the building?
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={2}
                                  value={valueArea}
                                  onChange={(e) => setValueArea(e.target.value)}
                                  required
                                />
                              </Form.Group>
                              <Row>
                                {" "}
                                <Col lg={9}></Col>
                                <Col lg={3}>
                                  <Button
                                    className="buttonreview"
                                    variant="dark"
                                    onClick={addReviewHandle}
                                  >
                                    Submit
                                  </Button>
                                </Col>
                              </Row>{" "}
                            </Form>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Row>
                </Container>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </Container>{" "}
          <Footer />
        </>
      )}
    </>
  );
};

export default DetailBuilding;
