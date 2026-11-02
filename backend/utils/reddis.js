/* ------------------------------------------------------------------ */
/* Redis                                                               */
/* ------------------------------------------------------------------ */
 
const redisOptions = {
    keyPrefix: config.redis.keyPrefix,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    retryStrategy: (times) => Math.min(times * 200, 3000), // backoff, max 3s
    lazyConnect: true, // we connect explicitly on startup
  };
   
  const redis = config.redis.url
    ? new Redis(config.redis.url, redisOptions)
    : new Redis({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
        db: config.redis.db,
        ...redisOptions,
      });
   
  redis.on('connect', () => console.log('[redis] Connecting...'));
  redis.on('ready', () => console.log('[redis] Ready'));
  redis.on('error', (err) => console.error('[redis] Error:', err.message));
  redis.on('close', () => console.warn('[redis] Connection closed'));
   
  async function connectRedis() {
    await redis.connect();
    await redis.ping();
  }