import Order from '../models/Order';
import createPDF from '../libs/pdf-creator';

export const createOrder = async (req, res) => { // Guardar una Orden
    try {
        const { products, total } = req.body;
        const order = new Order({
            products,
            total,
            user: req.userId
        });
        order.file = await createPDF(order)
        const savedOrder = await order.save();
        res.status(200).json({
            message: "Orden guardada Correctamente",
            savedOrder
        })
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            error
        })
    }
}

export const readOrder = async (req, res) => {  // leer una orden
    try {
        const id = req.params.id;
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (error) {
      res.status(500).json({
        message: "Ha ocurrido un error",
        error,
      });
    }
  };

  export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.userId});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
            error,
          });
    }
};