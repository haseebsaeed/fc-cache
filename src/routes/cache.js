const express = require('express');
const router = express.Router();
const { getValueByKey, getAllKeys, upsertKeyValue, removeByKey, removeAllKeys } = require('../controllers/cache')

router.get('/values/:key', getValueByKey);
router.get('/keys', getAllKeys);
router.put('/', upsertKeyValue);
router.delete('/keys/:id', removeByKey);
router.delete('/keys', removeAllKeys);


module.exports = router;