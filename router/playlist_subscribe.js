const express = require("express");
const router = express();
const { createWebAPIRequest } = require("../util/util");

router.get("/", (req, res) => {
  const cookie = req.get("Cookie") ? req.get("Cookie") : "";
  const data = {
    id: req.query.id,
    csrf_token: ""
  };
  const action = req.query.t == 1 ? "subscribe" : "unsubscribe";
  createWebAPIRequest(
    "music.163.com",
    `/weapi/playlist/${action}`,
    "POST",
    data,
    cookie,
    music_req => {
      res.send(music_req);
    },
    err => res.status(502).send("fetch error")
  );
});

module.exports = router;
