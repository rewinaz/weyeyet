const mongoose = require("mongoose");

const Room = mongoose.model("Room", {
  streams: [{ type: Map, of: Map }],
});

module.exports = Room;
