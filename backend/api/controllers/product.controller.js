const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.addProduct = async (req, res) => {
  const userId = req.userId; // JWT middleware
  const { name, price, imageUrl } = req.body;

  if (!name || typeof price !== "number" || !imageUrl) {
    return res
      .status(400)
      .json({ error: "Nome, preço e imagem são obrigatórios." });
  }

  try {
    const user = await User.findById(userId).select("name");
    if (!user)
      return res.status(404).json({ error: "Instituição não encontrada." });

    const newProduct = new Product({
      name,
      price,
      imageUrl,
      institution: {
        id: user._id,
        name: user.name,
      },
    });

    await newProduct.save();

    res.status(201).json({
      message: "Produto criado com sucesso.",
      product: newProduct,
    });
  } catch (err) {
    console.error("Erro ao adicionar produto:", err);
    res.status(500).json({ error: "Erro interno ao adicionar produto." });
  }
};

exports.getProductsByInstitution = async (req, res) => {
  const { institutionId } = req.params;

  try {
    const productsAll = await Product.find({
      "institution.id": institutionId,
    }).sort({ createdAt: -1 });

    if (productsAll.length === 0) {
      return res.status(200).json({ products: [], institution: null });
    }

    // Obtem dados reais da instituição do banco
    const institutionUser = await User.findById(institutionId).select(
      "name _id"
    );

    if (!institutionUser) {
      return res.status(404).json({ error: "Instituição não encontrada." });
    }

    const products = productsAll.map(({ _doc }) => {
      const { institution, ...rest } = _doc;
      return rest;
    });

    const institution = {
      id: institutionUser.id,
      name: institutionUser.name,
    };

    res.status(200).json({ products, institution });
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ error: "Erro ao buscar produtos da instituição." });
  }
};

exports.getMyProducts = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId, "products name");
    const productsAll = await Product.find({ "institution.id": userId }).sort({
      createdAt: -1,
    });
    if (productsAll.length === 0) {
      return res.status(200).json({ products: [], institution: null });
    }
    const products = productsAll.map(({ _doc }) => {
      const { institution, ...rest } = _doc;
      return rest;
    });

    if (!user) {
      return res.status(404).json({ error: "Instituição não encontrada." });
    }

    res.json({
      institutionName: user.name,
      products: products || [],
    });
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};
