import Navbar from "../components/Navbar/Navbar";
import Form from "../components/Form/Form";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/authStore";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/login/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      login(data.token);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      navigate("/register");
    }
  };
  return (
    <>
      <Form
        type="Login"
        onSubmit={onSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </>
  );
};

export default Login;
