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
import { BiDetail } from "react-icons/bi";
const AdminManagementBuilding = () => {
  const Navigate = useNavigate();
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(auth || jwtDefault);
  const role_id = jwt.Role_ID;
  const [building, setBuilding] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [text, settext] = useState();
  const [filtered, setFiltered] = useState([]);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    var option = {
      method: "GET",
      url: "http://13.213.57.122:8080/buildings",
    };

    axios
      .request(option)
      .then(function (response) {
        setBuilding(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (text) {
      var filter = building?.filter((v) => {
        if (
          v?.description.toLowerCase().includes(text?.toLowerCase()) ||
          String(v?.rating).includes(text?.toLowerCase()) ||
          String(v?.user_id).includes(text?.toLowerCase()) ||
          String(v?.building_id).includes(text?.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
      setFiltered(filter);
    } else {
      setFiltered(building);
    }
  }, [text, building]);
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
      title: `Are you sure to edit building ${v.name} ?`,
      showCancelButton: true,
      cancelButtonColor: "#DDDDDD",
      confirmButtonColor: "black",
      confirmButtonText: "Sure",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Navigate(`/building/edit?key=${v.id}`);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCards = filtered?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: `Do you want to delete this review ?`,
      showCancelButton: true,
      cancelButtonColor: "#DDDDDD",
      confirmButtonColor: "#A9333A",
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var options = {
          method: "DELETE",
          url: `http://13.213.57.122:8080/review/${id}`,
        };
        axios
          .request(options)
          .then(function (response) {
            Swal.fire(`Delete review success!`, "", "success");
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
  const handleDetail = (id) => {
    Navigate(`/building/detail?key=${id}`);
  };
  return (
    <>
      {" "}
      <NavBar />
      <Container fluid className="conheader">
        <div className="textheader">
          <h1 style={{ fontWeight: "700" }}>MANAGEMENT REVIEW</h1>
          <h3>
            <Link className="spanhome" to="/">
              <span>HOME / </span>
            </Link>{" "}
            <span className="spancon">MANAGEMENT REVIEW</span>
          </h3>
        </div>
      </Container>
      {isLoading ? (
        <div id="spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Container fluid className="complexcon conmanUser">
            <Row>
              <Col lg={2}></Col>
              <Col lg={8}>
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
                            {/* <InputGroup> */}
                            <Form.Control
                              value={text}
                              type="text"
                              placeholder="Seach building id, user id , rating or description"
                              variant="light"
                              onChange={(e) => settext(e.target.value)}
                              required
                              className="inputSearch"
                            />
                            {/* <Button
                                variant="dark"
                                type="submit"
                                className="buttonSearch"
                              >
                                <BiSearch size={20} />
                              </Button>{" "}
                            </InputGroup> */}
                          </Row>{" "}
                        </Form>
                        <br />
                        {currentCards.length !== 0 ? (
                          <>
                            <div className="tablesUser">
                              <Table responsive striped bordered size="sm">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>COMPLEX ID</th>
                                    <th>COMPLEX</th>
                                    {/* <th>DESCRIPTION</th> */}
                                    <th>ACT</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentCards?.map((v) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>{v?.id}</td>
                                          <td>{v?.name}</td>
                                          <td>{v?.complex_id}</td>
                                          <td>{v?.complex.name}</td>
                                          {/* <td>{v?.description}</td> */}
                                          <td className="act-icon">
                                            {" "}
                                            <Button
                                              variant="sada"
                                              className="buttondelete"
                                              onClick={() => handleDetail(v.id)}
                                            >
                                              <BiDetail
                                                size={19}
                                                color="black"
                                              />{" "}
                                            </Button>
                                            <Button
                                              variant="sada"
                                              className="buttondelete"
                                              onClick={() => handleEdit(v)}
                                            >
                                              <FiEdit size={19} color="black" />{" "}
                                            </Button>
                                            <Button
                                              variant="sada"
                                              className="buttondelete"
                                              onClick={() => handleDelete(v.id)}
                                            >
                                              <AiOutlineDelete
                                                size={22}
                                                color="red"
                                              />
                                            </Button>
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </Table>
                            </div>
                            <Row className="justify-content-center">
                              <Col md={1}>
                                <Paginations
                                  className="paginationStyle"
                                  totalCards={filtered?.length}
                                  cardsPerPage={cardsPerPage}
                                  paginate={paginate}
                                  active={currentPage}
                                />
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <>
                            <h3 className="userNotFound">
                              Review not found :(
                            </h3>
                          </>
                        )}
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};
export default AdminManagementBuilding;
