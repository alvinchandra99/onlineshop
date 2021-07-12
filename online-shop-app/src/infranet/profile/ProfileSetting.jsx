import React, { Component } from "react";
import Service from "../../service/Service";

export default class ProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      fName: "",
      lName: "",
      address: "",
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.user.id });
    this.setState({ fName: this.props.user.firstName });
    this.setState({ lName: this.props.user.lastName });
    this.setState({ email: this.props.user.username });
    this.setState({ address: this.props.user.address });
  }
  save = (e) => {
    e.preventDefault();
    console.log(this.state);
    let data = {
      id: this.state.id,
      firstName: this.state.fName,
      lastName: this.state.lName,
      address: this.state.address,
    };
    Service.postData("user/edit/", data).catch((e) => console.log(e));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form className="row">
            <div className="col-md-9">
              <div className="form-row">
                <div className="col form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fName"
                    value={this.state.fName}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="col form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lName"
                    value={this.state.lName}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="col form-group">
                  <label>Email</label>
                  <input
                    disabled="true"
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col form">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={(e) => this.handleChange(e)}
                  ></textarea>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => this.save(e)}
              >
                Save
              </button>
              <button className="btn btn-light">Change password</button>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="col-md">
              <img
                src="http://localhost:3000/asset/avatar.png"
                className="img-md rounded-circle border"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
