import { Container, Row, Col } from "react-bootstrap";
import Brand from "../brand/Brand";
import { Link } from "react-router-dom";
import { parseCookies } from "nookies";

export default function Footer() {
  const jwt = parseCookies("auth").auth;
  return (
    <>
      <Container fluid>
        <Container
          style={{
            textAlign: "left",
            marginBottom: "30px",
            marginTop: "30px",
          }}
        >
          <Row>
            <Col lg={5}>
              <Link to="/">
                <Brand />
              </Link>
              <p style={{ fontSize: "14px" }}>
                goodJobs is an web-based platform to rent office
                spaces across Jakarta. goodjobs aims for the
                convenience of user when searching for a suitable
                working space in Jakarta’s business district areas.
              </p>
            </Col>
            <Col lg={7}>
              <Row style={{ marginTop: "20px" }}>
                <Col lg={4}>
                  <>
                    <h6 style={{ fontWeight: "600" }}>INFORMATION</h6>
                    <dl style={{ fontSize: "14px" }}>
                      <dd>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          to="/"
                        >
                          {" "}
                          Home{" "}
                        </Link>
                      </dd>
                      <dd>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          to="/complex"
                        >
                          {" "}
                          Complex{" "}
                        </Link>
                      </dd>
                      <dd>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          to="/buildings"
                        >
                          {" "}
                          Building{" "}
                        </Link>
                      </dd>
                    </dl>
                  </>
                </Col>
                {jwt ? (
                  <>
                    <Col lg={4}>
                      <>
                        <h6 style={{ fontWeight: "600" }}>ACCOUNT</h6>

                        <dl style={{ fontSize: "14px" }}>
                          <dd>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              to="/myaccount"
                            >
                              {" "}
                              My Account{" "}
                            </Link>
                          </dd>
                        </dl>
                      </>
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <>
                        <h6 style={{ fontWeight: "600" }}>
                          CONTACT US
                        </h6>

                        <dl style={{ fontSize: "14px" }}>
                          <dd>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              to="/chat"
                            >
                              {" "}
                              Chat{" "}
                            </Link>
                          </dd>
                        </dl>
                      </>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
