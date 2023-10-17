import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="body d-flex bg-body-secondary position-relative">
      <div className="col d-none d-md-block position-absolute bottom-0 -start-50">
        <img src="/bg.png" alt="" />
      </div>
      <div className="row w-100">
        <div className="d-none d-md-block col"></div>
        <div className="col bg-info-subtle  align-items-center justify-content-center d-flex">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
