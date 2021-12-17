import { Container } from "react-bootstrap";
import "./CardFeatured.css";
export default function CardComplex({ click, name, img, width }) {
  return (
    <>
      <div
        onClick={click}
        className="ho card"
        style={{
          padding: "0",
          backgroundImage: "url(" + img + ")",
          backgroundSize: "cover",
          width: width,
          height: "200px",
        }}
      >
        {" "}
        <Container fluid id="con">
          <p id="name">{name}</p>
        </Container>
      </div>
    </>
  );
}
