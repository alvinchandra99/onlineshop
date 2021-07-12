import Service from "../../service/Service";
import { Component } from "react";

export default class AddProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: "",
      id: "",
      name: "",
      price: "",
      stock: "",
      imgurl: null,
      description: "",
    };
  }
  getcategory() {
    Service.getData("category").then((res) => {
      this.setState({ categories: res.data });
    });
  }
  iterCategories() {
    let list = [];
    for (let iter = 0; iter < this.state.categories.length; iter++) {
      let option = this.state.categories[iter].name;
      let value = this.state.categories[iter].id;
      list.push(
        <>
          <option value={value}>{option}</option>
        </>
      );
    }
    return <>{list}</>;
  }
  sendData(e) {
    e.preventDefault();
    let id = this.state.id;
    let name = this.state.name;
    let price = this.state.price;
    let stock = this.state.stock;
    let imgurl = this.state.imgurl;
    let description = this.state.description;
    let category = this.state.category;
    console.log("category", category);
    console.log("IMAGE FILE : ", typeof imgurl);
    let product = new FormData();
    console.log("id", id);
    if (id !== undefined) {
      product.append("id", id);
      product.append("name", name);
      product.append("price", price);
      product.append("stock", stock);
      product.append("description", description);
      product.append("categoryId", category);
    } else {
      product.append("name", name);
      product.append("price", price);
      product.append("stock", stock);
      product.append("description", description);
      product.append("categoryId", category);
    }
    if (imgurl !== null) {
      product.append("image", imgurl[0]);
    }
    console.log(product.entries);
    Service.postData("product/save", product, true).then(() =>
      this.closeModal()
    );
  }

  handleChange = (e) => {
    if (e.target.name === "imgurl") {
      this.setState({ imgurl: e.target.files });
    } else {
      this.setState({ [e.target.name]: [e.target.value] });
    }
    console.log(e.target.value);
  };
  closeModal = () => {
    this.setState({
      category: "",
      id: "",
      price: "",
      stock: "",
      imgurl: null,
      description: "",
    });
    this.handleModal();
  };
  handleModal = () => {
    this.props.handleModal(false);
  };
  componentWillUnmount() {
    this.handleModal();
  }
  componentDidMount() {
    this.getcategory();
    this.setState({ id: this.props.data.id });
    this.setState({ name: this.props.data.name });
    this.setState({ stock: this.props.data.stock });
    this.setState({ price: this.props.data.price });
    this.setState({ description: this.props.data.description });
    if (this.props.data.category.id === undefined) {
      this.setState({ category: 1 });
    } else {
      this.setState({ category: this.props.data.category.id });
    }
  }
  render() {
    return (
      <>
        <div className="modal fade" id="modal-default" data-backdrop="static">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title"></h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={(() => this.handleModal(), () => this.closeModal())}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-primary">
                      <div
                        className="card-header"
                        style={{ backgroundColor: "#ff6a00" }}
                      >
                        <h3 className="card-title">Save Product</h3>
                      </div>
                      <form>
                        <div className="card-body">
                          <div className="form-group">
                            <label for="ProductName">Product Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              placeholder={this.state.name}
                              onChange={(e) => this.handleChange(e)}
                              value={this.state.name}
                            />
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label>Price</label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      IDR
                                    </span>
                                  </div>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    min="0"
                                    step="100"
                                    placeholder="0"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.price}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label>Stock</label>
                                <div className="input-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="stock"
                                    min="0"
                                    placeholder="0"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.stock}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label>Category</label>
                                <select
                                  name="category"
                                  onChange={(e) => this.handleChange(e)}
                                  className="form-control"
                                  value={this.state.category}
                                >
                                  {this.iterCategories()}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-3">
                              <label>Upload File</label>
                              <input
                                type="file"
                                name="imgurl"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Product Description</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              placeholder="Enter ..."
                              name="description"
                              onChange={(e) => this.handleChange(e)}
                              value={this.state.description}
                            ></textarea>
                          </div>
                        </div>
                        <div className="card-footer">
                          <button
                            id="submitProduct"
                            type="submit"
                            className="btn btn-default"
                            data-dismiss="modal"
                            onClick={(e) => this.sendData(e)}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
