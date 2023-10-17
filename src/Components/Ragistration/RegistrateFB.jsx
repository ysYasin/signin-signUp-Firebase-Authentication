import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";

const RegistrateFb = ({ setErrorM, varifyEmail }) => {
  const navigate = useNavigate();
  const provider = new FacebookAuthProvider();

  const handleSignGit = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        varifyEmail(result.user);
        toast.success(`successfully Maked Ragistration please login`, {
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
        onClick={handleSignGit}
        className="btn hover-overlay ripple shadow-1-strong"
        style={{ width: "80px", outline: "none" }}
        data-mdb-ripple-color="light"
      >
        <img src="/facebook.png" width={"100%"} alt="" />
      </button>
      <ToastContainer />
    </>
  );
};

export default RegistrateFb;
