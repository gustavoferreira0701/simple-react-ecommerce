let fs = require('fs');

const directory_helper = (function() {
	
	function getFilesAsync(directoryBasePath) {
		return new Promise(function(resolve, reject) {

			fs.readdir(directoryBasePath, (err, data) => {
				if (err) {					
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

    return {
		GetFilesAsync:getFilesAsync
	}
}());


module.exports = directory_helper;