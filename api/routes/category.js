const validation = require('../helpers/validation_helper'),
      http_status = require('../helpers/http_status_helper'),
      virtualPath = '/api/category';

const category = (function (_db, _app){
    async function get(request, response) {
        try {
            let data = await _db.category.findAll();
            response.status(http_status.OK);
            response.json(data);
        } catch (error) {                
            response.json(error);
        }
    }

    async function getWithParameters(request, response) {
        try {            
            let paramId = request.params.id;
            let data = await _db.category.find({ 
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

                let data = await _db.category.update({
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
                let data = await _db.category.create({
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
                let data = await _db.category.destroy({
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

    function validate(category) {

        let validationResult = new validation();

        if (category === null)
            validationResult.addMessage("Please, fill the category data before change it");
        if (typeof category.name === "undefined" || category.name === null || category.name.trim() === '')
            validationResult.addMessage(false, "It's necessary fill category name information");

        return validationResult;
    }

    return {
        Start: (db, application) => {

            console.info("Starting Category Route");

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

module.exports = category;