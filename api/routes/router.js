const directoryHelper = require('../helpers/directory_helper');

const router = (function _router(){

    let _db, _app;
    
    async function register(db, app){
        try {
            _db = db;
            _app = app;

            await getRoutes('./routes');
        } catch (error) {
            console.error("Houve um erro aqui: ", error);
        }
    }

    async function getRoutes(directory){
        try {
            let files = await directoryHelper.GetFilesAsync(directory);
            
            files.filter(filterRoutes)
                 .forEach(processRoutes);
        } catch (error) {
            console.error("Houve um erro aqui: ", error);
        }
    }

    function processRoutes(element, index){
        let path = `./${element}`,
        route = require(path);
        route.Start(_db, _app);
    }

    function filterRoutes(element, index){
        return element !== null && element.toLowerCase() !== "router.js";
    }

    return {
        Register:register
    };
}());

module.exports = router;