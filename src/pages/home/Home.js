import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Searching from "../../components/searching/Searching";
import CardFeatured from "../../components/card/CardFeatured";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Searching />
      <Container>
        <div className="title">
          <h4>Featured Office Space</h4>
          <h2>POPULAR COMPLEX</h2>
        </div>

        <Row className="justify-content-center">
          <Col lg={3}>
            <CardFeatured
              name="Sudirman, CBD"
              width="100%"
              img="https://arthagraha.net/wp-content/uploads/2015/06/parallax-1.jpg"
            />
          </Col>
          <Col lg={3}>
            <CardFeatured
              name="Gatot Subroto, CBD"
              width="100%"
              img="https://c8.alamy.com/comp/2C2W88R/beautiful-gatot-subroto-jakarta-in-the-night-has-a-blend-of-architecture-metropolitan-culture-modernity-and-nightlife-2C2W88R.jpg"
            />
          </Col>{" "}
          <Col lg={4}>
            <CardFeatured
              name="Thamrin, CBD"
              width="100%"
              img="http://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/109/2019/09/27080349/web-drone.jpg"
            />
          </Col>{" "}
          <Col lg={3}>
            <CardFeatured
              name="Pancoran"
              width="100%"
              img="https://cdn-image.hipwee.com/wp-content/uploads/2018/01/hipwee-20170411-patung-dirgantara_20170411_073808.jpg"
            />
          </Col>
          <Col lg={4}>
            <CardFeatured
              name="Mega Kuningan, CBD"
              width="100%"
              img="https://live.staticflickr.com/5515/30434467474_c3e5dc6ecc_b.jpg"
            />
          </Col>{" "}
          <Col lg={3}>
            <CardFeatured
              name="TB Simatupang"
              width="100%"
              img="https://cdn-2.tstatic.net/tribunnews/foto/bank/images/kawasan-perkantoran-dan-hunian-high-rise-di-tb-simatupang.jpg"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
