const express = require('express');
const router = express.Router();
const { getAllKeys, removeByKey } = require('../controllers/cache')

router.get('/keys', getAllKeys);
router.delete('/keys/:id', removeByKey);


module.exports = router;