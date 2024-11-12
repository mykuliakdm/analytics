import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    ip: { type: String },
    screenSize: { type: String },
    timestamp: { type: Number, required: true },
    userAgent: { type: String, required: true },
    language: { type: String, required: true },
    href: { type: String, required: true },
    pageTitle: { type: String },
    details: {
      status: { type: String },
      country: { type: String },
      countryCode: { type: String },
      region: { type: String },
      regionName: { type: String },
      city: { type: String },
      zip: { type: String },
      lat: { type: String },
      lon: { type: String },
      timezone: { type: String },
      isp: { type: String },
      org: { type: String },
      as: { type: String },
      query: { type: String },
    },
    session: {
      referral: { type: Boolean, required: true },
      direct: { type: Boolean, required: true },
    },
  },
  {
    timestamps: true,
  },
)

const Customer =
  mongoose.models.Customer || mongoose.model('Customer', customerSchema)

export default Customer
