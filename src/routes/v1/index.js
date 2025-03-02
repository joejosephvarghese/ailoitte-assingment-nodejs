const express = require("express");
const authRoute = require("./auth.route");
const proudcutRoute = require("./products.route");
const categoryRoute = require("./category.route");
const cartRoute = require("./cart.route");
const orderRoute = require("./order.route");
const adminAuthRoute = require("./admin.auth.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/admin",
    route: adminAuthRoute,
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
  {
    path: "/order",
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
