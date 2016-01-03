import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import WordSearch from './containers/wordSearch'
//import configureStore from './store/configureStore'


import { createStore } from 'redux'
import wordSearchAppReducers from './reducers/wordSearch'
const store = createStore(wordSearchAppReducers);

//const store = configureStore()

render(
  <Provider store={store}>
    <WordSearch />
  </Provider>,
  document.getElementById('root')
)
