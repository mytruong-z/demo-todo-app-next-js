1. Setup: npx create-next-app nextjs-blog --use-npm --example
2. npm run dev
3. Config Typescript:
    + Create file: tsconfig.json
    + Check the node version: node -v
    + Run: npm install --save-dev typescript @types/react @types/node@10
    + Run: npm run dev (Check the tsconfig file again and see the changes. If you don’t see anything, you haven’t configured it successfully)
    + Update tsconfig: 
        * “strict”: true (It is imperative to follow the rules of typescripts)
        + Convert the files in pages into tsx and ts    


4. Graphql API router
    - npm i -S apollo-server-micro

5. Setting up a local MySQL server
    - Docker
    - Create and config docker-compose.yml file
    - docker-compose up -d
    - docker-compose stop -> docker-compose down => stop and remove
    - add package: npm i -S serverless-mysql
    - add env, type env (.env.local, custom.d.ts)
    - update file graphql.ts

6. Setting up Apollo Client
    - copy file client.js: https://github.com/vercel/next.js/blob/canary/examples/api-routes-apollo-server-and-client/apollo/client.js
    - install apollo-client: npm i -S @apollo/client
    - npm i -S graphql-tools
    - 

7. Docker vs mysql: 
    - docker-compose up -d
    - docker-compose ps
    - Thấy được tên container: ...
    - docker exec -i tencontainer sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE' < db/schema.sql
     => docker exec -i demo-next-app_mysql_1 sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE' < db/schema.sql

8. Generating types for the front end
    - create and copy code from file codegen.yml
    - npm i -D @graphql-codegen/typescript-operations
    - npm run codegen
    - npm i -D @graphql-codegen/typescript-react-apollo
9. Add styles
    - 
