import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/api/user/cart', (req, res) => {
  fs.readFile('./mock-data/cart.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send;
    }
    return res.send(JSON.parse(data));
  });
});

router.get('/api/products/:type', (req, res) => {
  fs.readFile('./mock-data/products.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send;
    }
    const products = JSON.parse(data);
    return res.send(products[req.params.type].items);
  });
});

router.get('/api/products', (req, res) => {
  fs.readFile('./mock-data/products.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send;
    }
    return res.send(JSON.parse(data));
  });
});

router.get('/test', (req, res) => {
  res.send('Test route success!');
});

export default router;
