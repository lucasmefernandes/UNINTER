const express = require("express");
const router = express.Router();
const institutionController = require("../controllers/institution.controller");

router.get("/institutions", institutionController.getInstitutions);

module.exports = router;
