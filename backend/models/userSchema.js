import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must contain atleast 3 characters!"],
        maxLength: [32, "Name never exceed 32 characters!"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email."]
    },
    phone: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Reader", "Author"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain atleast 8 characters!"],
        maxLength: [32, "Password never exceed 32 characters!"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    education: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now(),

    },
})
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}


export const User = mongoose.model("User", userSchema);