import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

const posts = {};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:8005/api/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/api/events", (req, res) => {
  console.log(req.body);

  res.send({});
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
