import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistratebyG from "./RegistratebyG";
import RegiByGit from "./RegiByGit";
import RegistrateFb from "./RegistrateFB";

const Ragistration = () => {
  const [errorM, setErrorM] = useState("");

  const handleSubmit = (event) => {
    setErrorM("");
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;

    if (!email) {
      setErrorM("Please enter an email*");
      return;
    }
    if (!name) {
      setErrorM("Please enter your name*");
      return;
    }
    if (!password) {
      setErrorM("Please enter an password*");
      return;
    }
    if (!/[0-9!@#$%^&*()]*/.test(password)) {
      setErrorM("Please enter an strong password*");
      return;
    }
    if (!password.length > 6) {
      setErrorM("Please enter an atleast 8 charecter password*");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        //send email varification
        varifyEmail(result.user);
        // Update user name
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((err) => {
            console.log(err.message);
          });
        toast.success(`${(email, "\n")} vrify your email address and login`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          //is email is varified please go to home
          auth.currentUser
            .reload()
            .then(() => {
              if (!auth.currentUser.emailVerified) {
                setErrorM("to varify chack your email and login");
              }
            })
            .catch((err) => {
              setErrorM(err.message);
            });
        }, 6000);
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          //is email is varified please go to home
          auth.currentUser
            .reload()
            .then(() => {
              if (auth.currentUser.emailVerified) {
                navigate("/home");
              } else {
                setErrorM("to varify chack your email and login");
              }
            })
            .catch((err) => {
              setErrorM(err.message);
            });
        } else setErrorM(err.message);
      });
  };
  // varify email function
  function varifyEmail(user) {
    sendEmailVerification(user)
      .then(() => {})
      .catch((err) => setErrorM(err.message));
  }
  const navigate = useNavigate();
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex gap-3 py-5 align-items-center justify-content-center bg-light rounded-3 flex-column w-75"
    >
      <h3 className="text-center text-capitalize fw-medium">
        Please regitrate !
      </h3>
      <input
        type="text"
        name="name"
        className="mb-2 w-75 mt-5 font-monospace text-secondary py-1 px-2 border-0 form-control fs-4"
        placeholder="write you'r name"
      />
      <input
        type="email"
        name="email"
        className="mb-2 font-monospace text-secondary w-75 py-1 px-2 border-0 form-control fs-4"
        placeholder="write you'r email"
      />

      <div className="pas w-75">
        <input
          type="password"
          name="password"
          className="mb-2 font-monospace text-secondary w-100 py-1 px-2 border-0 form-control fs-4"
          placeholder="Creat an strong password"
        />
      </div>
      <p>
        <small>{errorM}</small>
      </p>
      <button type="submit" className="btn btn-info w-75 text-light fw-medium">
        Registration
      </button>
      <button
        onClick={() => navigate("/")}
        className="btn btn-link text-black link-underline-light"
      >
        Allready have an account ? Login
      </button>
      <ToastContainer />

      {/* Social Ragistration */}

      <ul style={{ listStyle: "none" }} className="d-flex align-items-center">
        <li>
          <RegistratebyG
            varifyEmail={varifyEmail}
            setErrorM={setErrorM}
          ></RegistratebyG>
        </li>
        <li>
          <RegiByGit
            varifyEmail={varifyEmail}
            setErrorM={setErrorM}
          ></RegiByGit>
        </li>
        <li>
          <RegistrateFb
            varifyEmail={varifyEmail}
            setErrorM={setErrorM}
          ></RegistrateFb>
        </li>
      </ul>
    </form>
  );
};

export default Ragistration;
