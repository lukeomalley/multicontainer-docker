const keys = require('./keys');
const redis = require('redis');

const redisClient = new redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');

const fib = index => {
  if (index < 2) {
    return 1;
  }

  return fib(index - 1) + fib(index - 2);
};