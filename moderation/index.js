import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

app.post("/api/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.toLowerCase().includes("orange")
      ? "rejected"
      : "approved";

    await axios.post("http://localhost:8005/api/events", {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    });
  }

  res.send({});
});

app.listen(8003, () => {
  console.log("listening on port 8003");
});
