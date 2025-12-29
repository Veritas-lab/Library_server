const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const { PORT = 3005, API_URL = "http://127.0.0.1" } = process.env;

app.get("/", (request, response) => {
  response.status(200);
  response.send("Hello world");
});

app.post("/", (equest, response) => {
  response.status(200);
  response.send("Hello from POST");
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
