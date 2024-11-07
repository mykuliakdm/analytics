import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    projectId: { type: String, required: true },
    ip: { type: String },
    screenSize: { type: String },
    timestamp: { type: Number, required: true },
    userAgent: { type: String, required: true },
    type: { type: String, required: true },
    currentHref: { type: String, required: true },
    element: { type: String, required: true },
    details: {
      label: { type: String },
      alt: { type: String },
      src: { type: String },
      newHref: { type: String },
      name: { type: String },
      blank: { type: Boolean },
    },
  },
  {
    timestamps: true,
  },
)

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema)

export default Event
