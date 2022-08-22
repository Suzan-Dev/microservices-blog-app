import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

app.post("/api/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:8000/api/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:8001/api/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:8002/api/events", event).catch((err) => {
    console.log(err.message);
  });

  res.status(200).json({ status: "OK" });
});

app.listen(8005, () => {
  console.log("listening on port 8005");
});
