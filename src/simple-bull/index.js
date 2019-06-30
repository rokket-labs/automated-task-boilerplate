import Bull from 'bull'
import redis from './redisConf'

const startQueue = async ({ queueName, workers }) => {
  const queue = new Bull(queueName, {
    redis
  })
  await addJobs({ queue, workers })
}

const addJobs = async ({ queue, workers }) => {
  // Set timer of each worker
  const repeat = {
    every: 10000,
    limit: 1000
  }

  await queue.add(workers[0].name, { foo: 'bar' }, { repeat })
  await queue.add(workers[1].name, { foo: 'bar' }, { repeat })

  queue.process(workers[0].name, (job, done) => {
    console.time('time')
    console.log(`Working on Job ${workers[0].name}`)
    console.timeEnd('time')
    done()
  })

  queue.process(workers[1].name, (job, done) => {
    console.log(job.name)
    console.time('time')
    console.log(`Working on Job ${workers[1].name}`)
    console.timeEnd('time')
    done()
  })

  queue.on('failed', function (job, err) {
    // A job failed with reason `err`!
    console.log(err)
  })
}

export { startQueue }
// // Take all workers
// // Create all workers
// export default function (worker) {
//   registerQueues(worker)
// }
