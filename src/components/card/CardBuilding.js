import "./CardBuilding.css";
import { Card, Button, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

export default function CardBuilding({
  clickView,
  clickEnquire,
  rating,
  img,
  price,
  complex,
  name,
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
          <p style={{ paddingLeft: "10px", color: "white" }}>
            {" "}
            <span style={{ fontSize: "12px" }}>Star from (per sqm/month) </span>
            <br /> <span style={{ fontWeight: "550" }}>{formatRupiah()}</span>
          </p>
        </Card.ImgOverlay>
        <Card.Body style={{ color: "black" }}>
          <Card.Title
            style={{ fontWeight: "600", fontSize: "24px", margin: "0" }}
          >
            {name}
          </Card.Title>
          <Rating ratingValue={rating} allowHover={false} size={25}></Rating>
          <span
            style={{
              paddingLeft: "10px",
              fontSize: "16px",
              paddingTop: "10px",
            }}
          >
            {conversiValue(rating)}{" "}
          </span>

          <Card.Text style={{ fontSize: "13px" }}>{complex}</Card.Text>
        </Card.Body>
        <div style={{ padding: "0", backgroundColor: "#E5E5E5" }}>
          <Row
            className="justify-content-center"
            style={{ padding: "20px 0px 20px 0px" }}
          >
            {" "}
            <Button
              onClick={clickEnquire}
              variant="dark"
              style={{ width: "80%", textAlign: "center", fontSize: "11px" }}
            >
              ENQUIRE
            </Button>{" "}
            <Button
              onClick={clickView}
              variant="light"
              style={{
                width: "80%",
                align: "center",
                fontSize: "11px",
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
