const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://gsaaad:mongoDB@cluster0.elk4qxz.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// 4 connections for 4 different databases?
// needs different models for each connection

// mongoose.createConnection(
//   "mongodb+srv://gsaaad:mongoDB@cluster0.elk4qxz.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
// mongoose.createConnection("mongodb://localhost/EMSCData", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.createConnection("mongodb://localhost/LargestData", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.createConnection("mongodb://localhost/DangerousData", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

module.exports = mongoose.connection;
