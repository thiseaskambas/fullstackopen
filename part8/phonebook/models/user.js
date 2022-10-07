const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Users must have a username"],
      maxLength: 20,
      minLength: 3,
      trim: true,
    },

    passwordHash: String,
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.passwordHash;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
