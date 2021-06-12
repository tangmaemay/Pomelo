'use strict';

const Hapi = require('@hapi/hapi');
const HapiReactViews = require('hapi-react-views');
const { Octokit } = require("@octokit/rest");
const parse = require('parse-link-header')

require('@babel/register')({
    presets: ['@babel/preset-react', '@babel/preset-env']
});

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(require('@hapi/vision'));

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'templates',
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

    // --------------- Part 2 -------------------------------
    server.route({
        method: 'GET',
        path: '/search',
        handler: async (req, h) => {
            const page = req.query.page ? req.query.page : 1
            let link = ""
            let first = "/search?page=", prev = "/search?page=", next = "/search?page=", last = "/search?page="

            // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
            const octokit = new Octokit({ auth: [PERSONAL_ACCESS_TOKEN] });

            const res = await octokit.request('GET /search/repositories',{
                q: 'nodejs',
                per_page: 100,
                page: page
            })
            
            link = parse(res.headers.link)

            first += link?.first?.page ? link.first.page : ""
            prev += link?.prev?.page ? link.prev.page : ""
            next += link?.next?.page ? link.next.page : ""
            last += link?.last?.page ? link.last.page : ""
            
            return h.view('index',{
              repos: res.data.items,
              page: page,
              link: {
                first: first,
                prev: prev,
                next: next,
                last: last
              }
            })
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