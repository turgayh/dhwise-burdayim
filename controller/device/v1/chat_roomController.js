/**
 * chat_roomController.js
 * @description : exports action methods for chat_room.
 */

const Chat_room = require('../../../model/chat_room');
const chat_roomSchemaKey = require('../../../utils/validation/chat_roomValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Chat_room in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Chat_room. {status, message, data}
 */ 
const addChat_room = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{ 'messages':[{ 'addedTime':(Date.now()).toString() }] },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      chat_roomSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Chat_room(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Chat_room,[ 'roomID' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdChat_room = await dbService.create(Chat_room,dataToCreate);
    return res.success({ data : createdChat_room });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Chat_room in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Chat_rooms. {status, message, data}
 */
const bulkInsertChat_room = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{ 'messages':[{ 'addedTime':(Date.now()).toString() }] },
        ...dataToCreate[i],
      };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Chat_room,[ 'roomID' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdChat_rooms = await dbService.create(Chat_room,dataToCreate);
    createdChat_rooms = { count: createdChat_rooms ? createdChat_rooms.length : 0 };
    return res.success({ data:{ count:createdChat_rooms.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Chat_room from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Chat_room(s). {status, message, data}
 */
const findAllChat_room = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      chat_roomSchemaKey.findFilterKeys,
      Chat_room.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Chat_room, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundChat_rooms = await dbService.paginate( Chat_room,query,options);
    if (!foundChat_rooms || !foundChat_rooms.data || !foundChat_rooms.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundChat_rooms });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Chat_room from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Chat_room. {status, message, data}
 */
const getChat_room = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundChat_room = await dbService.findOne(Chat_room,query, options);
    if (!foundChat_room){
      return res.recordNotFound();
    }
    return res.success({ data :foundChat_room });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Chat_room.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getChat_roomCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      chat_roomSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedChat_room = await dbService.count(Chat_room,where);
    return res.success({ data : { count: countedChat_room } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Chat_room with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Chat_room.
 * @return {Object} : updated Chat_room. {status, message, data}
 */
const updateChat_room = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      chat_roomSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Chat_room,[ 'roomID' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedChat_room = await dbService.updateOne(Chat_room,query,dataToUpdate);
    if (!updatedChat_room){
      return res.recordNotFound();
    }
    return res.success({ data :updatedChat_room });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Chat_room with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Chat_rooms.
 * @return {Object} : updated Chat_rooms. {status, message, data}
 */
const bulkUpdateChat_room = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Chat_room,[ 'roomID' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedChat_room = await dbService.updateMany(Chat_room,filter,dataToUpdate);
    if (!updatedChat_room){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedChat_room } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Chat_room with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Chat_room.
 * @return {obj} : updated Chat_room. {status, message, data}
 */
const partialUpdateChat_room = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      chat_roomSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Chat_room,[ 'roomID' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedChat_room = await dbService.updateOne(Chat_room, query, dataToUpdate);
    if (!updatedChat_room) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedChat_room });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Chat_room from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Chat_room.
 * @return {Object} : deactivated Chat_room. {status, message, data}
 */
const softDeleteChat_room = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedChat_room = await dbService.updateOne(Chat_room, query, updateBody);
    if (!updatedChat_room){
      return res.recordNotFound();
    }
    return res.success({ data:updatedChat_room });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Chat_room from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Chat_room. {status, message, data}
 */
const deleteChat_room = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedChat_room = await dbService.deleteOne(Chat_room, query);
    if (!deletedChat_room){
      return res.recordNotFound();
    }
    return res.success({ data :deletedChat_room });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Chat_room in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyChat_room = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedChat_room = await dbService.deleteMany(Chat_room,query);
    if (!deletedChat_room){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedChat_room } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Chat_room from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Chat_room.
 * @return {Object} : number of deactivated documents of Chat_room. {status, message, data}
 */
const softDeleteManyChat_room = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedChat_room = await dbService.updateMany(Chat_room,query, updateBody);
    if (!updatedChat_room) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedChat_room } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addChat_room,
  bulkInsertChat_room,
  findAllChat_room,
  getChat_room,
  getChat_roomCount,
  updateChat_room,
  bulkUpdateChat_room,
  partialUpdateChat_room,
  softDeleteChat_room,
  deleteChat_room,
  deleteManyChat_room,
  softDeleteManyChat_room    
};