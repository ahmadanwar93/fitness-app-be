const app = require("./src/app");
const { sequelize, User, Member } = require("./src/models");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: false });

    // app.listen(PORT, () => {
    //   console.log(`✓ Server running on http://localhost:${PORT}`);
    // });
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`✓ Ready to accept connections`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
