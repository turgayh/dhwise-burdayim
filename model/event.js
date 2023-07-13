/**
 * event.js
 * @description :: model of a database collection event
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
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

    name:{
      type:String,
      required:true,
      unique:false,
      lowercase:false,
      trim:false,
      uniqueCaseInsensitive:true
    },

    description:{
      type:String,
      required:true,
      trim:true,
      unique:false,
      lowercase:false,
      uniqueCaseInsensitive:true
    },

    address:{
      line1:{ type:String },
      line2:{ type:String },
      city:{ type:String },
      country:{ type:String },
      state:{ type:String },
      pincode:{ type:String },
      lat:{ type:Number },
      lng:{ type:Number }
    },

    startDateTime:{
      type:Date,
      required:true,
      unique:false
    },

    endDateTime:{
      type:Date,
      required:true,
      unique:false
    },

    images:{ type:Array },

    category:{
      lowercase:false,
      trim:true,
      unique:false,
      type:String,
      required:true,
      uniqueCaseInsensitive:true
    },

    subCategory:{
      lowercase:false,
      trim:true,
      unique:false,
      type:String,
      required:false,
      uniqueCaseInsensitive:true
    },

    price:{ type:Number },

    qrCode:{ type:String },

    isSecret:{
      default:false,
      type:Boolean
    },

    count:{ type:Number },

    isActive:{ type:Boolean },

    createdAt:{ type:Date },

    updatedAt:{ type:Date },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    isDeleted:{ type:Boolean }
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.index({
  'name':1,
  'addedBy':1
},{ 'name':'index_name' });
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
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
const event = mongoose.model('event',schema);
module.exports = event;