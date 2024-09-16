import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { isStrongPassword, required } from "../../utils/validators/Validators";
import { showToastError, showToastSuccess } from "../../utils/toast/Toast"; 
import { login } from "../../services/authServices";
import { getCustomerDetails } from "../../services/customerServices";

const Login = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("logginf...")

    const usernameError = required(username);
    if (usernameError) {
      showToastError(usernameError);
      return;
    }

    const passwordError = isStrongPassword(password);
    if (passwordError) {
      showToastError(passwordError);
      return;
    }

    try {

      const response = await login(username, password);
      const token = response.headers["authorization"];
      if (token) {
        localStorage.setItem("authToken", token);
      }

      const role = response.data.role;

      if (role === "ROLE_ADMIN") {
        localStorage.setItem("role", "admin");
        setRole("admin");
        navigate("/admin-dashboard");
      } else if (role === "ROLE_EMPLOYEE") {
        localStorage.setItem("role", "employee");
        setRole("employee");
        navigate("/employee-dashboard");
      } else if (role === "ROLE_AGENT") {
        localStorage.setItem("role", "agent");
        setRole("agent");
        navigate("/agent-dashboard");
      } else if (role === "ROLE_CUSTOMER") {
        localStorage.setItem("role", "customer");
        setRole("customer");

        const customerResponse = await getCustomerDetails();
        const customerId = customerResponse.userId;
        localStorage.setItem("firstName", customerResponse.firstName);
        localStorage.setItem("lastName", customerResponse.lastName);
        navigate(`/customer-dashboard/${customerId}`);
      }

      showToastSuccess("Login successful!");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
      showToastError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="Enter username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </Form.Group>
         <div className="center">
         <Button variant="primary" type="submit" className="login-button">
            Login
          </Button>
         </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
