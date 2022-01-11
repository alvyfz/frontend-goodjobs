import NavBar from "../../components/navbar/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Error500 from "../../components/error/Error500";
import { Container, Spinner, Row, Col, Image, Button } from "react-bootstrap";
import NotFound from "../error/NotFound";
import Footer from "../../components/footer/Footer";
import { IoIosArrowBack } from "react-icons/io";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
const DetailUnit = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idUnit = parseInt(query.get("key"));
  const buildingName = query.get("b");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [unit, setUnit] = useState();
  const [images, setImages] = useState();
  const [mainImg, setMainImg] = useState();
  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: `http://13.213.57.122:8080/unit/${idUnit}`,
    };

    axios
      .request(option)
      .then(function (response) {
        setUnit(response.data.data);
        setIsLoading(false);
        setImages(JSON.parse(response.data.data.img));
        setMainImg(JSON.parse(response.data.data.img)[0]);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, [idUnit]);

  if (isError) {
    <Error500 />;
  }
  if (!idUnit || !buildingName) {
    return <NotFound />;
  }
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  const handleEnquired = () => {
    if (!role_id) {
      Swal.fire({
        title: `Sorry, you have to login first !`,
        showCancelButton: true,
        cancelButtonColor: "#DDDDDD",
        confirmButtonColor: "black",
        confirmButtonText: "Login?",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Navigate(`/login`);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Navigate(`/chat?key=${idUnit}`);
    }
  };
  return (
    <>
      <NavBar building={true} />
      {isLoading ? (
        <div id="spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {" "}
          <Container fluid className="conheader">
            <div className="textheader">
              <h1 style={{ fontWeight: "700" }}>{unit?.name.toUpperCase()}</h1>
              <h3>
                <Link className="spanhome" to="/">
                  <span>HOME</span>
                </Link>{" "}
                <Link
                  className="spanhome"
                  to={`/building/detail?key=${unit?.building_id}`}
                >
                  <span>/ {buildingName.toUpperCase()} /</span>{" "}
                </Link>
                <span className="spancon"> {unit?.name.toUpperCase()}</span>
              </h3>
            </div>
          </Container>
          <Container fluid className="complexcon">
            <Row>
              <Col lg={2}></Col>
              <Col>
                {" "}
                <Button variant="\f" className="buttonBack">
                  <IoIosArrowBack size={40} onClick={() => Navigate(-1)} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={2}></Col>
              <Col lg={8}>
                <Container className="con-fitur ">
                  <Row className="row-fitur conunit">
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
                    <Col lg={7} className="colUnit">
                      <h3 className="nameBuilding">
                        {buildingName.toUpperCase()}
                      </h3>
                      <h3>{unit?.name.toUpperCase()}</h3>
                      <p className="startpriceunit">
                        {formatRupiah(unit?.price)}
                      </p>
                      <p className="textdescription">{unit?.description}</p>
                      <Row className="rowDetail">
                        <Col lg={4}>
                          <p>Unit size :</p>
                        </Col>
                        <Col lg={8}>
                          <p className="p-isii">{unit?.unitsize} m²</p>
                        </Col>
                      </Row>
                      <Button
                        className="buttonenquire"
                        variant="dark"
                        onClick={handleEnquired}
                      >
                        ENQUIRE
                      </Button>
                    </Col>
                  </Row>{" "}
                </Container>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};
export default DetailUnit;
