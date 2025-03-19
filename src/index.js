const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const loginRoute = require("./routes/login");
const usersRoute = require("./routes/users");
console.log(typeof loginRoute, typeof usersRoute);

app.use(express.json());
app.use(cors());

app.use("/login", loginRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("Chat API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
