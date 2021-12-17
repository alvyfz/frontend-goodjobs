import { Container } from "react-bootstrap";
import "./CardComplex.css";
export default function CardComplex({ name, img }) {
  return (
    <>
      <div
        className="ho card"
        style={{
          padding: "0",
          backgroundImage: "url(" + img + ")",
          backgroundSize: "cover",
          width: "296px",
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
