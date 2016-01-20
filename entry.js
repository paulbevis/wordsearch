import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import WordSearch from './js/containers/wordSearch'


import { createStore } from 'redux'
import wordSearchAppReducers from './js/reducers/wordSearch'
const store = createStore(wordSearchAppReducers);

render(
  <Provider store={store}>
    <WordSearch />
  </Provider>,
  document.getElementById('root')
)
