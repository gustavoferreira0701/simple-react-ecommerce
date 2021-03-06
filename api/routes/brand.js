const validation = require('../helpers/validation_helper'),
    http_status = require('../helpers/http_status_helper'),
    virtualPath = '/api/brand',
    brand = (function (_db, _app) {        

        async function get(request, response) {
            try {
                let data = await _db.brand.findAll();
                response.status(http_status.OK);
                response.json(data);
            } catch (error) {                
                response.json(error);
            }
        }

        async function getWithParameters(request, response) {
            try {
                let paramId = request.params.id;
                let data = await _db.brand.find({ 
                    where: { id: paramId }
                });
                response.status(http_status.OK);
                response.json(data);
            } catch (error) {                
                response.status(http_status.ServerError);
                response.json(error);
            }
        }

        async function post(request, response) {
            try {
                let incomingData = request.body;
                let validation = validate(incomingData);

                if (!validation.isValid()) {
                    response.status(http_status.ValidationError);
                    response.json(validation.messages);
                } else {

                    let data = await _db.brand.update({
                        name: incomingData.name,
                        updatedAt: Date.now()
                    }, {
                            where: {
                                id: incomingData.id
                            }
                        });

                    response.status(http_status.OK);
                    response.json(data);
                }
            } catch (error) {                
                response.status(http_status.ServerError);
                response.json(error);
            }

        }

        async function put(request, response) {
            try {
                let incomingData = request.body;
                let validation = validate(incomingData);

                if (!validation.isValid()) {
                    response.status(http_status.ValidationError);
                    response.json(validation.messages);
                } else {
                    let data = await _db.brand.create({
                        name: incomingData.name,
                        createdAt: Date.now()
                    });
                    response.status(http_status.OK);
                    response.json(data);
                }
            } catch (error) {                
                response.status(http_status.ServerError);
                response.json(error);
            }
        }

        async function remove(request, response) {
            try {
                let incomingData = request.body;
                let validation = validate(incomingData);

                if (!validation.isValid()) {
                    response.status(http_status.ValidationError);
                    response.json(validation.messages);
                } else {
                    let data = await _db.brand.destroy({
                        where: {
                            id: incomingData.id
                        }
                    });
                    response.status(http_status.OK);
                    response.json(data);
                }
            } catch (error) {
                console.error("Houve um erro: ", error);
                response.status(http_status.ServerError);
                response.json(error);
            }
        }

        function validate(brand) {

            let validationResult = new validation();

            if (brand === null)
                validationResult.addMessage("Please, fill the brand data before change it");
            if (typeof brand.name === "undefined" || brand.name === null || brand.name.trim() === '')
                validationResult.addMessage(false, "It's necessary fill brand name information");

            return validationResult;
        }

        return {
            Start: (db, application) => {

                console.info("Starting Brand Route");

                _db = db;
                _app = application;

                application.get(virtualPath, get);
                application.put(virtualPath, put);
                application.post(virtualPath, post);
                application.delete(virtualPath, remove);
                application.get(`${virtualPath}/:id`, getWithParameters);
            }
        };
    }());

module.exports = brand;

