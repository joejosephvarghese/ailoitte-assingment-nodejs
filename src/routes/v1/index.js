const express = require("express");
const authRoute = require("./auth.route");
const proudcutRoute = require("./products.route");
const categoryRoute = require("./category.route");
const cartRoute = require("./cart.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/product",
    route: proudcutRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/cart",
    route: cartRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
