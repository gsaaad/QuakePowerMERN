const { faker } = require("@faker-js/faker");
const db = require("../config/connection");
const { Earthquake, User } = require("../models");

db.once("open", async () => {
  // await Earthquake.deleteMany({});
  // await User.deleteMany({});
  db.dropCollection("users");

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);
  // console.log(userData, "this is userData");
  // console.log(createdUsers, "createdUsers");

  // console.log(createdUsers.ops, "this isops");

  // create Earthquakes
  const earthquakeData = [];

  for (let i = 0; i < 20; i++) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);

    const { username, _id: userId } = createdUsers.ops[randomUserIndex];
    // console.log(username, userId);
    earthquakeData.push({ username, userId });

    const earthquakeDate = faker.date.between(
      "2004-01-01T00:00:00.000Z",
      "2030-01-01T00:00:00.000Z"
    );

    const Latitude = faker.datatype.number({ max: 90, precision: 0.01 });
    const Longitude = faker.datatype.number({ max: 180, precision: 0.01 });
    const Depth = faker.datatype.number({ min: 0, max: 80 });
    const Magnitude = faker.datatype.float({
      min: 5,
      max: 9.9,
      precision: 0.1,
    });
    const Region = faker.lorem.sentence(5);
    earthquakeData.push({
      earthquakeDate,
      Latitude,
      Magnitude,
      Region,
      Longitude,
      Depth,
    });
    // console.log(earthquakeDate, Latitude, Magnitude, Longitude, Depth, Region);
  }
  const createdEarthquakes = await Earthquake.collection.insertMany(
    earthquakeData
  );
  console.log(createdEarthquakes);
  console.log("all done!");
  process.exit(0);
});
