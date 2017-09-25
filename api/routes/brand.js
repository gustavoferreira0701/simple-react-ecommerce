const validation = require('../helpers/validation_helper'),
      http_status = require('../helpers/http_status_helper'),
      virtualPath = '/brand',
      brand = (function (){
    
    let _db, _app;

    async function get(request, response){
      try {
          let data = await _db.brand.findAll();
          response.status(http_status.OK);
          response.json(data);
      } catch (error) {
          console.error("Houve um erro: ", error);
          response.json("{}");
      }
    }

    async function getWithParameters(request, response){
        try {
            let paramId = request.params.id;            
            let data = await _db.brand.find({
                where:{ id: paramId }
            });
            response.status(http_status.OK);
            response.json(data);
        } catch (error) {
            console.error("Houve um erro: ", error);
            response.status(http_status.ServerError);
            response.json("{}");
        }
    }

    async function post(request, response){
        try {
            let incomingData = request.body;
            let validation = isValid(incomingData, "post");

            if(!validation.valid){
                response.status(http_status.ValidationError);
                response.json(validation.messages);
            }else{

                let data = await _db.brand.update({
                    name:incomingData.name,
                    updatedAt:Date.now()
                }, {
                    where:{
                        id:incomingData.id
                    }
                });

                response.status(http_status.OK);
                response.json(data);
            }
        } catch (error) {
            console.error("Houve um erro: ", error);
            response.status(http_status.ServerError);
            response.json("{}");
        }
        
    }

    async function put(request, response){
        try {
            let incomingData = request.body;
            let validation = isValid(incomingData, "put");

            if(!validation.valid){
                response.status(http_status.ValidationError);
                response.json(validation.messages);
            }else{
                let data = await _db.brand.create({
                    name:incomingData.name,
                    createdAt:Date.now()
                });
                response.status(http_status.OK);
                response.json(data);
            }
        } catch (error) {
            console.error("Houve um erro: ", error);
            response.status(http_status.ServerError);
            response.json("{}");
        }
    }

    async function remove(request, response){
        try {
            let incomingData = request.body;
            let validation = isValid(incomingData, "delete");

            if(!validation.valid){
                response.status(http_status.ValidationError);
                response.json(validation.messages);
            }else{
                let data = await _db.brand.destroy({
                    where:{
                        id:incomingData.id
                    }
                });
                response.status(http_status.OK);
                response.json(data);
            }
        } catch (error) {
            console.error("Houve um erro: ", error);
            response.status(http_status.ServerError);
            response.json("{}");
        }
    }    
    
    function isValid(brand, operationMethod) {
        if(typeof operationMethod === "undefined" || operationMethod === null || operationMethod === ''){
            console.error("cai aqui");
            return new validation(false, "Please, provide a valid operation method");
        }

        if(brand === null)
            return new validation(false, "Please, fill the brand data before change it");
        if((brand.id === null||brand.id === 0) && ['post', 'delete'].some((data)=>{ return data === operationMethod.toLowerCase(); }))  {
            return new validation(false, "Please, provide a valid brand id to update it or delete it");
        }
        if(['post', 'put'].some((data)=>{ return data === operationMethod.toLowerCase(); }) && (typeof brand.name === "undefined" || brand.name === null || brand.name.trim() === ''))
            return new validation(false, "It's necessary fill brand name information");

        return new validation(true, "The Information is valid");
    }

    return {
        Start:(db, application)=>{
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

