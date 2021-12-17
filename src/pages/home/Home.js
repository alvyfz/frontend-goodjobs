import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Searching from "../../components/searching/Searching";
import CardFeatured from "../../components/card/CardFeatured";
import CardComplex from "../../components/card/CardComplex";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [building, setbuilding] = useState();
  useEffect(() => {
    var options = {
      method: "GET",
      url: "http://localhost:8000/building",
    };

    axios
      .request(options)
      .then(function (response) {
        setbuilding(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Searching />
      <Container fluid className="container1">
        <div className="title">
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
                    <Link to={`/building/detail?id=${v.id}`} className="link">
                      <CardComplex img={v.img} name={v.name} as width="100%" />{" "}
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col lg={2}> </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
