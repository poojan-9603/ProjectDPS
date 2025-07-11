import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String},
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  // classes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Class",
  // }],
  description: { type: String },
//   students: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: student
//   }],

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

subjectSchema.virtual("classes", {
  ref: "Class",
  localField: "_id",
  foreignField: "subjects",
})

export default mongoose.model("Subject", subjectSchema);
