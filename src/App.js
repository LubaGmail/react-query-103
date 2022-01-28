import './App.css';
import React from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql
} from "@apollo/client";
import { selectionSetMatchesResult } from '@apollo/client/cache/inmemory/helpers';

const GET_DOGS = gql`
  query dogs {
    dogs {
      id
      breed
    }
  }
`

const GET_PHOTO = gql`
  query dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`

const App = () => {
  const client = new ApolloClient({
    uri: "https://71z1g.sse.codesandbox.io/",
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h4>Wrap components inside ApolloProvider</h4>
        <Main />
      </div>
    </ApolloProvider>
  );
}

const Main = () => {
  // setState is asynchronous, so this.state will still contain the previous values 
  //  if you try to use it right after calling setState.
  const [breed, setBreed] = React.useState(null)
  const {loading, error, data, previousData} = useQuery(
    GET_DOGS,
    {
      fetchPolicy: "network-only",              // first fetch
      nextFetchPolicy: "cache-and-network"
    }
  )

  if (loading) return 'Loading...'
  if (error) return `${error.message}`
 
  const handleChange = (ev) => {
    setBreed(ev.target.value)
    // is not updated right away
    // console.log('handleChange', breed)
  }
 
  return(
    <>
      <h4>Maintain state</h4>

      <div className='selectDiv'>
        <DogShow data={data} handleChange={handleChange}
        />
      </div>
      <div className='photoDiv'>
        {
          breed && <DogPhoto breed={breed} />
        }
      </div>
 
    </>
  )
}

const DogShow = ({data, previousData, handleChange}) => {
  // console.log('data/previousData', data, previousData)

  // const onHandleChange = (ev) => {
  //   console.log('onHangleChange', ev.target.value)
  // }

  return (
    <>
      <h4>Dog Show</h4>
      <div className="custom-select">

        <select name='dogs'
          onChange={handleChange}
        >
          {
            data.dogs.map((el) => (
              <option key={el.id}
                value={el.breed}
              >
                {el.breed}
              </option>
            ))
          }

        </select>
      </div>

    </>
  )
}

const DogPhoto = ({breed}) => {
  // correct value here
  // console.log('DogPhoto', breed)
 
  const {loading, error, data, previousData, networStatus} = useQuery(
    GET_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
    }
  )

  if (loading) return 'Loading...';
  if (error) return `${error.message}`
  // console.log('data', data)

  return (
    <>
      <div>
        <img src={data.dog.displayImage}  />
      </div>
    </>
  )

}

export default App;
