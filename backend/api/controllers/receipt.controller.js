const Receipt = require("../models/receipt.model");
const Sale = require("../models/sale.model");

exports.createReceipt = async (req, res) => {
  try {
    const { institutionId, institutionName, products, total, status } = req.body;
    const userId = req.user.id;

    const receipt = await Receipt.create({
      userId,
      institutionId,
      institutionName,
      products,
      total,
      status
    });

    for (const p of products) {
      await Sale.create({
        productId: p.id,
        productName: p.name,
        institutionId,
        quantity: p.unit || 1,
        receiptId: receipt._id
      });
    }

    res.status(201).json({ success: true, receipt });
  } catch (err) {
    console.error("Erro ao registrar recibo:", err);
    res.status(500).json({ error: "Erro ao salvar recibo." });
  }
};
