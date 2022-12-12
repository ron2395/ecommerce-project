import asyncHandler from "express-async-handler";
import Order from '../models/orderModel.js';

// @desc Create new order
// @route POST /api/orders
// @access Private

export const addOrderItems = asyncHandler(async(req, res) => {
    const { orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        totalPrice,
        discount
     } = req.body;

     if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No items in this order')
     } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          totalPrice,
          discount,
        });

        const createOrder = await order.save()

        res.status(201).json(createOrder)
     }
})

// @desc Get order by Id
// @route POST /api/orders/:id
// @access Private

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if(order){
   res.json(order)
  } else{
   res.status(404)
   throw new Error('Order not found')
  }
});

// @desc Update order to paid
// @route POST /api/orders/:id/pay
// @access Private

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.updateTime,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await Order.save()
    res.json(updatedOrder)
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @route POST /api/orders/:id/pay
// @access Private

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await Order.save()
    res.json(updatedOrder)
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Get logged in user orders
// @route POST /api/orders/myorders
// @access Private

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.json(orders)
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/admin

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders)
});