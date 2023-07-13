/**
 * orderController.js
 * @description : exports action methods for order.
 */

const Order = require('../../../model/order');
const orderSchemaKey = require('../../../utils/validation/orderValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};