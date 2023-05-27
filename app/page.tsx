"use client"
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.baseql.com/airtable/graphql/appm9irOhShJEB3rX',
  cache: new InMemoryCache(),
});

const MyQuery = gql`
  query MyQuery($_page: JSON = "", $_order_by: JSON = "product") {
    pagina1(_page: $_page, _order_by: $_order_by) {
      photos
      minimumPrice
      id
      price
      product
      soldPrice
      description
    }
  }
`;

const GraphQLExample = () => {
  const { loading, error, data } = useQuery(MyQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.pagina1.filter( item => (item.soldPrice===null || item.soldPrice===0) ).filter(prod => prod.photos && prod.photos.length > 0);
    

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {products.map((item) => (
          <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' key={item.id}>
            <img src={item.photos[0].url} alt={item.product} className="p-0 max-h-[250px] mx-auto" />
            
            <div className="px-5 py-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.product}
              </h5>
        
              <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">R$ {item.price},00</span>
                  
                  <a target='_blank' href={`https://api.whatsapp.com/send?phone=5524981294881&text=Tenho interesse no produto ${item.product} `} className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Comprar</a>
              </div>
          </div>
          </div>
      ))}
    </div>
  );
};

const MyComponent = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        {/* <h1>My Component</h1> */}
        <GraphQLExample />
      </div>
    </ApolloProvider>
  );
};

export default MyComponent;
