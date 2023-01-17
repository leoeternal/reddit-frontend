import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userActions } from "../../store/UserSlice";
import "./login.css";
import { loginUser } from "../../store/UserAction";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCreated, userLoggedIn, userButtonLoader, userAuth } = useSelector(
    (state) => state.user
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userCreated) {
      toast.success("User registered", {
        toastId: 1,
      });
    }
    dispatch(userActions.updateUserCreatedValue());
  }, [userCreated, dispatch]);

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    if (userAuth) {
      toast.error("Unauthorized. Please log in again");
      dispatch(userActions.updateUserAuthValue());
    }
  }, [userAuth, dispatch]);

  const loginHandler = () => {
    if (username === "" || password === "") {
      toast.error("Fill all the fields");
    } else {
      dispatch(userActions.updateUserButtonLoaderValue());
      dispatch(
        loginUser({
          username,
          password,
        })
      );
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="login-wrapper">
        <div className="login-left"></div>
        <div className="login-right">
          <div className="content">
            <h3 id="title">Log in</h3>
            <p id="sub-heading1">
              By continuing, you agree to our User Agreement and Privacy Policy.
            </p>
            {/* <Button
              sx={{ margin: "40px 0 20px 0", width: "100%" }}
              variant="outlined"
            >
              Continue with Google
            </Button>
            <p id="or">OR</p> */}

            <TextField
              fullWidth
              id="filled-basic"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                border: "1px solid #dbdbdb",
                borderRadius: "5px",
                backgroundColor: "white",
                margin: "5px 0px",
                marginTop: "35px",
              }}
              autoComplete="off"
            />

            <TextField
              type="password"
              fullWidth
              id="filled-basic"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                border: "1px solid #dbdbdb",
                borderRadius: "5px",
                backgroundColor: "white",
                margin: "5px 0px",
              }}
              autoComplete="off"
            />

            <div>
              {userButtonLoader ? (
                <Button
                  sx={{ marginTop: "10px" }}
                  fullWidth
                  color="error"
                  variant="contained"
                  disabled
                >
                  LOG IN
                </Button>
              ) : (
                <Button
                  onClick={loginHandler}
                  sx={{ marginTop: "10px" }}
                  fullWidth
                  color="error"
                  variant="contained"
                >
                  LOG IN
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
