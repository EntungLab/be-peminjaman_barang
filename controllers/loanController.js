const Loan = require('../models/Loan');
const Item = require('../models/Item');

exports.createLoan = async (req, res) => {
  try {
    const { item_id, quantity_borrowed, due_date } = req.body;
    const item = await Item.findByPk(item_id);

    if (!item || item.quantity < quantity_borrowed) {
      return res.status(400).json({ message: 'Barang tidak tersedia atau jumlah tidak mencukupi' });
    }

    const loan = await Loan.create({
      user_id: req.user.id,
      item_id,
      quantity_borrowed,
      loan_date: new Date(),
      due_date,
      status: 'pending',
    });

    item.quantity -= quantity_borrowed;
    await item.save();

    res.status(201).json({ message: 'Peminjaman berhasil dibuat', loan });
  } catch (error) {
    res.status(400).json({ message: 'Gagal membuat peminjaman', error: error.message });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({ where: { user_id: req.user.id } });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data peminjaman', error: error.message });
  }
}; 