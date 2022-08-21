import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";

const posts = {};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
