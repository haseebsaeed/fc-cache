const Cache = require('../models/cache')

async function getAllKeys() {
    const data = await Cache.find({}).select('key -_id');
    return data.map(d => d.key)
}

async function removeByKey(id) {
    const { deletedCount } = await Cache.deleteOne({ key: id })
    return deletedCount
}


module.exports = {
    getAllKeys,
    removeByKey
}