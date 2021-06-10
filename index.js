'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return "hello there"
        }
    })
    // --------------- Part 1 -------------------------------
    server.route({
        method: 'POST',
        path: '/',
        handler: (req, h) => {

            const input = req.payload
            let output = []

            for (let i = 0; i < Object.keys(input).length; i++) {
                const level = input[i];
                // console.log(level)
                for (let element of level) {
                    // console.log(element)
                    if(element.parent_id == null && element.level == 0){
                        if(!Array.isArray(output) || !output.length) output.push(element)
                        else {return "Error, there are more than 1 root."}
                    }
                    else{
                        if(element.parent_id == null && element.level != 0){
                            return "Error, there are node(s) that doesn't have a parent."
                        }
                        for (const predecessor of input[i-1]) {
                            if(element.parent_id == predecessor.id){
                                predecessor.children.push(element)
                            }
                        }
                    }
                }
            }

            return output
        }
    })
    // ------------------------------------------------------

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();