/* eslint-disable react-hooks/exhaustive-deps */
import "./Home.css";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Searching from "../../components/searching/Searching";
import CardFeatured from "../../components/card/CardFeatured";
import CardComplex from "../../components/card/CardComplex";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Error500 from "../../components/error/Error500";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
const Home = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [building, setbuilding] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    var options = {
      method: "GET",
      url: "http://13.213.57.122:8080/buildings",
    };

    axios
      .request(options)
      .then(function (response) {
        setbuilding(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isError) {
    return <Error500 />;
  }
  return (
    <>
      <NavBar home={true} />
      <Searching />
      {isLoading ? (
        <>
          {" "}
          <div id="spinner">
            <Spinner animation="border" />
          </div>
        </>
      ) : (
        <>
          {" "}
          <Container fluid className="container1">
            <div className="title2">
              <h4>Featured Office Space</h4>
              <h2>POPULAR COMPLEX</h2>
            </div>
            <Row>
              <Col lg={2}></Col>
              <Col lg={8}>
                <Row className="justify-content-center row1">
                  <Col lg={4} className="col1">
                    <CardFeatured
                      idx={4}
                      name="Sudirman, CBD"
                      width="100%"
                      img="https://arthagraha.net/wp-content/uploads/2015/06/parallax-1.jpg"
                    />
                  </Col>
                  <Col lg={3}>
                    <CardFeatured
                      idx={2}
                      name="Gatot Subroto, CBD"
                      width="100%"
                      img="https://c8.alamy.com/comp/2C2W88R/beautiful-gatot-subroto-jakarta-in-the-night-has-a-blend-of-architecture-metropolitan-culture-modernity-and-nightlife-2C2W88R.jpg"
                    />
                  </Col>{" "}
                  <Col lg={5}>
                    <CardFeatured
                      idx={1}
                      name="Thamrin, CBD"
                      width="100%"
                      img="http://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/109/2019/09/27080349/web-drone.jpg"
                    />
                  </Col>{" "}
                  <Col lg={3}>
                    <CardFeatured
                      idx={5}
                      name="Pancoran"
                      width="100%"
                      img="https://cdn-image.hipwee.com/wp-content/uploads/2018/01/hipwee-20170411-patung-dirgantara_20170411_073808.jpg"
                    />
                  </Col>
                  <Col lg={5}>
                    <CardFeatured
                      idx={3}
                      name="Mega Kuningan, CBD"
                      width="100%"
                      img="https://live.staticflickr.com/5515/30434467474_c3e5dc6ecc_b.jpg"
                    />
                  </Col>{" "}
                  <Col lg={4}>
                    <CardFeatured
                      idx={6}
                      name="TB Simatupang"
                      width="100%"
                      img="https://cdn-2.tstatic.net/tribunnews/foto/bank/images/kawasan-perkantoran-dan-hunian-high-rise-di-tb-simatupang.jpg"
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </Container>
          <Container fluid className="container2">
            <div className="title1">
              <h2>MOST POPULAR BUILDING</h2>
              <h4>Office Space</h4>
            </div>
            <Row className="justify-content-center">
              <Col lg={2}></Col>
              <Col lg={8}>
                <Row className="justify-content-center">
                  {building?.slice(0, 6).map((v, i) => {
                    return (
                      <Col lg={4} key={v.id}>
                        <Link
                          to={`/building/detail?key=${v?.id}`}
                          className="link"
                        >
                          <CardComplex
                            img={JSON.parse(v.img)[0]}
                            name={v.name}
                            as
                            width="100%"
                          />{" "}
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              <Col lg={2}> </Col>
            </Row>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
