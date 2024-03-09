import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = process.env.SALT_VALUE;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export { User };
