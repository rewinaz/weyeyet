import { Router } from "express";
const express = require("express");
const router: Router = express.Router();
const { createRoom, joinRoom, getStream } = require("../controller/room");

router.post("/create", createRoom);

router.post("/join/:id", joinRoom);

router.post("/stream/:id", getStream);

module.exports = router;
