import "./CardBuilding.css";
import { Card, Button, Container } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

export default function CardBuilding() {
  var img =
    "https://images.unsplash.com/photo-1639502003763-e9dae1e76ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
  var rating = 90;
  var hover = false;
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
  console.log(conversiValue(90));
  console.log(conversiValue(75));

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
            <br /> <span style={{ fontWeight: "550" }}>Rp.500.000</span>
          </p>
        </Card.ImgOverlay>
        <Card.Body style={{ color: "black" }}>
          <Card.Title
            style={{ fontWeight: "600", fontSize: "24px", margin: "0" }}
          >
            Menara Global
          </Card.Title>
          <Rating ratingValue={rating} allowHover={hover} size={25}></Rating>
          <span
            style={{
              paddingLeft: "10px",
              fontSize: "16px",
              paddingTop: "10px",
            }}
          >
            {conversiValue(rating)}{" "}
          </span>

          <Card.Text style={{ fontSize: "13px" }}>Thamrin</Card.Text>
        </Card.Body>
        <div style={{ padding: "0" }}>
          <Button
            variant="primary"
            style={{ width: "80%", textAlign: "center" }}
          >
            Go somewhere
          </Button>{" "}
        </div>
      </Card>
    </>
  );
}
