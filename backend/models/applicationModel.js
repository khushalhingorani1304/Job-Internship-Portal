import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    job: {
        type: mongoose.Schema.ObjectId,
        ref: "Job",
        required: true,
    },
    status: {
        type: String,
        enum: ["applied", "accepted", "rejected"],
        default: "applied",
    },
}, { timestamps: true });

export default Application = mongoose.model("Application", applicationSchema);