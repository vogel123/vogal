import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Login() {
  const [password, setPassword] = useState(""); // State for the city input value
  const [isCityValid, setCityValid] = useState(true); // State to track city validation
  const axiosIntsance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.trim() === "") {
      setCityValid(false);
    } else {
      setCityValid(true);
      try {
        const response = await axiosIntsance.post(`/user/verify`, {
          password: password,
        });
        console.log("API Response:", response.data);
        sessionStorage.setItem("token", response.data.token);
        setPassword("");
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            required
            isInvalid={!isCityValid}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setCityValid(true); // Reset the validation when the input changes
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default Login;
