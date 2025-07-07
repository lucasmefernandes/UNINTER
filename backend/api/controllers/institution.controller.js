const User = require("../models/user.model");

exports.getInstitutions = async (req, res) => {
  try {
    const institutions = await User.find({}, "_id name description imageUrl"); // <- apenas os campos desejados

    const result = institutions.map(inst => ({
      id: inst._id,
      name: inst.name,
      description: inst.description,
      imageUrl: inst.imageUrl
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error("Erro ao buscar instituições:", err);
    res.status(500).json({ error: "Erro ao buscar instituições." });
  }
};
