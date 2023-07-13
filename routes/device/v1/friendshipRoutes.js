/**
 * friendshipRoutes.js
 * @description :: CRUD API routes for friendship
 */

const express = require('express');
const router = express.Router();
const friendshipController = require('../../../controller/device/v1/friendshipController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/friendship/create').post(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.addFriendship);
router.route('/device/api/v1/friendship/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.bulkInsertFriendship);
router.route('/device/api/v1/friendship/list').post(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.findAllFriendship);
router.route('/device/api/v1/friendship/count').post(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.getFriendshipCount);
router.route('/device/api/v1/friendship/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.getFriendship);
router.route('/device/api/v1/friendship/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.updateFriendship);    
router.route('/device/api/v1/friendship/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.partialUpdateFriendship);
router.route('/device/api/v1/friendship/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.bulkUpdateFriendship);
router.route('/device/api/v1/friendship/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.softDeleteFriendship);
router.route('/device/api/v1/friendship/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.softDeleteManyFriendship);
router.route('/device/api/v1/friendship/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.deleteFriendship);
router.route('/device/api/v1/friendship/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,friendshipController.deleteManyFriendship);

module.exports = router;
