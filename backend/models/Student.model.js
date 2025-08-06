import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: String,
    email: String,
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
    }],

    
},{
    timestamps: true,}
);

export default mongoose.model("Student", studentSchema);