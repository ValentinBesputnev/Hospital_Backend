const Record = require("../../schema/recordsSchema");
const jwt = require("jsonwebtoken");
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

module.exports.createRecord = async (req, res) => {
  const { token } = req.headers;
  const { body } = req;
  if (!token) {
    res.status(404).send("Error");
  }
  try {
    const allRec = await jwt.verify(token, secret);
    if (body && allRec) {
      body.userId = allRec.id;
      const newReceord = new Record(body);
      newReceord
        .save()
        .then((result) => {
          res.send({ data: result });
        })
        .catch((e) => {
          res.status(404).send("Error");
        });
    } else {
      res.status(422).send("Error! Params not correct");
    }
  } catch (e) {
    res.status(404).send("Error, new record not created");
  }
};
