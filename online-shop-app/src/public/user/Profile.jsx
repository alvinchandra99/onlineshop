import React, { Fragment } from "react";
import PageTop from "../../component/ProfileComponent/PageTop";
import SideMenu from "../../component/ProfileComponent/SideMenu";
import ProfileMain from "../../infranet/profile/ProfileMain";
import ProfileAddress from "../../infranet/profile/ProfileAddress";
import ProfileOrder from "../../infranet/profile/ProfileOrder";
import ProfileSetting from "../../infranet/profile/ProfileSetting";
import Service from "../../service/Service";

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      pageActive: "",
      user: {},
    };
  }
  componentDidMount() {
    this.getUserData();
  }
  getUserData = () => {
    let id = localStorage.getItem("userId");
    Service.getData("user/" + id).then((res) => {
      this.setState({
        user: res.data,
      });
    });
  };
  handleCallback = (page) => {
    this.setState({ pageActive: page });
  };

  setPage() {
    if (this.state.pageActive === "mySetting")
      return <ProfileSetting user={this.state.user} />;
    else if (this.state.pageActive === "myProfile")
      return <ProfileMain user={this.state.user} />;
    else return <ProfileMain user={this.state.user} />;
  }
  render() {
    return (
      <Fragment>
        <PageTop />
        <section className="section-content padding-y">
          <div className="container">
            <div className="row">
              <SideMenu parentCallback={(page) => this.handleCallback(page)} />
              <main className="col-md-9">{this.setPage()}</main>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
