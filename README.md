# Pomelo

1. Install the packages<br>
        <code>npm install</code>

2. Replace [PERSONAL_ACCESS_TOKEN] with your github PERSONAL_ACCESS_TOKEN in index.js line 83<br>
        Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

3. Run<br>
        <code>npm start</code>

4. Request
    <ol>
    <li>
        Part 1 solution: Rearrange tree<br>
        method: 'POST'<br>
        path: '/'<br>
        body: JSON formatted input as in Appendix 1 input<br>
        example: http://localhost:3000/<br>
    </li>
    <br>
    <li>
        Part 2 solution: Display repositories'name in search of 'nodejs'<br>
        method: 'GET'<br>
        path: '/search'<br>
        params: page(optional) default = 1<br>
        example: http://localhost:3000/search, http://localhost:3000/search?page=1<br>
    </li>
    </ol>