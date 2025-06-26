import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        contraseña,
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/inicio"; // Alternativa sencilla para redirección
    } catch (error) {
      alert("Error en login");
    }
  };

  return (
    <div className="login">
      <div className="imagen-login">
        <img src="./imagenes/escuelaii.jpg" alt="Imagen en login"></img>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 h-100">
        <h3 className="signin-text"> Login al Sistema</h3>
        <Form className="d-flex flex-column formulario-login gap-4">
          <div className="form-group gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-group gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="contraseña"
              className="form-control"
              onChange={(e) => setContraseña(e.target.value)}
            ></input>
          </div>
          <Button className="btn" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
