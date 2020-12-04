import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoreRoundedIcon from "@material-ui/icons/MoreRounded";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "9px 0px",
  },
  moreIconLink: {
    marginLeft: "8px",
    color: "#2196f3",
    paddingBottom: "-20px",
  },
});

const CustomerSummary = ({ customer }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h5">
          {customer.firstName} {customer.lastName}
        </Typography>
        <Typography variant="body2" component="p">
        Email:{customer.customerEmail} <br/> Location:{customer.county}
        </Typography>
      </CardContent>
      <CardActions>
        <Link className={classes.moreIconLink} to={"/customer/" + customer._id}>
          <MoreRoundedIcon />
        </Link>
      </CardActions>
    </Card>
  );
};

export default CustomerSummary;
