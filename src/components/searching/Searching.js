import "./Search.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Searching() {
  const Navigate = useNavigate();
  const [filter, setfilter] = useState();
  const [text, settext] = useState();

  const handleSearching = () => {
    Navigate(`/search?search=${text}&filter=${filter}`);
  };
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
                <Form inline className="d-flex" onSubmit={handleSearching}>
                  {/* <Col md={2}> */}
                  {/* <DropdownButton
                    title={filter}
                    id="bg-nested-dropdown"
                    variant="light"
                    style={{ marginRight: "20px" }}
                    value={filter}
                  >
                    <Dropdown.Item eventKey="1" value="Complex">
                      Complex
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" value="Building">
                      Building
                    </Dropdown.Item>
                  </DropdownButton> */}
                  <Form.Select
                    size="sm"
                    id="nationality"
                    value={filter}
                    onChange={(e) => setfilter(e.target.value)}
                    style={{ width: "110px", marginRight: "20px" }}
                  >
                    <option selected>Filter</option>
                    <option value="Complex">Complex</option>
                    <option value="Building">Building</option>
                  </Form.Select>
                  {/* </Col> */}
                  {/* <Col md={8}> */}
                  <Form.Control
                    value={text}
                    type="text"
                    placeholder="Type Building (e.g. Wisma 46,Menara BCA)"
                    variant="light"
                    onChange={(e) => settext(e.target.value)}
                    required
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
