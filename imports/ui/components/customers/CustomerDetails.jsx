import React from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { compose } from "recompose";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "#d32f2f",
    cursor: "pointer",
  },
  editIcon: {
    color: "#00897b",
    cursor: "pointer",
  },
  paper: {
    width: "400px",
    padding: "5px",
    paddingLeft: "9px",
    marginTop: "9px",
    overflowX: "auto",
  },
}));

const CustomerDetails = ({ loading, customer, deleteCustomer, history }) => {
  const classes = useStyles();

  if (loading)
    return (
      <div className={classes.spinner}>
        <CircularProgress color="secondary" />
      </div>
    );

  const handleDelete = (customerId) => {
    deleteCustomer({
      variables: {
        customerId: customerId,
      },
    })
      .then(() => {})
      .catch((err) => {
        err && alert(err.message);
      });
    history.push("/customers");
  };

  return (
    <div>
      <Alert severity="info">
        <AlertTitle>Customer Details</AlertTitle>
      </Alert>
      <div className={classes.root}>
        <Paper className={classes.paper}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => handleDelete(customer._id)}
        />
        <EditIcon className={classes.editIcon} />
          <h4>Customer info</h4>
          <Typography variant="body2" component="p">
            _id: {customer._id} <br />
            Name: {customer.firstName} {customer.lastName}
          </Typography>
          <h4>Contact info</h4>
          Email: {customer.customerEmail} <br />
          Phone: {customer.phone} <br />
          Website: {customer.website}
          <h4>Address</h4>
          Street: {customer.street} <br />
          Zip-Code: {customer.zipCode} <br />
          County: {customer.county} <br />
        </Paper>
        <Paper  className={classes.paper}>
          <h3>Customer Policies</h3>
        </Paper>
      </div>
    </div>
  );
};

const customerQuery = gql`
  query customer($customerId: String!) {
    customer(customerId: $customerId) {
      _id
      firstName
      lastName
      customerEmail
      phone
      website
      street
      zipCode
      county
      country
    }
  }
`;

const deleteCustomer = gql`
  mutation deleteCustomer($customerId: String!) {
    deleteCustomer(customerId: $customerId) {
      _id
    }
  }
`;

export default compose(
  graphql(customerQuery, {
    props: ({ data }) => ({ ...data }),
    options: (ownProps) => ({
      variables: {
        customerId: ownProps.match.params.id,
      },
    }),
  }),
  graphql(deleteCustomer, {
    name: "deleteCustomer",
    options: {
      refetchQueries: ["Customers"],
    },
  })
)(withApollo(CustomerDetails));
