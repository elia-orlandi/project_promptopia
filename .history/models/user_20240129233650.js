import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [ /^[A-Za-z][A-Za-z0-9_]{4,29}$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]  
    },
    image: {
        type: String
    }
})

// The "models" object is provided by the Mongoose library and stores all the registered models.
// If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model.
// The newly created model is then assigned to the "User" variable.

const User = models.User || model("User", UserSchema)

export default User