require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const institutionRoutes = require("./routes/institution.routes");
const addProduct = require("./routes/product.routes");
const payment = require("./routes/payment.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/users", institutionRoutes);
app.use("/api/users", addProduct);
app.use("/api/users", payment);

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "doabem_master",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));
