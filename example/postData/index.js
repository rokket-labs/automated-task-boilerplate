import getData from './getData'

// Worker with all custom methods
export default {
  // frecuency: 1000
  delay: 1000,
  job: getData,
  name: 'postData',
  processor: task => console.log(task),
  onFailure: error => console.log(error),
  onSuccess: result => console.log(result),
  repeat: 1000 // in ms
}

// export default worker({
//   name: 'getData',
//   delay: 1000,
//   frecuency: 1000,
//   job: getData,
// })
//   onSuccess: result => console.log(result)
