const express = require("express");

const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "1abc",
      title: "First server-side post",
      content: "This is api response",
    },
    {
      id: "2eee",
      title: "Second server-side post",
      content: "This is second api response",
    },
  ];

  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

module.exports = app;
