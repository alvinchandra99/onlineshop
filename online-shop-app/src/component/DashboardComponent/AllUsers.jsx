import React, { Component } from "react";
import Service from "../../service/Service";

export default class AllUsers extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    Service.getData("user/all").then((res) => {
      this.setState({ data: res.data });
    });
  }

  iterUser() {
    let list = [];
    for (let iter = 0; iter < this.state.data.length; iter++) {
      let id = this.state.data[iter].id;
      let name = this.state.data[iter].username;
      let role = this.state.data[iter].appUserRole;
      let button;
      if (role === "USER") {
        button = "ADMIN";
      } else {
        button = "USER";
      }
      let user = '{"id":' + id + ',"appUserRole":"' + button + '"}';
      list.push(
        <tr>
          <td>{iter + 1}</td>
          <td>{name}</td>
          <td>{role}</td>
          <button
            value={user}
            style={{ minWidth: "10vw" }}
            onClick={(e) => this.setRole(e)}
          >
            Make {button}
          </button>
        </tr>
      );
    }
    return <>{list}</>;
  }

  setRole = (e) => {
    let user = JSON.parse(e.target.value);
    Service.postData("user/set", user, true).then(() =>
      window.location.reload()
    );
  };
  render() {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>{this.iterUser()}</tbody>
        </table>
      </>
    );
  }
}
