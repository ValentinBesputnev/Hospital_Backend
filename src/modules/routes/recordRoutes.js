const Router = require("express");
const router = new Router;

const {
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/recordsControllers');

router.get('/allRecords', getAllRecords);
router.post('/createRecord', createRecord);
router.patch('/updateRecord', updateRecord);
router.delete("/deleteRecord", deleteRecord);

module.exports = router;