/**
 * chat_roomRoutes.js
 * @description :: CRUD API routes for chat_room
 */

const express = require('express');
const router = express.Router();
const chat_roomController = require('../../../controller/device/v1/chat_roomController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/chat_room/create').post(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.addChat_room);
router.route('/device/api/v1/chat_room/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.bulkInsertChat_room);
router.route('/device/api/v1/chat_room/list').post(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.findAllChat_room);
router.route('/device/api/v1/chat_room/count').post(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.getChat_roomCount);
router.route('/device/api/v1/chat_room/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.getChat_room);
router.route('/device/api/v1/chat_room/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.updateChat_room);    
router.route('/device/api/v1/chat_room/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.partialUpdateChat_room);
router.route('/device/api/v1/chat_room/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.bulkUpdateChat_room);
router.route('/device/api/v1/chat_room/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.softDeleteChat_room);
router.route('/device/api/v1/chat_room/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.softDeleteManyChat_room);
router.route('/device/api/v1/chat_room/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.deleteChat_room);
router.route('/device/api/v1/chat_room/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,chat_roomController.deleteManyChat_room);

module.exports = router;
