import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { registerUser } from "../../store/UserAction";
import { userActions } from "../../store/UserSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCreated, userButtonLoader, userLoggedIn } = useSelector(
    (state) => state.user
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (userCreated) {
      setUsername("");
      setEmail("");
      setPassword("");
      setGender("");
      navigate("/login");
    }
  }, [userCreated, navigate]);

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  const signupHandler = () => {
    if (username === "" || email === "" || password === "") {
      toast.error("Please fill all fields");
    } else {
      dispatch(userActions.updateUserButtonLoaderValue());
      dispatch(
        registerUser({
          username,
          email,
          password,
          gender,
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
      <div className="register-wrapper">
        <div className="left"></div>
        <div className="right">
          <div className="content">
            <h3 id="title">Sign up</h3>
            <p id="sub-heading1">
              By continuing, you are setting up a Reddit account and agree to
              our User Agreement and Privacy Policy.
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
              fullWidth
              id="filled-basic"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoSave="off"
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
            <FormControl sx={{ margin: "15px 0px" }}>
              <FormLabel
                sx={{ fontSize: "16px" }}
                id="demo-row-radio-buttons-group-label"
              >
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <div>
              {userButtonLoader ? (
                <Button fullWidth color="error" variant="contained" disabled>
                  SIGN UP
                </Button>
              ) : (
                <Button
                  onClick={signupHandler}
                  fullWidth
                  color="error"
                  variant="contained"
                >
                  SIGN UP
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
