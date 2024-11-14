const Return = require('../models/Return');
const Loan = require('../models/Loan');
const Item = require('../models/Item');

exports.createReturn = async (req, res) => {
  try {
    const { loan_id, condition_status, notes } = req.body;
    const loan = await Loan.findByPk(loan_id);

    if (!loan || loan.status !== 'approved') {
      return res.status(400).json({ message: 'Peminjaman tidak valid atau belum disetujui' });
    }

    const item = await Item.findByPk(loan.item_id);
    item.quantity += loan.quantity_borrowed;
    await item.save();

    const returnRecord = await Return.create({
      loan_id,
      return_date: new Date(),
      condition_status,
      admin_id: req.user.id,
      notes,
    });

    loan.status = 'returned';
    await loan.save();

    res.status(201).json({ message: 'Pengembalian berhasil', returnRecord });
  } catch (error) {
    res.status(400).json({ message: 'Gagal membuat pengembalian', error: error.message });
  }
}; 