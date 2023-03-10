var express = require('express');
var router = express.Router();
const productModel = require('../models/productModel');

// GET Listar productos 
router.get('/', async function (req, res, next) {

  const resultado = await productModel.find();
  res.json(resultado);

});

// POST Agregar un producto
router.post('/', async function (req, res, next) {

  let datos = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    images: req.body.images
  };

  let product = new productModel(datos);
  let resultado = await product.save();

  res.send('Producto agregado exitosamente');

});


// PUT Editar o Actualizar Productos
router.put("/", async function (req, res, next) {
  const filter = {id: req.query.id}; //Condición de Query
  const update = {name: req.query.name}; //Campos a modificar


  const resultado = await productModel.findOneAndUpdate(filter, update, {
    new:true,
    upsert: true
  });


  res.json("Se actualiza el producto");
});


// DELETE Eliminar Productos
router.delete('/:id', async function (req, res, next) {
  //Buscar un producto por ID y regresa una lista
  const resul = await productModel.find({ id: req.params.id }).exec();


  //Si se encontró lo elimina
  if (resul.length > 0) {
    await productModel.deleteOne({ id: req.params.id });
    res.json("Eliminando producto");
  } else {
    res.json({ error: "No se encontró el producto con Id " + req.params.id })
  }
  res.send('Producto Eliminado');

});

module.exports = router;