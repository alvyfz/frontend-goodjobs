import "./CardBuilding.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";

export default function CardUnit({
  img,
  price,
  name,
  id,
  role_id,
  buildingName,
}) {
  const Navigate = useNavigate();

  const formatRupiah = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  const handleDelete = () => {
    Swal.fire({
      title: `Do you want to delete unit ${name} ?`,
      showCancelButton: true,
      cancelButtonColor: "#DDDDDD",
      confirmButtonColor: "#A9333A",
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var options = {
          method: "DELETE",
          url: `http://13.213.57.122:8080/unit/${id}`,
        };
        axios
          .request(options)
          .then(function (response) {
            Swal.fire(`Delete unit ${name} success!`, "", "success");
            window.location.reload();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleEdit = () => {
    Swal.fire({
      title: `Are you sure to edit unit ${name} ?`,
      showCancelButton: true,
      cancelButtonColor: "#DDDDDD",
      confirmButtonColor: "black",
      confirmButtonText: "Sure",
    }).then((result) => {
      if (result.isConfirmed) {
        Navigate(`/unit/edit?key=${id}`);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleEnquired = () => {
    if (!role_id) {
      Swal.fire({
        title: `Sorry, you have to login first !`,
        showCancelButton: true,
        cancelButtonColor: "#DDDDDD",
        confirmButtonColor: "black",
        confirmButtonText: "Login?",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate(`/login`);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Navigate(`/chat?key=${id}&n=${name}&b=${buildingName}`);
    }
  };

  return (
    <>
      <Card
        className="card"
        style={{ width: "18rem", padding: "0", margin: "0" }}
      >
        <Card.Img
          variant="top"
          src={img}
          style={{
            padding: "0",
            objectFit: "cover",
            width: "100%",
            height: "200px",
          }}
        />
        {role_id === 1 || role_id === 2 ? (
          <>
            <Card.Body style={{ color: "black" }}>
              <Row>
                <Col lg={8}>
                  <Card.Title
                    style={{
                      fontWeight: "600",
                      fontSize: "24px",
                      margin: "0",
                    }}
                  >
                    {name}
                  </Card.Title>

                  <Card.Text style={{ fontSize: "18px" }}>
                    {" "}
                    <span style={{ fontWeight: "550" }}>
                      {formatRupiah()}
                    </span>{" "}
                    <span style={{ fontSize: "16px" }}>
                      (per sqm/month)
                    </span>
                  </Card.Text>
                </Col>
                <Col lg={4}>
                  <Row>
                    <Col>
                      <Button
                        style={{ padding: "0", paddingLeft: "5px" }}
                        variant="fa"
                        type="button"
                        onClick={handleEdit}
                      >
                        {" "}
                        <FiEdit size={19} />{" "}
                      </Button>

                      <Button
                        type="button"
                        onClick={handleDelete}
                        variant="ds"
                        style={{ padding: "0", marginLeft: "5px" }}
                      >
                        <AiOutlineDelete size={23} color="red" />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
            <div style={{ padding: "0" }}>
              <Row
                className="justify-content-center"
                style={{ padding: "20px 0px 20px 0px" }}
              >
                <Button
                  as={Link}
                  to={`/unit/detail?key=${id}&b=${buildingName}`}
                  variant="dark"
                  style={{
                    width: "80%",
                    align: "center",
                    fontSize: "11px",
                  }}
                >
                  VIEW DETAIL
                </Button>{" "}
              </Row>
            </div>
          </>
        ) : (
          <>
            <Card.Body style={{ color: "black" }}>
              <Card.Title
                style={{
                  fontWeight: "600",
                  fontSize: "24px",
                  margin: "0",
                }}
              >
                {name}
              </Card.Title>

              <Card.Text style={{ fontSize: "18px" }}>
                {" "}
                <span style={{ fontWeight: "550" }}>
                  {formatRupiah()}
                </span>{" "}
                <span style={{ fontSize: "16px" }}>
                  (per sqm/month)
                </span>
              </Card.Text>
            </Card.Body>
            <div style={{ padding: "0", backgroundColor: "#E5E5E5" }}>
              <Row
                className="justify-content-center"
                style={{ padding: "20px 0px 20px 0px" }}
              >
                {" "}
                <Button
                  as="button"
                  onClick={handleEnquired}
                  variant="dark"
                  style={{
                    width: "80%",
                    textAlign: "center",
                    fontSize: "11px",
                  }}
                >
                  ENQUIRE
                </Button>{" "}
                <Button
                  as={Link}
                  to={`/unit/detail?key=${id}&b=${buildingName}`}
                  variant="light"
                  style={{
                    width: "80%",
                    align: "center",
                    fontSize: "11px",
                  }}
                >
                  VIEW DETAIL
                </Button>{" "}
              </Row>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
