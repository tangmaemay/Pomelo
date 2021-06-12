# Pomelo

1. Install the packages
        npm install

2. Replace [PERSONAL_ACCESS_TOKEN] with your github PERSONAL_ACCESS_TOKEN 
        Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

3. Run
        npm start

3. Request
    3.1 Rearrange tree
        method: 'POST'
        path: '/'
        body: JSON formatted input as in Appendix 1 input
        example: http://localhost:3000/
        description: Part 1 solution

    3.2 Display repositories'name in search of 'nodejs'
        method: 'GET'
        path: '/search'
        params: page(optional) default = 1
        example: http://localhost:3000/search, http://localhost:3000/search?page=1
        description: Part 2 solution