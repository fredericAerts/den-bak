const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // http://mongoosejs.com/docs/promises.html
const Schema = mongoose.Schema;

/*  Schema for 'clients' collection
    ============================================================ */
const clientSchema = new Schema({
  name: { type: String, required: true },
  pass: { type: String, required: true },
  date: { type: String },
  time: { type: String },
  statusIndex: { type: Number },
});

module.exports = mongoose.model('Client', clientSchema);
