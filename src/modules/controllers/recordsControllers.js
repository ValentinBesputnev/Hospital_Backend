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

module.exports.updateRecord = async (req, res) => {
  const { token } = req.headers;
  const body = req.body;
  try {
    const allRec = await jwt.verify(token, secret);

    if (
      (body._id && allRec && body.hasOwnProperty("namePatient")) ||
      body.hasOwnProperty("doctor") ||
      body.hasOwnProperty("date") ||
      body.hasOwnProperty("complaints")
    ) {
      Record.updateOne({ _id: body._id }, body).then((result) => {
        Record.find({ userId: allRec.id }).then((result) => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(404).send("Error edit record");
    }
  } catch (error) {
    res.status(404).send("Error edit");
  }
};

module.exports.deleteRecord = async (req, res) => {
  const { token } = req.headers;
  const id = req.query._id;
  try {
    const allRec = await jwt.verify(token, secret);
    if (req.query._id && allRec) {
      Record.deleteOne({ _id: id }).then((result) => {
        Record.find({ userId: allRec.id }).then((result) => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(404).send("Error");
    }
  } catch (error) {
    res.status(404).send("Error");
  }
};