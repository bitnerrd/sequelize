const db = require("../config");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Insert
const _create = async (req, res) => {
  const { code, title, description } = req.body;
  if (!code || !title || !description) {
    res.send("Invalid Request");
  } else {
    try {
      const existingObject = await Tutorial.findOne({
        where: { title: title },
      });
      if (existingObject) {
        res.send(`Requested Resource already exists`);
      } else {
        const tutorial = {
          code: code,
          title: title,
          description: description,
        };
        const createdObject = await Tutorial.create(tutorial);
        if (createdObject) {
          res.send(`Object Successfully created`);
        } else {
          res.send(`Internal Server Error Occurred`);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
};

// Retrieve All
const _findAll = async (req, res) => {
  await Tutorial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err.message || err);
    });
};

// Retrieve One
const _findOne = async (req, res) => {
  const code = req.params.code;
  await Tutorial.findByPk(code)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("Error Occured with Requested Resource");
      }
    })
    .catch((err) => {
      console.log(err.message || err);
      res.send(err.message || err);
    });
};

// Update
const _update = async (req, res) => {
  const code = req.params.code;
  const description = req.body.description;
  Tutorial.update({ description: description }, { where: { code: code } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("Error Occured with Requested Resource");
      }
    })
    .catch((err) => {
      console.log(err.message || err);
    });
};

// Delete
const _delete = (req, res) => {};

//Delete All
const _deleteAll = async (req, res) => {
  await Tutorial.destroy({
    where: {},
    truncate: false,
  }).then((data) => {
    if (data) {
      res.send("Collection Deleted Success");
    } else {
      res.send("Error Occured with Requested Resource");
    }
  });
};
module.exports = {
  _create,
  _findAll,
  _findOne,
  _update,
  _delete,
  _deleteAll,
};
