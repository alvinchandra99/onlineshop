import { Component } from "react";
import Service from "../../service/Service";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";
import ProductPagination from "../../infranet/product/ProductPagination";
export default class ProductData extends Component {
  state = {
    products: [],
    pagination: {},
    currentPages: 0,
    sortby: "",
    listKey: 0,
    data: {},
    modalState: false,
    target: "",
  };
  handleCallback = (data) => {
    this.setState({ data: data });
    this.setState({ modalState: true });
  };

  handleCallbackPagination = (pageChild) => {
    this.state.currentPages = pageChild - 1;
    this.getProductData();
  };
  handleClick = (e) => {
    if ((e.target.name = "new")) {
      this.setState({
        data: {
          id: "",
          name: "",
          category: 1,
          stock: 0,
          price: 0,
          target: "new",
        },
      });
    }
    if (this.state.data.description === null) {
      this.setState({
        data: {
          description: "",
        },
      });
    }
    this.setState({ modalState: true });
  };
  componentDidMount() {
    this.getProductData();
  }
  handleModal = (modalState) => {
    this.setState({ modalState: modalState });
    this.setState({ id: "" });
  };

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
      <>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div
                className="card-header"
                style={{ backgroundColor: "#ff6a00" }}
              >
                <div className="row">
                  <div className="col-sm-10">
                    <h3 className="card-title" style={{ marginTop: "2vh" }}>
                      Product List
                    </h3>
                  </div>
                  <div className="col-sm-2">
                    <button
                      type="button"
                      className="btn btn-default"
                      name="new"
                      id="new"
                      data-toggle="modal"
                      data-target="#modal-default"
                      onClick={(e) => this.handleClick(e)}
                    >
                      <i className="fa fa-plus-square" />
                      New Item
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product image</th>
                      <th scope="col">Product info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((product) => {
                      return (
                        <tr>
                          <ProductCard
                            data={product}
                            parentCallback={(id) => this.handleCallback(id)}
                          />
                        </tr>
                      );
                    })}

                    {this.state.modalState && (
                      <AddProductForm
                        type={this.state.target}
                        data={this.state.data}
                        handleModal={(modalState) =>
                          this.handleModal(modalState)
                        }
                      />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <ProductPagination
              pagination={this.state.pagination}
              parentCallback={this.handleCallbackPagination}
            />
          </div>
        </div>
      </>
    );
  }
}
