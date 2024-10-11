import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../app/apiSlice/authSlice";
import { useNavigate } from "react-router-dom";

const Authpages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("All fill are required");
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return alert("please provild valid email");
    }
    dispatch(login({ email, password }));
    navigate("/dashboard");
  };
  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-25 h-75 d-flex flex-column justify-content-center align-content-center bg-secondary p-5 mt-2 rounded-2"
      >
        <h2 className="mb-4 fw-semibold text-bg-secondary">
          Hacker_News_Clone
        </h2>
        <div className="mb-3 w-100">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 w-100">
          <label className="form-label">Password</label>
          <input
            type="email"
            className="form-control"
            placeholder="enter password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 w-100">
          <button className="form-control">Sumbit</button>
        </div>
        <p>Please login...</p>
      </form>
    </div>
  );
};
export default Authpages;
