
const cacheService = require("../services/cache")

async function getValueByKey(req, res, next) {

    try {
        const { key } = req.params

        const value = await cacheService.getValueByKey(key)

        if (value) res.status(200).json(value);
        else res.sendStatus(404)
    } catch (error) {
        next(error);
    }

}

async function getAllKeys(req, res, next) {

    try {
        const keys = await cacheService.getAllKeys()

        res.status(200).json(keys);
    } catch (error) {
        next(error);
    }

}


async function upsertKeyValue(req, res, next) {

    try {
        const { key, value, ttl } = req.body

        const result = await cacheService.upsertKeyValue({ key, value, ttl })

        if (result) res.sendStatus(200);
        else res.sendStatus(201);
    } catch (error) {
        next(error);
    }

}

async function removeByKey(req, res, next) {

    try {
        const { id } = req.params

        const result = await cacheService.removeByKey(id)

        if (result) res.sendStatus(200);
        else res.sendStatus(404)
    } catch (error) {
        next(error);
    }

}

async function removeAllKeys(req, res, next) {

    try {
        const count = await cacheService.removeAllKeys()
        res.status(200).json(count);
    } catch (error) {
        next(error);
    }

}


module.exports = {
    getValueByKey,
    getAllKeys,
    upsertKeyValue,
    removeByKey,
    removeAllKeys
};