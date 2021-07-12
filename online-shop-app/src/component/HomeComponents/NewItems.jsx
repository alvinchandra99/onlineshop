import React, { Component } from "react";
import ItemCardSm from "./ItemCardSm";
import Service from "../../service/Service";
export default class NewItems extends Component {
  state = {
    products: [],
    pagination: {},
    currentPages: 0,
    sortby: "",
    listKey: 0,
  };

  componentDidMount() {
    this.getProductData();
  }

  getProductData() {
    let sortbyUrl = "";
    if (this.state.sortby !== "") {
      sortbyUrl = "/" + this.state.sortby + "/asc";
    }
    Service.getData(`products/3/${this.state.currentPages}${sortbyUrl}`).then(
      (result) => {
        this.setState({
          products: result.data.content,
          pagination: result.data,
        });
      }
    );
  }
  render() {
    return (
      <section className="padding-bottom">
        <header className="section-heading mb-4">
          <h3 className="title-section">New Items</h3>
        </header>
        <div className="row row-sm">
          {this.state.products.map((product) => {
            return (
              <>
                <ItemCardSm data={product} />
              </>
            );
          })}
        </div>
      </section>
    );
  }
}
