/**
 * friendshipController.js
 * @description : exports action methods for friendship.
 */

const Friendship = require('../../../model/friendship');
const friendshipSchemaKey = require('../../../utils/validation/friendshipValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Friendship in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Friendship. {status, message, data}
 */ 
const addFriendship = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      friendshipSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Friendship(dataToCreate);
    let createdFriendship = await dbService.create(Friendship,dataToCreate);
    return res.success({ data : createdFriendship });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Friendship in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Friendships. {status, message, data}
 */
const bulkInsertFriendship = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdFriendships = await dbService.create(Friendship,dataToCreate);
    createdFriendships = { count: createdFriendships ? createdFriendships.length : 0 };
    return res.success({ data:{ count:createdFriendships.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Friendship from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Friendship(s). {status, message, data}
 */
const findAllFriendship = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      friendshipSchemaKey.findFilterKeys,
      Friendship.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Friendship, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundFriendships = await dbService.paginate( Friendship,query,options);
    if (!foundFriendships || !foundFriendships.data || !foundFriendships.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundFriendships });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Friendship from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Friendship. {status, message, data}
 */
const getFriendship = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundFriendship = await dbService.findOne(Friendship,query, options);
    if (!foundFriendship){
      return res.recordNotFound();
    }
    return res.success({ data :foundFriendship });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Friendship.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getFriendshipCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      friendshipSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedFriendship = await dbService.count(Friendship,where);
    return res.success({ data : { count: countedFriendship } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Friendship with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Friendship.
 * @return {Object} : updated Friendship. {status, message, data}
 */
const updateFriendship = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      friendshipSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedFriendship = await dbService.updateOne(Friendship,query,dataToUpdate);
    if (!updatedFriendship){
      return res.recordNotFound();
    }
    return res.success({ data :updatedFriendship });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Friendship with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Friendships.
 * @return {Object} : updated Friendships. {status, message, data}
 */
const bulkUpdateFriendship = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedFriendship = await dbService.updateMany(Friendship,filter,dataToUpdate);
    if (!updatedFriendship){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedFriendship } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Friendship with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Friendship.
 * @return {obj} : updated Friendship. {status, message, data}
 */
const partialUpdateFriendship = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      friendshipSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedFriendship = await dbService.updateOne(Friendship, query, dataToUpdate);
    if (!updatedFriendship) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedFriendship });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Friendship from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Friendship.
 * @return {Object} : deactivated Friendship. {status, message, data}
 */
const softDeleteFriendship = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedFriendship = await dbService.updateOne(Friendship, query, updateBody);
    if (!updatedFriendship){
      return res.recordNotFound();
    }
    return res.success({ data:updatedFriendship });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Friendship from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Friendship. {status, message, data}
 */
const deleteFriendship = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedFriendship = await dbService.deleteOne(Friendship, query);
    if (!deletedFriendship){
      return res.recordNotFound();
    }
    return res.success({ data :deletedFriendship });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Friendship in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyFriendship = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedFriendship = await dbService.deleteMany(Friendship,query);
    if (!deletedFriendship){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedFriendship } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Friendship from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Friendship.
 * @return {Object} : number of deactivated documents of Friendship. {status, message, data}
 */
const softDeleteManyFriendship = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedFriendship = await dbService.updateMany(Friendship,query, updateBody);
    if (!updatedFriendship) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedFriendship } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addFriendship,
  bulkInsertFriendship,
  findAllFriendship,
  getFriendship,
  getFriendshipCount,
  updateFriendship,
  bulkUpdateFriendship,
  partialUpdateFriendship,
  softDeleteFriendship,
  deleteFriendship,
  deleteManyFriendship,
  softDeleteManyFriendship    
};