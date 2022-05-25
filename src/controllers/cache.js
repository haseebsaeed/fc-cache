
const cacheService = require("../services/cache")

async function getAllKeys(req, res, next) {

    try {
        const keys = await cacheService.getAllKeys()

        res.status(200).json(keys);
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


module.exports = {
    getAllKeys,
    removeByKey
};