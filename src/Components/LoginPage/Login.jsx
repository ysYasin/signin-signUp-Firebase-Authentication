import React, { useRef, useState } from "react";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const emailRef = useRef();
  // providers
  const fbProvider = new FacebookAuthProvider();
  const GoogleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const user = auth.currentUser;

  const handleLogIn = (event) => {
    setError("");
    event.preventDefault();
    user?.reload().then(() => {
      if (!user.emailVerified) {
        setError(
          "user Is not varifide , please Create an account or chack email to varify"
        );
        return;
      }
    });
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("login Successfull");
        navigate("/home");
      })
      .catch((err) => {
        setError("Somethis is went wrong Please fix");
        console.log(err);
      });
  };

  // hangle forgot password recovery
  function handleForgotPassword(event) {
    setError("");
    event.preventDefault();
    const email = emailRef.current.value;
    if (!email) {
      setError("Please enter your Email");
      return;
    }
    // send reset link
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info(`Chack your email to re-set password`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  // login by socials functions
  const handleLogninWithG = (e) => {
    e.preventDefault();
    setError("");
    signInWithRedirect(auth, GoogleProvider)
      .then(() => {
        toast.success(`Login success`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/home");
        console.log("login successfull");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleLogninWithFb = (e) => {
    e.preventDefault();
    setError("");
    signInWithRedirect(auth, fbProvider)
      .then(() => {
        toast.success(`Login success`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/home");
        console.log("login successfull");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleLogninWithGit = (e) => {
    e.preventDefault();
    setError("");
    signInWithRedirect(auth, gitProvider)
      .then(() => {
        toast.success(`Login success`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/home");
        console.log("login successfull");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <form
      onSubmit={handleLogIn}
      className="d-flex gap-3 py-5 align-items-center justify-content-center bg-light rounded-3 flex-column w-75"
    >
      <input
        type="email"
        ref={emailRef}
        name="email"
        className="mb-2 font-monospace text-secondary w-75 py-1 px-2 border-0 form-control fs-4"
        placeholder="write you'r email"
      />

      <div className="pas w-75">
        <input
          type="password"
          name="password"
          className="mb-2 font-monospace text-secondary w-100 py-1 px-2 border-0 form-control fs-4"
          placeholder="write you'r email"
        />
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <input type="checkbox" name="remamber" className="me-2" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <small>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="d-inline-block btn btn-link link-underline-light"
            >
              forgot password? reset.
            </button>
          </small>
        </div>
      </div>
      <p>
        <small>{error}</small>
      </p>
      <button type="submit" className="btn btn-info w-75 text-light fw-medium">
        login
      </button>
      <button
        onClick={() => navigate("/registation")}
        className="btn btn-link text-black link-underline-light"
      >
        Create an account ?
      </button>

      {/* // login buttons by social  */}
      <ul style={{ listStyle: "none" }} className="d-flex align-items-center">
        <li>
          <button
            onClick={handleLogninWithG}
            className="btn hover-overlay ripple shadow-1-strong"
            style={{ width: "80px", outline: "none" }}
            data-mdb-ripple-color="light"
          >
            <img src="/search.png" width={"100%"} alt="" />
          </button>
        </li>
        <li>
          <button
            onClick={handleLogninWithFb}
            className="btn hover-overlay ripple shadow-1-strong"
            style={{ width: "80px", outline: "none" }}
            data-mdb-ripple-color="light"
          >
            <img src="/facebook.png" width={"100%"} alt="" />
          </button>
        </li>
        <li>
          <button
            onClick={handleLogninWithGit}
            className="btn hover-overlay ripple shadow-1-strong"
            style={{ width: "80px", outline: "none" }}
            data-mdb-ripple-color="light"
          >
            <img src="/github.png" width={"100%"} alt="" />
          </button>
        </li>
      </ul>

      <ToastContainer />
    </form>
  );
};

export default Login;
