import React, { Component } from "react";
import ProfileInfo from "../../component/ProfileComponent/MainProfileComponent/ProfileInfo";
import RecentOrder from "../../component/ProfileComponent/MainProfileComponent/RecentOrder";
import Service from "../../service/Service";
export default class ProfileMain extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      length: "",
      key: 1,
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    Service.getData("order/user/recent/" + localStorage.getItem("username"))
      .then((res) => {
        let orders = [];
        for (let iter = 0; iter < res.data.length; iter++) {
          orders.push(res.data[iter]);
          console.log(orders[iter]);
        }

        this.setState({ orders: orders });
      })
      .then(() =>
        Service.getData("order/user/" + localStorage.getItem("username")).then(
          (res) => {
            console.log("res", res);
            this.setState({ length: res.data.length });
          }
        )
      );
  };

  iterOrders() {
    let list = [];
    for (let iter = 0; iter < this.state.orders.length; iter++) {
      list.push(
        <>
          <RecentOrder orders={this.state.orders[iter]} />
        </>
      );
    }
    return list;
  }
  render() {
    return (
      <>
        <ProfileInfo user={this.props.user} orders={this.state.length} />
        <article className="card  mb-3">
          <div className="card-body">
            <div className="row">
              <h5 className="card-title mb-4">Recent orders </h5>
            </div>
            <div className="row">{this.iterOrders()}</div>
          </div>
        </article>
      </>
    );
  }
}
