import "./CardBuilding.css";
import { Card, Button, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

export default function CardUnit({
  clickView,
  clickEnquire,
  img,
  price,
  name,
}) {
  const formatRupiah = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Card className="card" style={{ width: "18rem", padding: "0" }}>
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
        {/* <Card.ImgOverlay
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
        </Card.ImgOverlay> */}
        <Card.Body style={{ color: "black" }}>
          <Card.Title
            style={{ fontWeight: "600", fontSize: "24px", margin: "0" }}
          >
            {name}
          </Card.Title>

          <Card.Text style={{ fontSize: "18px" }}>
            {" "}
            <span style={{ fontWeight: "550" }}>{formatRupiah()}</span>{" "}
            <span style={{ fontSize: "16px" }}>(per sqm/month)</span>
          </Card.Text>
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
