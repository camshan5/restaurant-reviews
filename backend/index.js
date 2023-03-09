import mongodb from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";
import RestaurantsDAO from "./dao/restaurants.dao.js";
import ReviewsDAO from "./dao/reviews.dao.js";

// load environment variables
dotenv.config();

// get access to mongo client
const MongoClient = mongodb.MongoClient;

// set port from environment variables or default to 8000
const port = process.env.PORT || 8000;

// connect to db and start the server
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50, // max 50 people can connect at a time
  wtimeoutMS: 2500, // wait 2500ms before giving up on connection
  useNewUrlParser: true,
})
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client); // get initial reference to restaurants collection in database

    await ReviewsDAO.injectDB(client); // get initial reference to review collection in database

    // starting webserver after db is connected
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
