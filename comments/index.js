import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

const commentsByPostId = {};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/posts/:postId/comments", (req, res) => {
  res.send(commentsByPostId[req.params.postId] || []);
});

app.post("/api/posts/:postId/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.postId] || [];
  comments.push({
    id,
    content,
  });
  commentsByPostId[req.params.postId] = comments;

  await axios.post("http://localhost:8005/api/events", {
    type: "CommentCreated",
    data: {
      id,
      postId: req.params.postId,
      content,
      status: "pending",
    },
  });

  res.status(201).send(commentsByPostId[req.params.postId]);
});

app.post("/api/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, content, status } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://localhost:8005/api/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(8001, () => {
  console.log("listening on port 8001");
});
