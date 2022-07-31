const express = require('express');
const OrdersService = require('../services/order.service');
const service = new OrdersService;
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler')
const { getOrderSchema, createOrderSchema, addItemSchema} = require('../schemas/order.schema')

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const addItem = await service.addItem(body);
      res.status(201).json(addItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
