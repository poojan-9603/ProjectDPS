import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  username: { type: String, required: false},
  password: { type: String, required: false },
  // subjects: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Subject",
  // }],
  // classes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Class"
  // }],
  role: { type: String, default: "teacher" },
  phone: { type: String },
  address: { type: String },
  image: { type: String },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

teacherSchema.virtual("subjects", {
  ref: "Subject",
  localField: "_id",
  foreignField: "teacher",
});

teacherSchema.virtual("classes", {
  ref: "Class",
  localField: "_id",
  foreignField: "teacher",
})
    


export default mongoose.model("Teacher", teacherSchema);
