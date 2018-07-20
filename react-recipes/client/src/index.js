import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';


// GraphQL/Apollo Setup
// === === === === === === ===
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: "http://localhost:4444/graphql"
});

ReactDOM.render(
    <ApolloProvider client = { client }>
        <App />
    </ApolloProvider>,
    
    document.getElementById('root')
);

// ***

// Original
// ReactDOM.render(<App />, document.getElementById('root'));
