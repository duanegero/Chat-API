//importing express and cors to allow requests
const express = require("express");
const cors = require("cors");

//variable to handle express
const app = express();
//variable to handle the port
const PORT = process.env.PORT;

//variable to handle the routes
const loginRoute = require("./routes/login");
const usersRoute = require("./routes/users");

//middleware to parse json
app.use(express.json());
//middleware to enable cors
app.use(cors());

//mounting the routes to handle the endpoints
app.use("/login", loginRoute);
app.use("/users", usersRoute);

//return when visited
app.get("/", (req, res) => {
  res.send("Chat API");
});

//app listing for server to start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
