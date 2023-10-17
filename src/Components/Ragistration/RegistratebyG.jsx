import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegistratebyG = ({ varifyEmail, setErrorM }) => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSignG = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        varifyEmail(result.user);
        toast.success(`vrify your email address and login`, {
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
          navigate("/", { replace: true });
        }, 6000);
      })
      .catch((err) => {
        setErrorM(err.message);
      });
  };
  return (
    <>
      <button
        onClick={handleSignG}
        className="btn hover-overlay ripple shadow-1-strong"
        style={{ width: "80px", outline: "none" }}
        data-mdb-ripple-color="light"
      >
        <img src="/search.png" width={"100%"} alt="" />
      </button>
      <ToastContainer />
    </>
  );
};

export default RegistratebyG;
