import React from 'react';
import ReactDOM from 'react-dom';
import {RootSession} from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={users}><RootSession /></ApolloProvider>,
       div);
  ReactDOM.unmountComponentAtNode(div);
});
