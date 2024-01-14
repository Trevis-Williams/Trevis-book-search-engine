import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your Apollo server URI
  cache: new InMemoryCache(),
});



// function App() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar/>
        {Outlet}
      </div>
    </ApolloProvider>
  );
}
export default App;
