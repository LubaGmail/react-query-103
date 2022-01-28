npx create-react-app react-query-103
localhost:3000

doc-tut
    https://www.apollographql.com/docs/react/data/queries/

working app 
    https://codesandbox.io/s/queries-example-app-final-nrlnl

GraphiQL
    query dog($breed: String!) 
    {
        dog(breed: $breed) {
          id
          displayImage
        }
    }

setState
    setState is asynchronous, so this.state will still contain the previous values 
    if you try to use it right after calling setState.

React hooks
    React hooks like useQuery can be used ONLY inside React functional components with the capitalized name
    React hooks cannot be called conditionally


