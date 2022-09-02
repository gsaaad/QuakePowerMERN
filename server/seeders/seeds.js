const faker = require("faker");

const dbConnection = require("../config/connection");
const { Earthquake, User } = require("../models");

dbConnection.once("open", async () => {
  await Earthquake.deleteMany({});
  await User.deleteMany({});

  // create userData
  const userData = [];

  // 10 random pieces of Data
  for (let i = 0; i < 10; i++) {
    const userName = faker.internet.userName();
    const email = faker.internet.email(userName);
    const password = faker.internet.password();

    userData.push({ userName, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  //   create Earthquakes!
  let createdEarthquakes = [];
  for (let i = 1; i < 31; i++) {
    const earthquakeId = i;
    const earthquakeDate = faker.date.between(
      "2004-01-01T00:00:00.000Z",
      "2030-01-01T00:00:00.000Z"
    );
    const randomUserId = Math.floor(Math.random() * createdUsers.ops.length);
    const { userName, _id: userId } = createdUsers.ops[randomUserId];

    const Latitude = Math.floor(Math.random() * 90);
    const Longitude = Math.floor(Math.random() * 180);
    const Depth = Math.floor(Math.random() * 70);
    const Magnitude = Math.random() * 10;
    const Region = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const createdEarthquake = await Earthquake.create({
      earthquakeId,
      earthquakeDate,
      userName,
      Latitude,
      Longitude,
      Depth,
      Magnitude,
      Region,
    });

    const updatedUser = await User.updateOne(
      {
        _id: userId,
      },
      { $push: { earthquakes: createdEarthquakes._id } }
    );
    createdEarthquakes.push(createdEarthquake);

    // create Reactions to earthquake posts
    for (let i = 0; i < 30; i++) {
      const reactionBody = faker.lorem.words(
        Math.round(Math.random() * 20) + 1
      );

      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      const { userName } = createdUsers.ops[randomUserIndex];
      const randomEarthquakeIndex = Math.floor(
        Math.random() * createdEarthquakes.length
      );

      const { _id: earthquakeId } = createdEarthquakes[randomEarthquakeIndex];

      await Earthquake.updateOne(
        { _id: earthquakeId },
        { $push: { reactions: { reactionBody, userName } } },
        { runValidators: true }
      );
    }
  }

  console.log("All Done Seeding!");
  process.exit(0);
});
