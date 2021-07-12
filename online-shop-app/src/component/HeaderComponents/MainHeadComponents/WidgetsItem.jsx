import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class WidgetsItem extends Component {
  render() {
    return (
      <div className="widget-header mr-3">
        <Link to={this.props.to} className="widget-view">
          <div className="icon-area">
            <i className={this.props.icon}></i>
            <span className={this.props.className}>{this.props.notify}</span>
          </div>
          <small className="text">{this.props.text}</small>
        </Link>
      </div>
    );
  }
}
