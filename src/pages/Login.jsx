import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await dispatch(login(email, password));
    if (ok) navigate("/students");
    if (ok) navigate("/dashboard");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Sign In</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="form-control mb-3" type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <small className="text-muted mt-3">Demo: admin@gmail.com / admin123</small>
      </div>
    </div>
  );
};

export default Login;