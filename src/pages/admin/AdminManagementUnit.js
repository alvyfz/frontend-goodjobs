/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import Paginations from "../../components/pagination/Paginations";
import "./Admin.css";
import NotFound from "../error/NotFound";
import NavBar from "../../components/navbar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";
import Error500 from "../../components/error/Error500";
import { AiOutlineDelete } from "react-icons/ai";
import LeftMenu from "../../components/menu/LeftMenu";
import { FiEdit } from "react-icons/fi";
import base64 from "base-64";

const AdminManagementUnit = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(
    auth ? base64.decode(auth) : null || jwtDefault,
  );
  const role_id = jwt.Role_ID;
  const [unit, setUnit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [text, settext] = useState();
  const [filtered, setFiltered] = useState([]);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  useEffect(() => {
    if (!role_id) {
      Navigate("/");
    }
    if (!role_id === 1 || !role_id === 2 || !role_id === 3) {
      <NotFound />;
    }
    setIsLoading(true);
    var option = {
      method: "GET",
      url: "http://13.213.57.122:8080/units",
    };

    axios
      .request(option)
      .then(function (response) {
        setUnit(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (text) {
      var filter = unit?.filter((v) => {
        if (
          v?.name.toLowerCase().includes(text?.toLowerCase()) ||
          String(v?.price).includes(text?.toLowerCase()) ||
          String(v?.id).includes(text?.toLowerCase()) ||
          String(v?.building_id).includes(text?.toLowerCase()) ||
          String(v?.unitsize).includes(text?.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
      setFiltered(filter);
    } else {
      setFiltered(unit);
    }
  }, [text, unit]);
  if (!role_id) {
    Navigate("/");
  }
  if (!role_id === 1) {
    <NotFound />;
  }
  if (isError) {
    <Error500 />;
  }
  const handleEdit = (v) => {
    Swal.fire({
      title: `Are you sure to edit unit ${v.name} ?`,
      showCancelButton: true,
      cancelButtonColor: "#DDDDDD",
      confirmButtonColor: "black",
      confirmButtonText: "Sure",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Navigate(`/unit/edit?key=${v.id}`);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCards = filtered?.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = (v) => {
    Swal.fire({
      title: `Do you want to delete unit ${v.name}?`,
      showCancelButton: true,
      cancelButtonColor: "#DDDDDD",
      confirmButtonColor: "#A9333A",
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var options = {
          method: "DELETE",
          url: `http://13.213.57.122:8080/unit/${v.id}`,
        };
        axios
          .request(options)
          .then(function (response) {
            Swal.fire(
              `Delete unit ${v.name} success!`,
              "",
              "success",
            );
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

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  return (
    <>
      {" "}
      <NavBar />
      <Container fluid className="conheader">
        <div className="textheader">
          <h1 style={{ fontWeight: "700" }}>MANAGEMENT UNIT</h1>
          <h3>
            <Link className="spanhome" to="/">
              <span>HOME / </span>
            </Link>{" "}
            <span className="spancon">MANAGEMENT UNIT</span>
          </h3>
        </div>
      </Container>
      <Container fluid className="complexcon conmanUser">
        <Row>
          <Col lg={1}></Col>
          <Col lg={10}>
            <Row>
              {" "}
              <Col lg={4}>
                <LeftMenu />
              </Col>
              <Col lg={8}>
                {" "}
                <Container className="con-fitur height400px">
                  {" "}
                  <Row className="row-fitur listrowacc ">
                    <Form onSubmit={""}>
                      <Row>
                        <Form.Control
                          value={text}
                          type="text"
                          placeholder="Seach id, name, complex id , or complex name"
                          variant="light"
                          onChange={(e) => settext(e.target.value)}
                          required
                          className="inputSearch"
                        />
                      </Row>{" "}
                    </Form>
                    <br />
                    {isLoading ? (
                      <div id="spinner">
                        <Spinner animation="border" />
                      </div>
                    ) : (
                      <>
                        {" "}
                        {currentCards.length !== 0 ? (
                          <>
                            <div className="tablesUser">
                              <Table responsive bordered size="sm">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>BUILDING ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>SIZE</th>
                                    {role_id === 3 ? null : (
                                      <th>ACT</th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentCards?.map((v) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>{v?.id}</td>
                                          <td>{v?.building_id}</td>
                                          <td>{v?.name}</td>
                                          <td>
                                            {formatRupiah(v?.price)}
                                          </td>
                                          <td>{v?.unitsize} m??</td>

                                          {role_id === 3 ? null : (
                                            <td className="act-icon">
                                              {" "}
                                              <Button
                                                variant="sada"
                                                className="buttondelete"
                                                onClick={() =>
                                                  handleEdit(v)
                                                }
                                              >
                                                <FiEdit
                                                  size={19}
                                                  color="black"
                                                />{" "}
                                              </Button>
                                              <Button
                                                variant="sada"
                                                className="buttondelete"
                                                onClick={() =>
                                                  handleDelete(v)
                                                }
                                              >
                                                <AiOutlineDelete
                                                  size={22}
                                                  color="red"
                                                />
                                              </Button>
                                            </td>
                                          )}
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </Table>
                            </div>
                            <Row>
                              <Col md={4}></Col>
                              <Col md={4}>
                                <Paginations
                                  className="paginationStyle"
                                  totalCards={filtered?.length}
                                  cardsPerPage={cardsPerPage}
                                  paginate={paginate}
                                  active={currentPage}
                                />
                                <Col md={4}></Col>
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <>
                            <h3 className="userNotFound">
                              Unit not found :(
                            </h3>
                          </>
                        )}
                      </>
                    )}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default AdminManagementUnit;
