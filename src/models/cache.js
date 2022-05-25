const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cacheSchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  },
}, {
  timestamps: true
})

const Cache = mongoose.model('cache', cacheSchema)

module.exports = Cache