/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Friendship = require('../model/friendship');
let Chat_room = require('../model/chat_room');
let Comment = require('../model/comment');
let Event = require('../model/event');
let User = require('../model/user');
let PushNotification = require('../model/pushNotification');
let UserTokens = require('../model/userTokens');
let ActivityLog = require('../model/activityLog');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteFriendship = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Friendship,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_room = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chat_room,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteComment = async (filter) =>{
  try {
    let comment = await dbService.findMany(Comment,filter);
    if (comment && comment.length){
      comment = comment.map((obj) => obj.id);

      const commentFilter = { $or: [{ parentItem : { $in : comment } }] };
      const commentCnt = await dbService.deleteMany(Comment,commentFilter);

      let deleted  = await dbService.deleteMany(Comment,filter);
      let response = { comment :commentCnt + deleted, };
      return response; 
    } else {
      return {  comment : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEvent = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Event,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const friendshipFilter = { $or: [{ follower : { $in : user } },{ following : { $in : user } },{ updatedBy : { $in : user } }] };
      const friendshipCnt = await dbService.deleteMany(Friendship,friendshipFilter);

      const commentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const commentCnt = await dbService.deleteMany(Comment,commentFilter);

      const eventFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const eventCnt = await dbService.deleteMany(Event,eventFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        friendship :friendshipCnt,
        comment :commentCnt,
        event :eventCnt,
        user :userCnt + deleted,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deletePushNotification = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(PushNotification,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteActivityLog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ActivityLog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countFriendship = async (filter) =>{
  try {
    const friendshipCnt =  await dbService.count(Friendship,filter);
    return { friendship : friendshipCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_room = async (filter) =>{
  try {
    const chat_roomCnt =  await dbService.count(Chat_room,filter);
    return { chat_room : chat_roomCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countComment = async (filter) =>{
  try {
    let comment = await dbService.findMany(Comment,filter);
    if (comment && comment.length){
      comment = comment.map((obj) => obj.id);

      const commentFilter = { $or: [{ parentItem : { $in : comment } }] };
      const commentCnt =  await dbService.count(Comment,commentFilter);

      let response = { comment : commentCnt, };
      return response; 
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countEvent = async (filter) =>{
  try {
    const eventCnt =  await dbService.count(Event,filter);
    return { event : eventCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const friendshipFilter = { $or: [{ follower : { $in : user } },{ following : { $in : user } },{ updatedBy : { $in : user } }] };
      const friendshipCnt =  await dbService.count(Friendship,friendshipFilter);

      const commentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const commentCnt =  await dbService.count(Comment,commentFilter);

      const eventFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const eventCnt =  await dbService.count(Event,eventFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        friendship : friendshipCnt,
        comment : commentCnt,
        event : eventCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPushNotification = async (filter) =>{
  try {
    const pushNotificationCnt =  await dbService.count(PushNotification,filter);
    return { pushNotification : pushNotificationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countActivityLog = async (filter) =>{
  try {
    const activityLogCnt =  await dbService.count(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFriendship = async (filter,updateBody) =>{  
  try {
    const friendshipCnt =  await dbService.updateMany(Friendship,filter);
    return { friendship : friendshipCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_room = async (filter,updateBody) =>{  
  try {
    const chat_roomCnt =  await dbService.updateMany(Chat_room,filter);
    return { chat_room : chat_roomCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComment = async (filter,updateBody) =>{  
  try {
    let comment = await dbService.findMany(Comment,filter, { id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj.id);

      const commentFilter = { '$or': [{ parentItem : { '$in' : comment } }] };
      const commentCnt = await dbService.updateMany(Comment,commentFilter,updateBody);
      let updated = await dbService.updateMany(Comment,filter,updateBody);

      let response = { comment :commentCnt + updated, };
      return response;
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEvent = async (filter,updateBody) =>{  
  try {
    const eventCnt =  await dbService.updateMany(Event,filter);
    return { event : eventCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const friendshipFilter = { '$or': [{ follower : { '$in' : user } },{ following : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const friendshipCnt = await dbService.updateMany(Friendship,friendshipFilter,updateBody);

      const commentFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const commentCnt = await dbService.updateMany(Comment,commentFilter,updateBody);

      const eventFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const eventCnt = await dbService.updateMany(Event,eventFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        friendship :friendshipCnt,
        comment :commentCnt,
        event :eventCnt,
        user :userCnt + updated,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePushNotification = async (filter,updateBody) =>{  
  try {
    const pushNotificationCnt =  await dbService.updateMany(PushNotification,filter);
    return { pushNotification : pushNotificationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteActivityLog = async (filter,updateBody) =>{  
  try {
    const activityLogCnt =  await dbService.updateMany(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteFriendship,
  deleteChat_room,
  deleteComment,
  deleteEvent,
  deleteUser,
  deletePushNotification,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countFriendship,
  countChat_room,
  countComment,
  countEvent,
  countUser,
  countPushNotification,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteFriendship,
  softDeleteChat_room,
  softDeleteComment,
  softDeleteEvent,
  softDeleteUser,
  softDeletePushNotification,
  softDeleteUserTokens,
  softDeleteActivityLog,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
