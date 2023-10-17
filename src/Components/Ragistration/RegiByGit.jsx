import React from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import auth from "../../firebase.config";

const RegiByGit = ({ setErrorM, varifyEmail }) => {
  const navigate = useNavigate();
  const provider = new GithubAuthProvider();

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
        <img src="/github.png" width={"100%"} alt="" />
      </button>
      <ToastContainer />
    </>
  );
};

export default RegiByGit;
