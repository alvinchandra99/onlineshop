import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Service from "../../service/Service";
import firebase from "../../Firebase";
import { Alert } from "reactstrap";

const ref = firebase.database().ref("users/");
const refRoom = firebase.database().ref("rooms/");

export default class SignInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      load: false,
      roomname: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/");
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleKey = (e) => {
    if (e.key === "Enter") {
      this.login();
    }
  };

  login = () => {
    let user = this.state.username;
    let password = this.state.password;
    Service.postData("auth", {
      email: user,
      password: password,
    })
      .then((res) => res.data)
      .then((data) => {
        this.setState({ load: true });
        localStorage.setItem("auth", data.authorities);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.name);
        localStorage.setItem("userId", data.userId);

        ref
          .orderByChild("username")
          .equalTo(this.state.username)
          .once("value", (snapshot) => {
            if (!snapshot.exists()) {
              this.setState({ username: localStorage.getItem("username") });
              const newUser = firebase.database().ref("users/").push();
              newUser.set(this.state);
            }
          });
        if (localStorage.getItem("auth") === "USER") {
          refRoom
            .orderByChild("roomname")
            .equalTo(localStorage.getItem("username"))
            .once("value", (snapshot) => {
              if (!snapshot.exists()) {
               const newRoom = firebase.database().ref("rooms/").push();
                newRoom.set({ roomname: localStorage.getItem("username") });
              }
            });
        }
        alert("Sign In berhasil " + localStorage.getItem("username"));
        this.props.history.push("/");
      })
      .catch(this.props.history.push("/signin"));
  };
  render() {
    return (
      <Fragment>
        <div
          className="card mx-auto"
          style={{ maxWidth: "380px", marginTop: "100px" }}
        >
          <div className="card-body">
            <h4 className="card-title mb-4" style={{ fontWeight: "900" }}>
              Sign In
            </h4>
            <form>
              <div className="form-group">
                <input
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  type="text"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.username}
                />
              </div>
              <div className="form-group">
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.password}
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => this.login()}
                  onKeyDown={this.handleKey}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-center mt-4">
          Don't have account? <Link to="/signup">Sign up</Link>
        </p>
        <br></br>
      </Fragment>
    );
  }
}
