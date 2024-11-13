import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    google: {
      propertyId: { type: String },
      isConnected: { type: Boolean, required: true },
    },
  },
  {
    timestamps: true,
  },
)

const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema)
export default Project
