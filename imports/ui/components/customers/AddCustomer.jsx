import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import gql from "graphql-tag";
import { graphql } from "react-apollo";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const AddCustomer = ({ createCustomer, history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [county, setCounty] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Heeey");
    createCustomer({
      variables: {
        firstName: firstName,
        lastName: lastName,
        customerEmail: customerEmail,
        phone: phone,
        website: website,
        street: street,
        zipCode: zipCode,
        county: county,
        country: country,
      },
    })
      .then(() => {
        setFirstName("");
        setLastName("");
        setCustomerEmail("");
        setPhone("");
        setWebsite("");
        setStreet("");
        setZipCode("");
        setCounty("");
        setCountry("");
      })
      .catch((err) => {
        err && console.log(err);
      });
    history.push("/customers");
  };

  const classes = useStyles();
  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>Add Customer</h2>
        <p>The fields marked with a * are required.</p>
        <h3>Customer Info</h3>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <h3>Contact Info</h3>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          required
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          id="website"
          label="Website"
          variant="outlined"
          required
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <h3>Address</h3>
        <TextField
          id="street"
          label="Street"
          variant="outlined"
          required
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          id="zipCode"
          label="Zip Code"
          variant="outlined"
          required
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <TextField
          id="county"
          label="County"
          variant="outlined"
          required
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

const createCustomer = gql`
  mutation createCustomer(
    $firstName: String!
    $lastName: String!
    $customerEmail: String!
    $phone: String!
    $website: String!
    $street: String!
    $zipCode: String!
    $county: String!
    $country: String!
  ) {
    createCustomer(
      firstName: $firstName
      lastName: $lastName
      customerEmail: $customerEmail
      phone: $phone
      website: $website
      street: $street
      zipCode: $zipCode
      county: $county
      country: $country
    ) {
      _id
    }
  }
`;

export default graphql(createCustomer, {
  name: "createCustomer",
  options: {
    refetchQueries: ["Customers"],
  },
})(AddCustomer);
