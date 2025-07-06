const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

exports.register = async (req, res) => {
  try {
    const { name, email, password, description, imageUrl } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "E-mail já cadastrado" });

    // 🔽 Gera um slug baseado no nome
    let baseSlug = slugify(name, { lower: true, strict: true });
    let uniqueId = baseSlug;

    // 🔁 Verifica se já existe alguém com esse slug
    let counter = 1;
    while (await User.findOne({ uniqueId })) {
      uniqueId = `${baseSlug}-${counter++}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      description,
      imageUrl,
      uniqueId,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        uniqueId: newUser.uniqueId,
      },
    });
  } catch (err) {
    console.error("Erro ao registrar:", err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se os campos foram enviados
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    // Busca o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Compara a senha enviada com a senha do banco
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    // Retorna o token e dados básicos
    res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno ao fazer login." });
  }
};
