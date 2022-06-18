## Installation
Create .env file with variables defined at .env.example. Then:
1. `npm install`
2. `npm start`


## APIs
### Posts
1. Get all post: [GET] http://localhost:3000/api/posts
2. Get post by id: [GET] http://localhost:3000/api/posts/:id
3. Create new post: [POST] http://localhost:3000/api/posts
body: {title: string, content: string, thumbnail: string}
4. Update a post: [PUT] http://localhost:3000/api/posts/:id
body: {title: string, content: string, thumbnail: string}
5. Get post by id: [DELETE] http://localhost:3000/api/posts/:id

