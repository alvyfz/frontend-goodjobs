import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CardFeatured.css";
export default function CardComplex({ click, name, img, width, idx }) {
  return (
    <>
      <Link to={`/complex?id=${idx}`} style={{ textDecoration: "none" }}>
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
      </Link>
    </>
  );
}
