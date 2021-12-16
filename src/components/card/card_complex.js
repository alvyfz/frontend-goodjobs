import { Card, Image, Container } from "react-bootstrap";
import "./cc.css";
export default function CardComplex({ click, img, name }) {
  var Background =
    "https://images.unsplash.com/photo-1639502003763-e9dae1e76ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
  return (
    <>
      {/* <Card style={{ width: "18rem" }}>
        <Card.Img
          src="https://images.unsplash.com/photo-1639588660349-e9b44468e70a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          style={{ objectFit: "cover", width: "100%" height:"300px" }}
        />
        <Card.ImgOverlay
          className="d-flex flex-column flex= justify-content-end"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.80)",
            // height: "20px",
            paddingTop: "20px",
            marginTop: "110px",
          }}
        >
          <div
            style={{
              // width: "500px",
              fontSize: "18px",
              textAlign: "left",
            }}
          >
            {" "}
            Gatot Subroto, CBD{" "}
          </div>
        </Card.ImgOverlay>
      </Card> */}
      <div
        onClick={click}
        className="ho"
        style={{
          backgroundImage: "url(" + Background + ")",
          backgroundSize: "cover",
          width: "296px",
          height: "200px",
        }}
      >
        {" "}
        <Container
          fluid
          style={{
            // width: "500px",
            fontSize: "18px",
            textAlign: "left !important",
            height: "35px",
            marginTop: "61%",
            textShadow: "1px 1px rgba(0, 0, 0, 0.80)",
            // backgroundColor: "rgba(0, 0, 0, 0.80)",
          }}
        >
          <p style={{ paddingTop: "5px" }}>Gatot Subroto, CBD</p>
        </Container>
      </div>
    </>
  );
}
