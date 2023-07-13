/**
 * eventValidation.js
 * @description :: validate each post and put request as per event model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of event */
exports.schemaKeys = joi.object({
  name: joi.string().required(),
  description: joi.string().trim().allow(null).allow(''),
  address: joi.object({
    line1:joi.string(),
    line2:joi.string(),
    city:joi.string(),
    country:joi.string(),
    state:joi.string(),
    pincode:joi.string(),
    lat:joi.number().integer(),
    lng:joi.number().integer()
  }).allow(0),
  startDateTime: joi.date().options({ convert: true }).required(),
  endDateTime: joi.date().options({ convert: true }).required(),
  images: joi.array().items(),
  category: joi.string().required(),
  subCategory: joi.string().trim().allow(null).allow(''),
  price: joi.number().integer().allow(0),
  qrCode: joi.string().allow(null).allow(''),
  isSecret: joi.boolean().default(false),
  count: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of event for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  description: joi.string().trim().allow(null).allow(''),
  address: joi.object({
    line1:joi.string(),
    line2:joi.string(),
    city:joi.string(),
    country:joi.string(),
    state:joi.string(),
    pincode:joi.string(),
    lat:joi.number().integer(),
    lng:joi.number().integer()
  }).allow(0),
  startDateTime: joi.date().options({ convert: true }).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  endDateTime: joi.date().options({ convert: true }).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  images: joi.array().items(),
  category: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  subCategory: joi.string().trim().allow(null).allow(''),
  price: joi.number().integer().allow(0),
  qrCode: joi.string().allow(null).allow(''),
  isSecret: joi.boolean().default(false),
  count: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of event for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      startDateTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      endDateTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      images: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      category: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      subCategory: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      price: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      qrCode: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isSecret: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      count: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
