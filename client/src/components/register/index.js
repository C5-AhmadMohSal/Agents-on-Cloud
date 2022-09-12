import "./style.css";
import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const AddNewUser = async () => {
    try {
      const result = await axios.post("http://localhost:5000/register", {
        firstName,
        lastName,
        email,
        password,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage("The user has been created successfully");
        navigate("/Login");
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };
  return (
    <>
      <div className="center">
        <>
          <h1>Register</h1>
          <center>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span>First Name</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                onChange={(e) => setLastName(e.target.value)}
              />
              <span>last Name</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </div>
            <div className="inputbox">
              <input
                type="password"
                required="required"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>password</span>
            </div>
            <button
              onClick={() => {
                AddNewUser();
              }}
            >
              Register
            </button>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </center>
        </>
      </div>
    </>
  );
};

export default Register;