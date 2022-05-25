const Cache = require('../models/cache')
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger')
const { isExpired } = require('../utils/helper')

/**
 * Fetches the value against key
 * If not found, creates a random uuid, stores and returns it.
 * @param {String} key 
 * @returns Value against the key
 */
async function getValueByKey(key) {
    let { _id, value, ttl, updatedAt } = await Cache.findOne({ key }) || {}

    //if the value is found and is expired. delete it from the database
    if (_id) {
        // remove it existing from cache
        if (isExpired(updatedAt, ttl)) {
            await Cache.deleteOne({ _id })
            value = null
        }
        //refresh TTL
        else {
            await Cache.findOneAndUpdate({ _id })
        }
    }


    if (value) {
        logger.info(`Cache hit - ${key}`)
    }
    else {
        logger.info(`Cache miss - ${key}`)
        value = uuidv4()
        await createKeyValue(key, value)
    }
    return value
}

// Function to fetch list of all keys
async function getAllKeys() {
    const data = await Cache.find({}).select('key');
    return data.map(d => d.key)
}

/**
 * Function to upsert key value pair
 * @param {Object} values to be upserted 
 * @returns returns 1 if existing updated and 0 if new created
 */
async function upsertKeyValue({ key, value, ttl }) {
    const { modifiedCount } = await Cache.updateOne({ key }, { key, value, ttl })
    if (modifiedCount === 0) await createKeyValue(key, value, ttl)
    return modifiedCount
}

/**
 * function to remove a key by id (key)
 * @param {*} id 
 * @returns Boolean
 */
async function removeByKey(id) {
    const { deletedCount } = await Cache.deleteOne({ key: id })
    return deletedCount
}

/**
 * function to remove all keys
 * @returns Number of keys removed
 */
async function removeAllKeys() {
    const { deletedCount } = await Cache.deleteMany()
    return deletedCount
}

/**
 * Function to insert key value store
 * It caters the maximum cache limit by overwriting the oldest (based on updatedAt) in case of overflow
 * @param {String} key 
 * @param {Any} value 
 * @param {Number} ttl 
 */
async function createKeyValue(key, value, ttl) {
    const documentCount = await Cache.countDocuments()
    if (documentCount < process.env.MAX_CACHE_ITEMS) {
        await Cache.create({ key, value, ttl })
    }
    else {
        await Cache.findOneAndUpdate({}, { key, value, ttl }, { sort: { 'updatedAt': 1 } })
    }
}

module.exports = {
    getValueByKey,
    getAllKeys,
    upsertKeyValue,
    removeByKey,
    removeAllKeys
}