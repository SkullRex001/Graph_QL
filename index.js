const express = require('express')
const {ApolloServer} = require('@apollo/server')
const { expressMiddleware} = require('@apollo/server/express4')

const cors = require('cors')

async function startServer(){
    const app = express()
    const server = new ApolloServer({
        typeDefs : `
        type Todo {
            id : ID!
            title : String!
            completed : Boolean
        }

        type Query {
            getTodos : [Todo]
        }
        `,
        resolvers : {
            Query : {
                getTodos : async () => {
                    const data = await fetch('https://jsonplaceholder.typicode.com/todos')
                    const res = await data.json()
                    return res
                }
            }
        }
    })
    app.use(express.json())
    app.use(cors())
    await server.start()
    app.use("/graphql" , expressMiddleware(server))
    app.listen(8000 , ()=>{
        console.log("Server Started at 8000")
    })
    
}

startServer()

