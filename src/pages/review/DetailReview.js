import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import Error500 from "../../components/error/Error500";
import NotFound from "../error/NotFound";
import Footer from "../../components/footer/Footer";
import { useLocation, Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import "./Review.css";
const DetailReview = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idBuilding = parseInt(query.get("key"));
  const nameBuilding = query.get("b");
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState();
  const [isError, setIsError] = useState(false);

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
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, [idBuilding]);
  if (isError) {
    <Error500 />;
  }
  if (!idBuilding || !nameBuilding) {
    return <NotFound />;
  }
  const conversiValue = (OldValue) => {
    var OldMax = 100;
    var OldMin = 0;
    var NewMax = 5;
    var NewMin = 0;
    var OldRange = OldMax - OldMin;
    var NewRange = NewMax - NewMin;
    var NewValue =
      ((OldValue - OldMin) * NewRange) / (OldRange + NewMin);
    return NewValue;
  };
  console.log(review);
  return (
    <>
      <NavBar building={true} />{" "}
      <Container fluid className="conheader">
        <div className="textheader">
          {" "}
          <h1 className="h1Review">
            REVIEW {nameBuilding?.toUpperCase()}
          </h1>
          <h3>
            <Link className="spanhome" to="/">
              <span>HOME</span>
            </Link>{" "}
            <Link className="spanhome" to="/buildings">
              <span>/ BUILDING /</span>{" "}
            </Link>
            <Link className="spanhome" to={-1}>
              <span> {nameBuilding?.toUpperCase()} /</span>{" "}
            </Link>
            <span className="spancon">REVIEW</span>
          </h3>
        </div>
      </Container>
      <Container fluid className="complexcon">
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            {isLoading ? (
              <div id="spinner">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {" "}
                <Container className="con-fitur">
                  <Row className="row-fitur">
                    {review?.map((v, i) => {
                      return (
                        <>
                          <Row>
                            <Col lg={4}>
                              <div className="cardReview">
                                <p className="cardrating">
                                  {conversiValue(v.rating)} / 5
                                </p>
                                <Rating
                                  size={30}
                                  ratingValue={v?.rating}
                                  fillColor="#ccc62a"
                                  allowHover={false}
                                  readonly={true}
                                />
                              </div>
                            </Col>
                            <Col lg={8}>
                              <p className="name-p">{v.user.name}</p>
                              <p className="desc-p">
                                {v.description}
                              </p>
                            </Col>
                          </Row>
                        </>
                      );
                    })}
                  </Row>{" "}
                </Container>{" "}
              </>
            )}
          </Col>
          <Col lg={2}></Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default DetailReview;
