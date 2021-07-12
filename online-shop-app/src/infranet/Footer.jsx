import React from "react";
import { useLocation } from "react-router";
import FooterMenu from "../component/FooterMenu";

export default function Footer() {
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
      <footer className="section-footer bg-secondary text-white">
        <div className="container">
          <section className="footer-top  padding-y-lg">
            <div className="row m-auto">
              <FooterMenu />
            </div>
          </section>
          <section className="footer-bottom text-center">
            <p className="text-muted">
              &copy; 2021 Team D | All rights reserved
            </p>
          </section>
        </div>
      </footer>
    );
  }
}
