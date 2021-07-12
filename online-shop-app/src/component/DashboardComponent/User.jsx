import { Component } from "react";
import Service from "../../service/Service";
export default class User extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    Service.getData("category").then((res) => {
      this.setState({ data: res.data });
    });
  }

  handleClick = (id, name) => {
    this.setState({ id: id, name: name, modalState: true });
  };

  handleModal = (modalState) => {
    this.setState({ id: "", modalState: modalState });
  };

  iterCategory() {
    let list = [];
    for (let iter = 0; iter < this.state.data.length; iter++) {
      let id = this.state.data[iter].id;
      let name = this.state.data[iter].name;
      list.push(
        <tr>
          <td>{iter + 1}</td>
          <td>{name}</td>
          <td>
            <div className="col-sm-2">
              <button
                type="button"
                id="update"
                className="btn btn-default"
                data-toggle="modal"
                data-target="#modal-category"
                onClick={(e) => this.handleClick({ id, name })}
              >
                Update
              </button>
            </div>
          </td>
        </tr>
      );
    }
    return <>{list}</>;
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
                      Category List
                    </h3>
                  </div>
                  <div className="col-sm-2">
                    <button
                      type="button"
                      className="btn btn-default"
                      name="new"
                      id="new"
                      data-toggle="modal"
                      data-target="#modal-category"
                      onClick={(e) => this.handleClick(e)}
                    >
                      <i className="fa fa-plus-square" />
                      New Category
                    </button>
                  </div>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>{this.iterCategory()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
