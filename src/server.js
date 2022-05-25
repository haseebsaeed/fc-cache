require('./init')

const express = require('express');
const app = express();

const eventEmitter = require('./utils/event')
const { DB_CONNECTION_EVENT } = require('./utils/constants')

const logger = require('./logger')
const cache = require('./routes/cache')
const errorsMiddlware = require('./middlewares/error')

app.use(express.json());

/** Endpoint to check status of the service. */
app.get('/api/status', async (req, res) => res.status(200).json({ message: "Cache service is up and running." }));

app.use('/api/cache', cache)

/** Error handler middleware */
app.use(errorsMiddlware);

PORT = process.env.PORT || 80

eventEmitter.on(DB_CONNECTION_EVENT, async () => {
    app.listen(PORT, () => logger.info(`Listening at port ${PORT}`));

})

module.exports = app;