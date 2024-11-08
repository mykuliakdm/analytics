import mongoose from 'mongoose'

const visitSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    projectId: { type: String, required: true },
    time: { type: Number, required: true },
    href: { type: String, required: true },
    pageTitle: { type: String },
    ip: { type: String },
    screenSize: { type: String },
    timestamp: { type: Number, required: true },
    userAgent: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

const Visit = mongoose.models.Visit || mongoose.model('Visit', visitSchema)

export default Visit
