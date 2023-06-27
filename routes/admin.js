const express = require("express");
const router = express.Router();
const {
  _create,
  _findAll,
  _findOne,
  _deleteAll,
  _update,
} = require("../controllers/tutorial");

router.post("/create", _create);
router.post("/findAll", _findAll);
router.get("/findOne/:code", _findOne);
router.get("/deleteAll", _deleteAll);
router.put("/update/:code", _update);

module.exports = router;
