import axios from "axios";
import { useState, useEffect } from "react";

const Login = () => {
  const [user, setuser] = useState();
  useEffect(() => {
    var options = {
      method: "GET",
      url: "http://13.213.57.122:8080/user/5",
    };

    axios
      .request(options)
      .then(function (response) {
        setuser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log(user);

  return <></>;
};
export default Login;
