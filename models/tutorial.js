module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define(
    "tutorial",
    {
      code: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Tutorial;
};
