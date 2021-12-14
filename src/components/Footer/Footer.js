import { Container, Row, Col } from "react-bootstrap";
import Brand from "../Brand/Brand";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <Container fluid>
        <Container
          style={{
            textAlign: "left",
            marginBottom: "50px",
            marginTop: "50px",
          }}
        >
          <Row>
            <Col lg={6}>
              <Brand />
              <p style={{ fontSize: "14px" }}>
              goodJobs is an web-based platform to rent office spaces across Jakarta. 
              goodjobs aims for the convenience of user when searching for a suitable 
              working space in Jakarta’s business district areas.
              </p>
            </Col>
            <Col lg={6}>
              <Row style={{ marginTop: "20px" }}>
                <Col lg={4}>
                  <>
                    <h6 style={{ fontWeight: "600" }}>INFORMATION</h6>
                    <br />
                    <dl style={{ fontSize: "14px" }}>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/"
                        >
                          {" "}
                          Home{" "}
                        </Link>
                      </dd>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to=""
                        >
                          {" "}
                          Complex{" "}
                        </Link>
                      </dd>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to=""
                        >
                          {" "}
                          Building{" "}
                        </Link>
                      </dd>
                    </dl>
                  </>
                </Col>
                <Col lg={4}>
                  <>
                    <h6 style={{ fontWeight: "600" }}>MY ACCOUNT</h6>
                    <br />
                    <dl style={{ fontSize: "14px" }}>
                      <dd>My Account</dd>
                    </dl>
                  </>
                </Col>
                <Col lg={4}>
                  {" "}
                  <>
                    <h6 style={{ fontWeight: "600" }}>CONTACT US</h6>
                    <br />
                    <dl style={{ fontSize: "14px" }}>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to=""
                        >
                          {" "}
                          Chat{" "}
                        </Link>
                      </dd>
                    </dl>
                  </>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
