import "./Search.css";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Form,
  Button,
} from "react-bootstrap";

export default function Search() {
  return (
    <>
      <Container fluid className="Background">
        <Row className="justify-content-center" style={{ paddingTop: "120px" }}>
          <Col md={6}>
            <h1 style={{ fontWeight: "600px", color: "white" }}>
              The Easiest Way to Get Office Space
            </h1>
            <Container
              fluid
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.22)",
                height: "130px",
              }}
            >
              <Row style={{ paddingTop: "45px" }}>
                <Form inline className="d-flex">
                  {/* <Col md={2}> */}
                  <DropdownButton
                    title="Filter"
                    id="bg-nested-dropdown"
                    variant="light"
                    style={{ marginRight: "20px" }}
                  >
                    <Dropdown.Item eventKey="1">Complex</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Building</Dropdown.Item>
                  </DropdownButton>
                  {/* </Col> */}
                  {/* <Col md={8}> */}
                  <Form.Control
                    type="text"
                    placeholder="Type Building (e.g. Wisma 46,Menara BCA)"
                    variant="light"
                  />
                  {/* </Col> */}
                  {/* <Col md={2}></Col> */}
                  <Button
                    variant="dark"
                    type="submit"
                    style={{ marginLeft: "20px" }}
                  >
                    Search
                  </Button>
                </Form>
              </Row>
            </Container>
          </Col>{" "}
        </Row>
      </Container>
    </>
  );
}
