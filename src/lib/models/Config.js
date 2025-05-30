import mongoose from 'mongoose'

const ConfigSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
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

ConfigSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

ConfigSchema.index({ key: 1 })

export default mongoose.models.Config || mongoose.model('Config', ConfigSchema)