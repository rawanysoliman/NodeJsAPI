const mongoose = require("mongoose");

// schema defines the structure of the collection
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    //remove validation since it is done in validation middleware
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// index is a way to speed up the search operation , it is a way to create a unique key for the collection
usersSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("users", usersSchema);

module.exports = User;
