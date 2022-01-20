import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { parseCookies, destroyCookie } from "nookies";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import base64 from "base-64";

export default function LeftMenu() {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(
    auth ? base64.decode(auth) : null || jwtDefault,
  );
  const role_id = jwt.Role_ID;
  const handleLogout = () => {
    destroyCookie(null, "auth");
    Swal.fire({
      icon: "success",
      title: "Logout success!",
      text: "",
      confirmButtonColor: "black",
    });
    Navigate("/");
    window.location.reload();
  };
  return (
    <>
      <Container className="con-fitur">
        <Row className="row-fitur listrowacc">
          <p className="nameLeft">{jwt?.Name}</p>
          <Row className="barLeft" as={Link} to="/chat">
            <p>Chat</p>
          </Row>{" "}
          <Row className="barLeft" as={Link} to="/myaccount">
            <p>My account</p>
          </Row>{" "}
          {role_id === 1 ? (
            <>
              {" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/user"
              >
                <p>Management user</p>
              </Row>{" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/complex"
              >
                <p>Management complex</p>
              </Row>{" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/building"
              >
                <p>Management building</p>
              </Row>{" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/unit"
              >
                <p>Management unit</p>
              </Row>{" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/review"
              >
                <p>Management review</p>
              </Row>
              <Row
                className="barLeft"
                as={Link}
                to="/management/user/edit"
              >
                <p>Change user</p>
              </Row>{" "}
            </>
          ) : null}{" "}
          {role_id === 2 || role_id === 3 ? (
            <>
              {" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/complex"
              >
                <p>Management complex</p>
              </Row>{" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/building"
              >
                <p>Management building</p>
              </Row>{" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/unit"
              >
                <p>Management unit</p>
              </Row>{" "}
              <Row
                className="barLeft"
                as={Link}
                to="/management/review"
              >
                <p>Management review</p>
              </Row>
            </>
          ) : null}
          <Row
            className="barLeftLog"
            as="button"
            onClick={handleLogout}
          >
            <p>Log out</p>
          </Row>
        </Row>
      </Container>
    </>
  );
}
