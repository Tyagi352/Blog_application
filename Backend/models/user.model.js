import mongoose from "mongoose"

 export const userSchema= mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, minLength:6},
    bio:{type:String, default:""},
    occupation:{type:String, default:""},
    photoUrl:{type:String, default:""}

},{timestamps:true})

const User= mongoose.model("User", userSchema)

export {User}