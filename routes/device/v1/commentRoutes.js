/**
 * commentRoutes.js
 * @description :: CRUD API routes for comment
 */

const express = require('express');
const router = express.Router();
const commentController = require('../../../controller/device/v1/commentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/comment/create').post(auth(PLATFORM.DEVICE),checkRolePermission,commentController.addComment);
router.route('/device/api/v1/comment/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,commentController.bulkInsertComment);
router.route('/device/api/v1/comment/list').post(auth(PLATFORM.DEVICE),checkRolePermission,commentController.findAllComment);
router.route('/device/api/v1/comment/count').post(auth(PLATFORM.DEVICE),checkRolePermission,commentController.getCommentCount);
router.route('/device/api/v1/comment/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,commentController.getComment);
router.route('/device/api/v1/comment/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,commentController.updateComment);    
router.route('/device/api/v1/comment/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,commentController.partialUpdateComment);
router.route('/device/api/v1/comment/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,commentController.bulkUpdateComment);
router.route('/device/api/v1/comment/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,commentController.softDeleteComment);
router.route('/device/api/v1/comment/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,commentController.softDeleteManyComment);
router.route('/device/api/v1/comment/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,commentController.deleteComment);
router.route('/device/api/v1/comment/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,commentController.deleteManyComment);

module.exports = router;
