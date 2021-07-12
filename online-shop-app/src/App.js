import { Fragment } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./infranet/Header";
import Footer from "./infranet/Footer";
import Contact from "./public/user/Contact";
import Home from "./public/user/Home";
import Product from "./public/user/Product";
import Profile from "./public/user/Profile";
import SignInForm from "./infranet/form/SignInForm";
import SignUpForm from "./infranet/form/SignUpForm";
import Dashboard from "./infranet/admin/Dashboard";
import ProductDetails from "./infranet/product/ProductDetails";
import CartPage from "./public/user/CartPage";
import Order from "./public/user/Order";
import RoomList from "./infranet/chat/RoomList";
import AddRoom from "./infranet/chat/AddRoom";
import ChatRoom from "./infranet/chat/ChatRoom";
import Login from "./infranet/chat/Login";
import ChatPageUser from "./infranet/chat/ChatPageUser";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/product" component={Product}></Route>
          <Route path="/product/:keyword" component={Product}></Route>
          <Route path="/detail/:id" component={ProductDetails}></Route>
          <Route path="/contact" component={Contact}></Route>
          <Route path="/signin" component={SignInForm}></Route>
          <Route path="/signup" component={SignUpForm}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/order/:orderId" component={Order}></Route>

          <SecureRoute path="/cart">
            <CartPage />
          </SecureRoute>
          <SecureRoute path="/profile">
            <Profile />
          </SecureRoute>
          <SecureRoute exact path="/order">
            <Order />
          </SecureRoute>
          <SecureRoute path="/addroom">
            <AddRoom />
          </SecureRoute>
          <SecureRoute path="/chat">
            <ChatPageUser />
          </SecureRoute>

          <SecureRouteAdmin
            path="/admin/dashboard"
            component={Dashboard}
          ></SecureRouteAdmin>
          <SecureRouteAdmin path="/chatroom/:room">
            <ChatRoom />
          </SecureRouteAdmin>
          <SecureRouteAdmin path="/roomlist">
            <RoomList />
          </SecureRouteAdmin>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

function SecureRouteAdmin({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("auth") === "ADMIN"
          ? children
          : (alert("Maaf, Silahkan Signin terlebih dahulu."),
            (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: location },
                }}
              />
            ))
      }
    />
  );
}
function SecureRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("auth")
          ? children
          : (alert("Maaf, Silahkan Signin terlebih dahulu."),
            (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: location },
                }}
              />
            ))
      }
    />
  );
}
