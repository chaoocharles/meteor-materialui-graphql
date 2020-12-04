import React from "react";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import CustomerSummary from "./CustomerSummary";

import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Customers = ({ loading, customers }) => {
  const classes = useStyles();

  if (loading)
    return (
      <div className={classes.spinner}>
        <CircularProgress color="secondary" />
      </div>
    );

  return (
    <div>
      <Button variant="contained" color="secondary">
        <Link to="/addcustomer">Add Customer</Link>
      </Button>
      <div>
        {customers &&
          customers.map((customer) => (
            <CustomerSummary key={customer._id} customer={customer} />
          ))}
      </div>
    </div>
  );
};

const customersQuery = gql`
  query Customers {
    customers {
      _id
      firstName
      lastName
      customerEmail
      county
    }
  }
`;

export default graphql(customersQuery, {
  props: ({ data }) => ({ ...data }),
})(withApollo(Customers));
