const express = require("express");

const router = express.Router();
const resData = require("../util/restaurants-data");
const uuid = require("uuid");

router.get("/restaurants", function (req, res) {
  //const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(htmlFilePath);
  let order = req.query.order;
  let nextOrder = "desc";
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if (order === "desc") {
    nextOrder = "asc";
  }




  
  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurantsDatils: storedRestaurants,
    nextOrder: nextOrder,
  });
});

router.get("/confirm", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  //   res.sendFile(htmlFilePath);
  res.render("confirm");
});

router.get("/recommend", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  //   res.sendFile(htmlFilePath);
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurantsDatils = req.body;
  restaurantsDatils.id = uuid.v4();

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurantsDatils);

  resData.storedRestaurantsData(storedRestaurants);

  res.redirect("/confirm");
});
router.get("/restaurants/:id", function (req, res) {
  const restaurantsId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantsId) {
      res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
});
module.exports = router;
