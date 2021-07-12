import React, { Component } from "react";
import Service from "../../service/Service";
import CurrencyFormat from "react-currency-format";

export default class ProductCard extends Component {
  handleDel = () => {
    Service.deleteData(`product/delete/${this.props.data.id}`);
  };
  handleClick() {
    this.props.parentCallback(this.props.data);
  }
  render() {
    return (
      <>
        <td>
          <figure className="itemside  sm-1">
            <div className="aside">
              <img src={this.props.data.imgurl} alt="img" className="border img-sm" />
            </div>
          </figure>
        </td>

        <td className="col-sm-6" style={{ textAlign: "left" }}>
          <h1 style={{ fontSize: "  1em" }}>{this.props.data.name}</h1>
          <CurrencyFormat
            value={this.props.data.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"IDR "}
            renderText={(value) => <strong>Price: {value}</strong>}
          />
        </td>
        <td>
          <button
            type="button"
            id="update"
            className="btn btn-default"
            data-toggle="modal"
            data-target="#modal-default"
            onClick={() => this.handleClick()}
          >
            Update
          </button>
        </td>
        <td>
          <button
            type="submit"
            style={{ backgroundColor: "red" }}
            className="btn btn-primary btn-block"
            onClick={() => this.handleDel()}
          >
            Delete
          </button>
        </td>
      </>
    );
  }
}
