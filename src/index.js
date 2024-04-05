const express = require("express");
const { user } = require("./models/user.js");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  let new_user = user({
    name: "A",
    email: "a@c.com",
    p_number: "12345678",
    password: "hello",
    city: "Guwahati",
  });
  console.log(new_user);
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Listening On Port: ", port);
});
