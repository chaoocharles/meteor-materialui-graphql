import Customers from "./customers";

export default {
  Query: {
    customers(obj, args, context) {
      return Customers.find().fetch();
    },
    customer: (obj, { customerId }) => {
      return Customers.findOne(customerId);
    },
  },

  Mutation: {
    createCustomer(
      obj,
      {
        firstName,
        lastName,
        customerEmail,
        phone,
        website,
        street,
        zipCode,
        county,
        country,
      },
      context
    ) {
      const customerId = Customers.insert({
        firstName,
        lastName,
        customerEmail,
        phone,
        website,
        street,
        zipCode,
        county,
        country,
      });
      return Customers.findOne(customerId);
    },
    deleteCustomer(obj, { customerId }) {
      Customers.remove(customerId);
      return null;
    },
  },
};
