import "./CardBuilding.css";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import Error500 from "../error/Error500";

export default function CardBuilding({
  img,
  price,
  complex,
  name,
  id,
  role_id,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [review, setReview] = useState();
  const formatRupiah = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  useEffect(() => {
    setIsLoading(true);
    var options = {
      method: "GET",
      url: `http://13.213.57.122:8080/reviews/building/{$id}`,
    };

    axios
      .request(options)
      .then(function (response) {
        setReview(response.data.data);
        setIsError(false);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, [id]);
  if (isError) {
    <Error500 />;
  }
  const filteredReview = review?.filter((v) => v.building_id === id);
  const avg = (array) => array?.reduce((a, b) => a + b) / array?.length;
  const avgReview = avg(filteredReview?.rating);
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
  const handleDelete = () => {
    Swal.fire({
      title: `Do you want to delete building ${name} ?`,
      showCancelButton: true,
      cancelButtonColor: "#DDDDDD",
      confirmButtonColor: "#A9333A",
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var options = {
          method: "DELETE",
          url: `http://13.213.57.122:8080/building/${id}`,
        };
        axios
          .request(options)
          .then(function (response) {
            Swal.fire(`Delete building ${name} success!`, "", "success");
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <Card className="cardbuild" style={{ width: "100%", padding: "0" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {" "}
            <Card.Img
              variant="top"
              src={img}
              style={{
                padding: "0",
                objectFit: "cover",
                width: "100%",
                height: "200px",
              }}
            />
            <Card.ImgOverlay
              style={{
                padding: "0px ",
                fontSize: "18px",
                textAlign: "left !important",
                height: "60px",
                marginTop: "140px",

                backgroundColor: "rgba(0, 0, 0, 0.66)",
              }}
            >
              <p style={{ paddingLeft: "20px", color: "white" }}>
                {" "}
                <span style={{ fontSize: "12px" }}>
                  Start from (per sqm/month){" "}
                </span>
                <br />{" "}
                <span style={{ fontWeight: "550", fontSize: "18px" }}>
                  {formatRupiah()}
                </span>
              </p>
            </Card.ImgOverlay>
            <Card.Body style={{ color: "black" }}>
              {role_id === 1 || role_id === 2 ? (
                <>
                  {" "}
                  <Row>
                    <Col lg={8}>
                      <Card.Title
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          margin: "0",
                        }}
                      >
                        {name}
                      </Card.Title>
                      <Rating
                        ratingValue={avgReview || 0}
                        allowHover={false}
                        size={18}
                      ></Rating>
                      <span
                        style={{
                          paddingLeft: "10px",
                          fontSize: "14px",
                          paddingTop: "15px",
                        }}
                      >
                        {conversiValue(avgReview) || 0}{" "}
                      </span>
                      <br />

                      <Card.Text style={{ fontSize: "14px" }}>
                        {complex}
                      </Card.Text>
                    </Col>
                    <Col lg={4}>
                      <Row>
                        <Col>
                          <Button
                            style={{ padding: "0", paddingLeft: "5px" }}
                            variant="fa"
                            type="button"
                            as={Link}
                            to={`/building/edit?key=${id}`}
                          >
                            {" "}
                            <FiEdit size={19} />{" "}
                          </Button>

                          <Button
                            type="button"
                            onClick={handleDelete}
                            variant="ds"
                            style={{ padding: "0", marginLeft: "5px" }}
                          >
                            <AiOutlineDelete size={23} color="red" />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Card.Title
                    style={{ fontWeight: "600", fontSize: "20px", margin: "0" }}
                  >
                    {name}
                  </Card.Title>
                  <Rating
                    ratingValue={avgReview || 0}
                    allowHover={false}
                    size={18}
                  ></Rating>
                  <span
                    style={{
                      paddingLeft: "10px",
                      fontSize: "14px",
                      paddingTop: "15px",
                    }}
                  >
                    {conversiValue(avgReview || 0)}{" "}
                  </span>
                  <Card.Text style={{ fontSize: "14px" }}>{complex}</Card.Text>{" "}
                </>
              )}

              <div style={{ padding: "0" }}>
                <Row
                  className="justify-content-center"
                  style={{ padding: "15px 0px 5px 0px" }}
                >
                  <Button
                    as={Link}
                    to={`/bulding/detail?key=${id}`}
                    variant="dark"
                    style={{
                      width: "91%",
                      align: "center",
                      fontSize: "14px",
                    }}
                  >
                    VIEW DETAIL
                  </Button>{" "}
                </Row>
              </div>
            </Card.Body>
          </>
        )}
      </Card>
    </>
  );
}
