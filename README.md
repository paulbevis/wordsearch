# wordsearch
A word search game created using Redux and React, built with webpack, transpiled by babel, and tested with mocha.

All the words are what we call 'site' words, they are words young children learn to recognize on 'site'.

This game is aimed at younger children, hence there are a high proportion of short words, and they can only we found on a horizontal and vertical plane, 
starting left to right, and top to bottom.  There are no words to be found diagonally, and none in reverse.

[Demo site:](http://catamaranprojects.com/wordsearch)


###To automatcially rebuild on code change:

> webpack --watch

###To build production version (minified)
webpack --config webpack.production.config.js


###To test the app:

> npm test


###License Apache

Copyright 2015 Paul Bevis

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.