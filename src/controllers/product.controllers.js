import Product from '../models/Product';
import fs from 'fs-extra';
import path from 'path';

export const createProduct = async (req, res) => {
    try {
        const { name, uprice } = req.body;
        const product = new Product({
            name,
            uprice,
            image: req.file.path,
            user: req.userId
        });
        await product.save();
        res.status(200).json({
            message: "Producto guardado",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: " ha  ocurrido un error",
            error
        });
    }
}

export const readProduct = async (req, res) => {
    try {
        const id = req.params.id; /** id  del producto por medio url  */
        const product = await Product.findById(id); /**consulta a la base de datos  */
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un Error",
            error,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id,
            { name, uprice } = req.body;
        if (req.file) { // conservando los datos de la imagen
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, uprice, image: req.file.path },
                { new: true } // para que  retorne los objectos con ls nuevos datos
            );
            res.status(200).json({
                message: "Producto modificado",
                updatedProduct,
            });
        } else {
            const updatedProduct = await Product.findByIdAndUpdate( // onservar la  misma  imagen
                id,
                { name, uprice },
                { new: true }
            );
            res.status(200).json({
                message: "Producto modificado",
                updatedProduct,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un Error",
            error,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id); /** borrar un producto  */
        if (deleteProduct) {
            await fs.unlink(path.resolve(deletedProduct.image));  /* borrar la imagen en la  carpeta  */
        }
        res.status(200).json({
            message: "Producto eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un Error",
            error,
        });
    }m
};

   export const getProducts = async (req, res) => {
     try {
         const products = await Product.find({user: req.userId}).sort("name"); /**Todos los Productos del usuario// ordenado*/
         res.status(200).json(products);
     } catch (error) {
         res.status(500).json({
             message: "Ha ocurrido un Error",
             error,
           });
     }
 }

