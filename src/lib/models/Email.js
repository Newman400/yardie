import mongoose from 'mongoose'

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  domain: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

EmailSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

EmailSchema.index({ email: 1 })
EmailSchema.index({ domain: 1 })
EmailSchema.index({ createdAt: -1 })

export default mongoose.models.Email || mongoose.model('Email', EmailSchema)