import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

app.post("/api/events", (req, res) => {});

app.listen(8003, () => {
  console.log("listening on port 8003");
});
