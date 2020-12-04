import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import AddCustomer from "./components/customers/AddCustomer.jsx";
import Customers from "./components/customers/Customers.jsx";
import Dashboard from "./components/Dashboard.jsx";
import NavBar from "./components/layout/NavBar.jsx";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import CustomerDetails from "./components/customers/CustomerDetails.jsx";

export const App = () => (
  <>
    <BrowserRouter>
      <NavBar />
      <CssBaseline />
      <Container maxWidth="md" className="customContainer">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/addcustomer" component={AddCustomer} />
          <Route path="/customers" component={Customers} />
          <Route path="/customer/:id" component={CustomerDetails} />
        </Switch>
      </Container>
    </BrowserRouter>
  </>
);
