import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Service from "../../service/Service";

export default class SignUpForm extends React.Component {
  state = {
    formSignup: {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      birthdate: "",
      gender: "",
      password: "",
    },
  };

  postDataToApi = () => {
    Service.postData("signup", this.state.formSignup).then(
      () => {
        this.setState({
          formSignup: {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            birthdate: "",
            gender: "",
            password: "",
            rePassword: "",
          },
        });
      },
      (err) => {
        console.log("error", err);
      }
    );
  };

  handleFormChange = (event) => {
    let formSignUpNew = { ...this.state.formSignup };
    formSignUpNew[event.target.name] = event.target.value;
    this.setState({
      formSignup: formSignUpNew,
    });
  };

  handleSubmit = () => {
    if (this.state.formSignup.password === this.state.formSignup.rePassword) {
      this.postDataToApi();
      alert("Sign Up berhasil.");
      this.props.history.push("/signin");
    } else {
      alert("Password dan Repeat Password tidak sama.");
    }
  };

  render() {
    return (
      <Fragment>
        <section className="section-content padding-y">
          <div
            className="card mx-auto"
            style={{ maxWidth: "520px", marginTop: "40px" }}
          >
            <article className="card-body">
              <header className="mb-4">
                <strong>
                  <h4 className="card-title" style={{ fontWeight: "900" }}>
                    Sign up
                  </h4>
                </strong>
              </header>
              <br />
              <form>
                <div className="form-row">
                  <div className="col form-group">
                    <label>First name</label>
                    <input
                      name="firstName"
                      type="text"
                      className="form-control"
                      value={this.state.formSignup.firstName}
                      onChange={this.handleFormChange}
                      required
                    />
                  </div>
                  <div className="col form-group">
                    <label>Last name</label>
                    <input
                      name="lastName"
                      type="text"
                      onChange={this.handleFormChange}
                      value={this.state.formSignup.lastName}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      onChange={this.handleFormChange}
                      value={this.state.formSignup.email}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col form-group">
                    <label>Birth Date</label>
                    <input
                      name="birthdate"
                      type="date"
                      onChange={this.handleFormChange}
                      value={this.state.formSignup.birthdate}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="custom-control custom-radio custom-control-inline">
                    <input
                      className="custom-control-input"
                      type="radio"
                      name="gender"
                      onChange={this.handleFormChange}
                      value="Male"
                    />
                    <span className="custom-control-label"> Male </span>
                  </label>
                  <label className="custom-control custom-radio custom-control-inline">
                    <input
                      className="custom-control-input"
                      type="radio"
                      name="gender"
                      onChange={this.handleFormChange}
                      value="Female"
                    />
                    <span className="custom-control-label"> Female </span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    col="10"
                    rows="5"
                    type="email"
                    onChange={this.handleFormChange}
                    value={this.state.formSignup.address}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Create password</label>
                    <input
                      name="password"
                      className="form-control"
                      type="password"
                      onChange={this.handleFormChange}
                      value={this.state.formSignup.password}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Repeat password</label>
                    <input
                      name="rePassword"
                      className="form-control"
                      type="password"
                      onChange={this.handleFormChange}
                      value={this.state.formSignup.rePassword}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={this.handleSubmit}
                  >
                    Register
                  </button>
                </div>
              </form>
            </article>
          </div>
          <p className="text-center mt-4">
            Have an account? <Link to="/signin">Sign In</Link>
          </p>
          <br></br>
        </section>
      </Fragment>
    );
  }
}
