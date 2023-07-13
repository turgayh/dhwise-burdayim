/**
 * chat_room.js
 * @description :: model of a database collection chat_room
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    messages:[{
      _id:false,
      message:{
        type:String,
        trim:true,
        required:true,
        unique:false,
        lowercase:false,
        uniqueCaseInsensitive:true
      },
      addedTime:{ type:Date }
    }],

    roomID:{
      type:String,
      required:true,
      trim:true,
      unique:true,
      lowercase:true,
      uniqueCaseInsensitive:true
    },

    createdAt:{ type:Date },

    isDeleted:{ type:Boolean }
  }
  ,{ timestamps: { createdAt: 'createdAt', } }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
schema.plugin(uniqueValidator,{ message: 'Error, expected {VALUE} to be unique.' });
const chat_room = mongoose.model('chat_room',schema);
module.exports = chat_room;