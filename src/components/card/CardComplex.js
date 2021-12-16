import { Container } from "react-bootstrap";
import "./CardComplex.css";
export default function CardComplex({ click, img, name }) {
  return (
    <>
      <div
        onClick={click}
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
        <Container
          fluid
          id="container"
          style={{
            padding: "0px",
            fontSize: "18px",
            textAlign: "left !important",
            height: "35px",
            marginTop: "56%",
            backgroundColor: "rgba(0, 0, 0, 0.66)",
          }}
        >
          <p
            id="p"
            style={{ color: "white", paddingTop: "5px", paddingLeft: "5px" }}
          >
            {name}
          </p>
        </Container>
      </div>
    </>
  );
}
