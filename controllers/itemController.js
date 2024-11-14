const Item = require('../models/Item');
const { success, error } = require('../utils/response');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    success(res, 'Data barang berhasil diambil', items);
  } catch (err) {
    error(res, 'Gagal mengambil data barang', err.message);
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, category, quantity, condition_status, availability_status } = req.body;
    const image_url = req.file ? req.file.path : null;
    const item = await Item.create({ name, description, category, quantity, condition_status, availability_status, image_url });
    success(res, 'Barang berhasil ditambahkan', item);
  } catch (err) {
    error(res, 'Gagal menambahkan barang', err.message);
  }
}; 