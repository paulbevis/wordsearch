import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import WordSearch from './js/containers/word-search'


import { createStore } from 'redux'
import wordSearchAppReducers from './js/reducers/word-search'
const store = createStore(wordSearchAppReducers);

render(
  <Provider store={store}>
    <WordSearch />
  </Provider>,
  document.getElementById('root')
)
