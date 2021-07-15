/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/Teacher/Dashboard/Home/Assignment/AssignmentEdit';
import { name as appName } from './app.json';
import RNFetchBlob from 'rn-fetch-blob';


AppRegistry.registerComponent(appName, () => App);
const Fetch = RNFetchBlob.polyfill.Fetch
window.fetch = new Fetch({
  // enable this option so that the response data conversion handled automatically
  auto : true,
  // when receiving response data, the module will match its Content-Type header
  // with strings in this array. If it contains any one of string in this array, 
 // the response body will be considered as binary data and the data will be stored
 // in file system instead of in memory.
 // By default, it only store response data to file system when Content-Type 
 // contains string `application/octet`.
  binaryContentTypes : [
  'image/',
  'video/',
  'audio/',
  'foo/',
   ],
   trusty : true
}).build()