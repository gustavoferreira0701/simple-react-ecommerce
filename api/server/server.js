const express = require("express"),
    body_parser = require('body-parser'),
    morgan = require('morgan'),
    db = require('../db/db'),
    router = require('../routes/router'),
    application = express();

const server = (function () {
        async function start() {
            application.use(body_parser.urlencoded({ extended: false }));

            application.use(body_parser.json());

            application.use(morgan('combined'));

            await db.SyncDB();

            let models = db.GetModels();

            await router.Register(models, application);
        }

        return {
            GetApp: () => { return application; },
            Start: start
        }
}());

module.exports = server;