import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import {
  Row,
  Col,
  Button,
  Image,
  Form,
  Tab,
  Tabs,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Brand from "../../components/brand/Brand";
import Swal from "sweetalert2";
import { setCookie } from "nookies";
import { BiShow, BiHide } from "react-icons/bi";

const Login = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("signin");
  const [showPassIn, setShowPassIn] = useState(false);
  const [showPassUp1, setShowPassUp1] = useState(false);
  const [showPassUp2, setShowPassUp2] = useState(false);
  const [nameUp, setNameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [password1Up, setPassword1Up] = useState("");
  const [password2Up, setPassword2Up] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState();
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPassword1, setValidPassword1] = useState(false);
  const [validPassword2, setValidPassword2] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const nameRegex = /^[a-zA-Z\s]{2,40}$/;
  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const phoneRegex = /^[0-9]{9,12}$/;

  const handleLogin = (event) => {
    event.preventDefault();
    const postLogin = async () => {
      const response = await axios({
        method: "post",
        url: "http://13.213.57.122:8080/user/login",
        headers: {},
        data: {
          email: emailIn.toLowerCase(),
          password: passwordIn,
        },
      });
      const jwtValid = jwt_decode(response.data.data.token);
      console.log(jwtValid);
      console.log("ini from default", response.status);
      console.log(emailIn, passwordIn);

      if (jwtValid.id !== 0) {
        const jwt = response.data.data.token;
        setCookie(null, "auth", jwt, {
          maxAge: 3 * 60 * 60,
          // httpOnly: true,
          // path: "/",
          // secure: process.env.SECURE_COOKIE === "true",
        });

        navigate(-1);
        Swal.fire(
          "Sign In Success!",
          "You can open wishlist and chat",
          "success"
        );
        // setEmailIn("");
        // setPasswordIn("");
        // console.log(response);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or  Password is wrong!",
        });
        setEmailIn("");
        setPasswordIn("");
        console.log(response);
      }
    };
    postLogin();
  };
  const handleSignup = (e) => {
    e.preventDefault();
    if (
      validEmail &&
      validName &&
      validPassword1 &&
      validPassword2 &&
      validPhone
    ) {
      const postRegister = async () => {
        const response = await axios({
          method: "post",
          url: "http://13.213.57.122:8080/user/register",
          headers: {},
          data: {
            name: nameUp,
            email: emailUp.toLowerCase(),
            phone: phone,
            password: password2Up,
            roles_id: 4,
          },
        });
        // const res = response.data;
        if (response.data.data.id !== 0) {
          Swal.fire("Sign up success!", "You can Sign In now!", "success");
          setEmailUp("");
          setPassword1Up("");
          setPassword2Up("");
          setNameUp("");
          setPhone("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email already registered!",
          });
          // setEmailIn("");
          // setPasswordIn("");
          // console.log(response);
        }
      };
      postRegister();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Form format is wrong!",
      });
    }
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
    if (!phoneRegex.test(e.target.value)) {
      setErrorPhone("Phone number must be number and length 12.");
      setValidPhone(false);
    } else {
      setErrorPhone("");
      setValidPhone(true);
    }
  };
  const handleChangeNameUp = (e) => {
    setNameUp(e.target.value);
    if (!nameRegex.test(e.target.value)) {
      setErrorName("Name must be a letter 2-40.");
      setValidName(false);
    } else {
      setErrorName("");
      setValidName(true);
    }
  };
  const handleChangeEmailUp = (e) => {
    setEmailUp(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setErrorEmail("Wrong email format.");
      setValidEmail(false);
    } else {
      setValidEmail(true);
      setErrorEmail("");
    }
  };
  const handleChangePassword1Up = (e) => {
    setPassword1Up(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setErrorPassword(
        "Password format must contain uppercase letters, lowercase letters, and numbers."
      );
      setValidPassword1(false);
    } else {
      setValidPassword1(true);
      setErrorPassword("");
    }
  };
  const handleChangePassword2Up = (e) => {
    setPassword2Up(e.target.value);
    if (e.target.value !== password1Up) {
      setErrorPassword2("Passwords are not the same.");
      setValidPassword2(false);
    } else {
      setValidPassword2(true);
      setErrorPassword2("");
    }
  };

  return (
    <>
      <Row>
        <Col lg={3}>
          <Image
            alt=""
            src="/images/login.png"
            height={800}
            className="d-none d-sm-block"
          />
        </Col>
        <Col lg={9}>
          {" "}
          <div style={{ textAlign: "center", padding: "45px" }}>
            <Brand />
            <br />
            {/* <h2>Sorry, You have to login first. </h2> */}
          </div>
          <Row
            className="justify-content-center"
            style={{ margin: "20px 20px 20px 20px" }}
          >
            <Col lg={4}>
              <Tabs
                // style={{ backgroundColor: "gray", color: "white" }}
                id=" controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 justify-content-center "
              >
                <Tab eventKey="signin" title="Sign In">
                  <form onSubmit={handleLogin}>
                    {/* <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3"
                    > */}
                    <Form.Control
                      size="lg"
                      className="mb-3"
                      type="email"
                      placeholder="Email"
                      value={emailIn}
                      onChange={(e) => {
                        setEmailIn(e.target.value);
                      }}
                    />
                    {/* </FloatingLabel>{" "} */}
                    <InputGroup className="mb-1">
                      {/* <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                      > */}
                      <Form.Control
                        size="lg"
                        onChange={(e) => {
                          setPasswordIn(e.target.value);
                        }}
                        type={showPassIn ? "text" : "password"}
                        placeholder="Password"
                        value={passwordIn}
                      />{" "}
                      {/* </FloatingLabel> */}
                      <Button
                        onClick={() => setShowPassIn(!showPassIn)}
                        variant="white"
                      >
                        {" "}
                        {showPassIn ? (
                          <BiShow size={25} />
                        ) : (
                          <BiHide size={25} />
                        )}
                      </Button>{" "}
                    </InputGroup>
                    <p
                      style={{
                        textAlign: "right",
                        fontSize: "14px",
                        color: "gray",
                      }}
                    >
                      Forgot password?
                    </p>
                    <Row
                      className="justify-content-center"
                      style={{ margin: "20px 10px 20px 10px" }}
                    >
                      {" "}
                      <Button
                        type="submit"
                        onSubmit={handleLogin}
                        variant="dark"
                        style={{
                          paddingLeft: "70px",
                          paddingRight: "70px",
                          alignContent: "center",
                          width: "auto !important",
                        }}
                      >
                        <div>Sign In</div>
                      </Button>{" "}
                      <Button
                        as={Link}
                        to="/"
                        variant=""
                        style={{
                          paddingLeft: "70px",
                          paddingRight: "70px",
                          alignContent: "center",
                          width: "auto !important",
                        }}
                      >
                        <div>Home</div>
                      </Button>{" "}
                    </Row>
                  </form>
                </Tab>
                {/* tab 2 */}
                <Tab eventKey="signup" title="Sign Up">
                  <form onSubmit={handleSignup}>
                    {/* <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      className="mb-3"
                    > */}
                    <div className="mb-3">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name"
                        value={nameUp}
                        onChange={handleChangeNameUp}
                      />
                      <Form.Text className="formText" style={{ color: "red" }}>
                        {errorName}
                      </Form.Text>{" "}
                    </div>
                    {/* </FloatingLabel> */}
                    {/* <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3"
                    > */}
                    <div className="mb-3">
                      <Form.Control
                        size="lg"
                        type="email"
                        placeholder="Email"
                        value={emailUp}
                        onChange={handleChangeEmailUp}
                      />
                      <Form.Text className="formText" style={{ color: "red" }}>
                        {errorEmail}
                      </Form.Text>{" "}
                    </div>
                    {/* </FloatingLabel> */}
                    {/* <FloatingLabel
                      controlId="floatingInput"
                      label="Phone number"
                      className="mb-3"
                    > */}
                    <div className="mb-3">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Phone number"
                        value={phone}
                        onChange={handleChangePhone}
                      />
                      <Form.Text className="formText" style={{ color: "red" }}>
                        {errorPhone}
                      </Form.Text>
                    </div>
                    {/* </FloatingLabel> */}
                    {/* <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                      className="mb-3"
                    > */}
                    {/* <Form.Control
                      className="mb-3"
                      type="password"
                      placeholder="Password"
                      value={password1Up}
                      onChange={handleChangePassword1Up}
                    />{" "} */}
                    <InputGroup className="mb-3">
                      {/* <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                      > */}
                      <Form.Control
                        size="lg"
                        onChange={(e) => {
                          setPassword1Up(e.target.value);
                        }}
                        type={showPassUp1 ? "text" : "password"}
                        placeholder="Password"
                        value={password1Up}
                        onChange={handleChangePassword1Up}
                      />{" "}
                      {/* </FloatingLabel> */}
                      <Button
                        onClick={() => setShowPassUp1(!showPassUp1)}
                        variant="white"
                      >
                        {" "}
                        {showPassUp1 ? (
                          <BiShow size={25} />
                        ) : (
                          <BiHide size={25} />
                        )}
                      </Button>{" "}
                      <Form.Text className="formText" style={{ color: "red" }}>
                        {errorPassword}
                      </Form.Text>
                    </InputGroup>

                    {/* </FloatingLabel> */}
                    {/* <FloatingLabel
                      controlId="floatingPassword"
                      label="Retry password"
                      className="mb-3"
                    > */}
                    <div className="mb-3">
                      <InputGroup>
                        {/* <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                      > */}
                        <Form.Control
                          size="lg"
                          onChange={(e) => {
                            setPassword2Up(e.target.value);
                          }}
                          type={showPassUp2 ? "text" : "password"}
                          placeholder="Password"
                          value={password2Up}
                          onChange={handleChangePassword2Up}
                        />{" "}
                        {/* </FloatingLabel> */}
                        <Button
                          onClick={() => setShowPassUp2(!showPassUp2)}
                          variant="white"
                        >
                          {" "}
                          {showPassUp2 ? (
                            <BiShow size={25} />
                          ) : (
                            <BiHide size={25} />
                          )}
                        </Button>{" "}
                      </InputGroup>{" "}
                      <Form.Text className="formText" style={{ color: "red" }}>
                        {errorPassword2}
                      </Form.Text>{" "}
                    </div>

                    {/* </FloatingLabel> */}
                    <Row
                      className="justify-content-center"
                      style={{ margin: "20px 10px 20px 10px" }}
                    >
                      {" "}
                      <Button
                        type="submit"
                        variant="dark"
                        style={{
                          paddingLeft: "70px",
                          paddingRight: "70px",
                          alignContent: "center",
                          width: "auto !important",
                        }}
                      >
                        <div>Sign Up</div>
                      </Button>{" "}
                      <div
                        style={{
                          marginTop: "20px",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        <p>
                          By register I agree
                          <br />
                          <tag style={{ color: "#2F80ED" }}>
                            Terms and Conditions and Privacy Policy
                          </tag>{" "}
                        </p>
                      </div>
                    </Row>
                  </form>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default Login;
