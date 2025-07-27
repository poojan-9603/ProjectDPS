import mongoose from "mongoose";

const classSchema = mongoose.Schema({
    name: String,
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    }],
    // students: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Student",
    // }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
    }],
    room: String,
    // schedule: String,
    // notes: String,
    // assignments: String,
    // attendance: String,
    // grades: String,
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model("Class", classSchema);