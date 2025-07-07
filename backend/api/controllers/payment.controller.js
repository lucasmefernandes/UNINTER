const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Receipt = require("../models/receipt.model");
const Sale = require("../models/sale.model");
const User = require("../models/user.model");

exports.createCheckoutSession = async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "brl",
      product_data: {
        name: product.name,
        images: [product.imageUrl],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.unit || 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:4200/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:4200/payment/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Erro ao criar sessão:", err);
    res.status(500).json({ error: "Erro ao criar sessão" });
  }
};

exports.confirmPayment = async (req, res) => {
  const { stripeSessionId, cartProducts } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    const user = await User.findById(cartProducts[0]?.institutionId).select(
      "name"
    );

    const institution = user;
    if (!institution) {
      return res
        .status(400)
        .json({ error: "Instituição não encontrada nos produtos." });
    }

    const receiptData = {
      userId: institution._id,
      institutionId: institution._id,
      institutionName: institution.name,
      products: cartProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl,
        unit: p.unit || 1,
      })),
      total: session.amount_total / 100,
      status: session.payment_status,
    };

    const receipt = await Receipt.create(receiptData);

    for (const p of cartProducts) {
      await Sale.create({
        productId: p.id,
        productName: p.name,
        institutionId: institution.id,
        quantity: p.unit || 1,
        receiptId: receipt._id,
      });
    }

    return res
      .status(201)
      .json({ message: "Pagamento confirmado e recibo salvo com sucesso." });
  } catch (err) {
    console.error("Erro ao confirmar pagamento e salvar recibo:", err);
    return res
      .status(500)
      .json({ error: "Erro ao salvar dados do pagamento." });
  }
};

exports.getMySales = async (req, res) => {
  const userId = req.userId;

  try {
    const sales = await Sale.find({ institutionId: userId });
    const result = Object.values(sales);
    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar vendas:", err);
    res.status(500).json({ error: "Erro ao buscar vendas." });
  }
};
