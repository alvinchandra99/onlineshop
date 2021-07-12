import React, { Component } from "react";
import Service from "../../service/Service";
export default class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
    };
  }
  componentDidMount() {
    console.log(this.props.id.id);
    this.setState({
      id: this.props.id.id,
      name: this.props.id.name,
    });
  }
  sendData(e) {
    e.preventDefault();
    let id = this.state.id;
    if (id === undefined) {
      id = "";
    }
    let category = {
      id: id,
      name: this.state.name,
    };
    Service.postData("category/new", category, true).then(() =>
      this.closeModal()
    );
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log("state=", this.state.name);
  };
  closeModal = () => {
    this.setState({
      id: "",
      name: "",
    });
    this.handleModal();
  };
  handleModal = () => {
    this.props.handleModal(false);
  };
  componentWillUnmount() {
    this.handleModal();
  }
  render() {
    return (
      <>
        <div className="modal fade" id="modal-category" data-backdrop="static">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title"></h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={() => this.closeModal()}
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
                        <h3 className="card-title">Save Category</h3>
                      </div>
                      <form>
                        <div className="card-body">
                          <div className="form-group">
                            <label for="ProductName">Category Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              onChange={(e) => this.handleChange(e)}
                              value={this.state.name}
                            />
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
