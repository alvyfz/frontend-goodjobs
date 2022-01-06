import "./Searching.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Searching() {
  const Navigate = useNavigate();
  const [filter, setfilter] = useState("building");
  const [text, settext] = useState();
  console.log(text);
  const handleSearching = () => {
    Navigate(`/search?key=${text}&filter=${filter}`);
    setfilter("");
    settext("");
  };
  return (
    <>
      <Container fluid className="Background">
        <Row
          className="justify-content-center"
          style={{ paddingTop: "120px", textAlign: "center" }}
        >
          <Col md={6}>
            <h1
              style={{
                fontWeight: "600px",
                color: "white",
              }}
            >
              The Easiest Way to Get Office Space
            </h1>
            <Container
              fluid
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.22)",
                height: "100%",
              }}
            >
              <Row style={{ paddingTop: "50px" }}>
                <Form inline onSubmit={handleSearching}>
                  <Row
                    // style={{ padding: "0px", margin: "0px" }}
                    className="justify-content-center"
                  >
                    <Col lg={2} style={{ padding: "0" }}>
                      <Form.Select
                        size="sm"
                        id="nationality"
                        name="Filter"
                        value={filter}
                        onChange={(e) => setfilter(e.target.value)}
                        style={{
                          width: "115px",
                          marginRight: "20px",
                          fontSize: "16px",
                          margin: "5px auto 0px auto",
                        }}
                      >
                        <option value="complex">Complex</option>
                        <option selected value="building">
                          Building
                        </option>
                      </Form.Select>
                    </Col>
                    <Col lg={8}>
                      <Form.Control
                        value={text}
                        type="text"
                        placeholder="(e.g. Wisma 46,Menara Global)"
                        variant="light"
                        onChange={(e) => settext(e.target.value)}
                        required
                        style={{
                          height: "35px",
                          marginTop: "5px",
                        }}
                      />
                    </Col>
                    <Col lg={2} style={{ padding: 0 }}>
                      <Button
                        variant="dark"
                        type="submit"
                        style={{
                          width: "115px",

                          height: "35px",
                          marginTop: "5px",
                          fontSize: "15px",
                        }}
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </Container>
          </Col>{" "}
        </Row>
      </Container>
    </>
  );
}
