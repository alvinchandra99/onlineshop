import React, { Component } from "react";
import Logo from "./MainHeadComponents/Logo";
import Search from "./MainHeadComponents/Search";
import Widgets from "./MainHeadComponents/Widgets";
export default class MainHead extends Component {
  render() {
    return (
      <div className="row align-items-center">
        <Logo />
        <Search />
        <Widgets />
      </div>
    );
  }
}
