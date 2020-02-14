var  mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DVDSchema = new Schema(
  {
  title: String,
  running_time:{type:Number, min:0},
  publisher:{type:String,required:true},
  }
);

module.exports = mongoose.model('DVD',DVDSchema);
