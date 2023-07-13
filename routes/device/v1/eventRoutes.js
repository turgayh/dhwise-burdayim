/**
 * eventRoutes.js
 * @description :: CRUD API routes for event
 */

const express = require('express');
const router = express.Router();
const eventController = require('../../../controller/device/v1/eventController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/event/create').post(auth(PLATFORM.DEVICE),checkRolePermission,eventController.addEvent);
router.route('/device/api/v1/event/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,eventController.bulkInsertEvent);
router.route('/device/api/v1/event/list').post(auth(PLATFORM.DEVICE),checkRolePermission,eventController.findAllEvent);
router.route('/device/api/v1/event/count').post(auth(PLATFORM.DEVICE),checkRolePermission,eventController.getEventCount);
router.route('/device/api/v1/event/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,eventController.getEvent);
router.route('/device/api/v1/event/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,eventController.updateEvent);    
router.route('/device/api/v1/event/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,eventController.partialUpdateEvent);
router.route('/device/api/v1/event/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,eventController.bulkUpdateEvent);
router.route('/device/api/v1/event/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,eventController.softDeleteEvent);
router.route('/device/api/v1/event/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,eventController.softDeleteManyEvent);
router.route('/device/api/v1/event/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,eventController.deleteEvent);
router.route('/device/api/v1/event/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,eventController.deleteManyEvent);

module.exports = router;
