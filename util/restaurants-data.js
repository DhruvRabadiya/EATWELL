const fs = require('fs')
const path = require("path");
const filePath = path.join(__dirname,'..', "data", "restaurantsDetail.json");

function getStoredRestaurants(){

      const fileData = fs.readFileSync(filePath);
      const storedRestaurants = JSON.parse(fileData);
      return storedRestaurants
}

function storedRestaurantsData (storableRestaurant){
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurant));
}
module.exports = {
  getStoredRestaurants:getStoredRestaurants,
  storedRestaurantsData:storedRestaurantsData,
};