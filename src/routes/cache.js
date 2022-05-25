const express = require('express');
const router = express.Router();
const { getValueByKey, getAllKeys, upsertKeyValue, removeByKey, removeAllKeys } = require('../controllers/cache')
const { upsertKeyValueValidation } = require('../middlewares/validations/cache')

router.get('/values/:key', getValueByKey);
router.get('/keys', getAllKeys);
router.put('/', upsertKeyValueValidation, upsertKeyValue);
router.delete('/keys/:id', removeByKey);
router.delete('/keys', removeAllKeys);


module.exports = router;