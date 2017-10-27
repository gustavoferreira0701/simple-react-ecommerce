(async function () {
    let server = require("./server/server");

    await server.Start();

    let app = server.GetApp(),
        port = process.env.port || 4000;

    app.listen(port,()=>{
        console.info(`The shit happens on ${port}`);
    });

}());
