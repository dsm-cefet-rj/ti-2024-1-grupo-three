import mongoose from "mongoose";
//campos que o módulo vai ter
const Person = mongoose.model("Person", {
  name: String,
  salary: Number,
  approved: Boolean,
});

export default Person;
