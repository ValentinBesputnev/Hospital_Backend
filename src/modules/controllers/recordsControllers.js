const jwt = require("jsonwebtoken");
const Record = require("../../schema/recordsSchema");
const secret = process.env.secret;

module.exports.getAllRecords = async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(404).send("Error");
  }
  try {
    const allRec = await jwt.verify(token, secret);
    if (allRec) {
      Record.find({ userId: allRec.id })
        .then((result) => {
          res.send({ data: result });
        })
        .catch((e) => {
          res.status(404).send("Error");
        });
    }
  } catch (e) {
    res.status(404).send("Error getting all records");
  }
};
