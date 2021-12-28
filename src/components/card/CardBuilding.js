import "./CardBuilding.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

export default function CardBuilding({
  rating,
  img,
  price,
  complex,
  name,
  id,
  role_id,
}) {
  const formatRupiah = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
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
  const handleDelete = () => {};

  return (
    <>
      <Card className="cardbuild" style={{ width: "18rem", padding: "0" }}>
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
            marginTop: "49%",

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
                    style={{ fontWeight: "600", fontSize: "18px", margin: "0" }}
                  >
                    {name}
                  </Card.Title>
                  <Rating
                    ratingValue={rating}
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
                    {conversiValue(rating)}{" "}
                  </span>

                  <Card.Text style={{ fontSize: "14px" }}>{complex}</Card.Text>
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
                        <FiEdit size={24} />{" "}
                      </Button>

                      <Button
                        type="button"
                        onClick={handleDelete}
                        variant="ds"
                        style={{ padding: "0", marginLeft: "5px" }}
                      >
                        <AiOutlineDelete size={27} color="red" />
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
                ratingValue={rating}
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
                {conversiValue(rating)}{" "}
              </span>
              <Card.Text style={{ fontSize: "14px" }}>{complex}</Card.Text>{" "}
            </>
          )}
        </Card.Body>
        <div style={{ padding: "0", backgroundColor: "#E5E5E5" }}>
          <Row
            className="justify-content-center"
            style={{ padding: "20px 0px 20px 0px" }}
          >
            {" "}
            {/* <Button
              as={Link}
              to={`/chat?building=${id}`}
              variant="dark"
              style={{ width: "80%", textAlign: "center", fontSize: "11px" }}
            >
              ENQUIRE
            </Button>{" "} */}
            <Button
              as={Link}
              to={`/bulding/detail?key=${id}`}
              variant="dark"
              style={{
                width: "80%",

                align: "center",
                fontSize: "14px",
              }}
            >
              VIEW DETAIL
            </Button>{" "}
          </Row>
        </div>
      </Card>
    </>
  );
}
