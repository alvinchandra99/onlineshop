import React, { Component } from "react";
import AllUsers from "../../component/DashboardComponent/AllUsers";
import AdminHeader from "../../component/DashboardComponent/AdminHeader";
import AdminFooter from "../../component/DashboardComponent/AdminFooter";
import ProductData from "../../component/DashboardComponent/ProductData";
import Category from "../../component/DashboardComponent/Category";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <AdminHeader />

        <div>
          <div className="content-header">
            <div className="container-fluid">
              {/* <MenuTitle /> */}
              <Tabs defaultIndex={0}>
                <TabList>
                  <Tab>Products</Tab>
                  <Tab>Categories</Tab>
                  <Tab>Users</Tab>
                </TabList>
                <TabPanel>
                  <ProductData />
                </TabPanel>
                <TabPanel>
                  <Category />
                </TabPanel>
                <TabPanel>
                  <AllUsers />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    );
  }
}
