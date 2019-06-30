import fetchData from './fetchData'
import postData from './postData'
import { startQueue } from '../src/simple-bull'

startQueue({
  queueName: 'Testing Server',
  workers: [fetchData, postData]
})
