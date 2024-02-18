import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const Login = () => {
  const notify = () => toast("Wow so easy!");

  const navigate = useNavigate();
  const dispatch = useDispatch(); // add the useDispatch hook to access the store dispatch function
  const isLogin = useSelector((state) => state.auth.isLogin); // get the isLogin state from the Redux store
  //state
  const [inputs, setInputes] = useState({
    email: "",
    password: "",
  });
  const [responseStatusMessage, setResponseStatusMessage] = useState("");

  const handleChange = (e) => {
    setInputes((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1", inputs);

    try {
      const { data } = await axios.post(
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/user/login`
            : `${process.env.REACT_APP_PROD_URL}/user/login`
        }`,
        // "http://localhost:8000/api/user/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      console.log("RESPONSE   12123", data);
      // Put the object into storage
      if (data.data) {
        setResponseStatusMessage("Logged In");
        localStorage.setItem("token", data.data); // store the token in the local storage
        dispatch(authActions.login(data.data)); // dispatch the login action with the token
        navigate("/");
        window.location.reload();
      } else {
        setResponseStatusMessage(data.message);
      }
    } catch (error) {
      setResponseStatusMessage(error);
      console.log("ERROR", error);
    }
  };

  return (
    <>
      {responseStatusMessage ? (
        <Alert severity="error">{responseStatusMessage} — check it out!</Alert>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            sx={{ textTransform: "uppercase" }}
            variant="h4"
            padding={3}
            textAlign="center"
          >
             <img
              src="./social.png"
              alt="icon"
            />
            Login
          </Typography>

          <TextField
            placeholder="emal"
            name="email"
            type={"email"}
            sx={{ marginTop: 3 }}
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="password"
            name="password"
            type={"password"}
            sx={{ marginTop: 3 }}
            value={inputs.password}
            onChange={handleChange}
            required
          />

          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            type="submit"
            color="primary"
            onClick={() => navigate("/register")}
          >
            Not Registered ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
