import React from "react";
import MainHead from "../component/HeaderComponents/MainHead";
import SubHead from "../component/HeaderComponents/SubHead";
import { useLocation } from "react-router-dom";
export default function Header() {
  let location = useLocation();
  if (
    location.pathname.includes("/admin") ||
    location.pathname.includes("/sign") ||
    location.pathname.includes("/roomlist") ||
    location.pathname.includes("/chatroom")
  ) {
    return null;
  } else {
    return (
      <header className="section-header">
        <section className="header-main border-bottom">
          <div className="container">
            <MainHead />
            <SubHead />
          </div>
        </section>
      </header>
    );
  }
}
