import { Container } from "react-bootstrap";
import "./CardComplex.css";
export default function CardComplex({ click, img, name }) {
  // var Background =
  //   "https://images.unsplash.com/photo-1639502003763-e9dae1e76ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
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
