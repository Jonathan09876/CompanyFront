import mongoose from "mongoose";

const filesShema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, "Project Name is a required field"],
    },
    UploadDate: {
      type: String,
      required: false,
    },
    Status: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("File", filesShema);

export default Project;
