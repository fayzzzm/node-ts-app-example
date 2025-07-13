import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Define cache key structure
interface CacheKeyParams {
  prefix: string;
  resource: string;
  identifier?: string;
  query?: Record<string, any>;
}

const generateCacheKey = ({ prefix, resource, identifier, query }: CacheKeyParams): string => {
  const parts = [prefix, resource];
  
  if (identifier) {
    parts.push(identifier);
  }
  
  if (query && Object.keys(query).length > 0) {
    const queryString = Object.entries(query)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    parts.push(queryString);
  }
  
  return parts.join(':');
};

export const cacheMiddleware = (duration: number) => {
  return async (req: any, res: any, next: any) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = generateCacheKey({
      prefix: 'api',
      resource: req.baseUrl.replace('/api/', ''),
      identifier: req.params.id,
      query: req.query
    });

    try {
      // Try to get cached data
      const cachedData = await redis.get(cacheKey);
      
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      // If no cache, modify res.json to cache the response
      const originalJson = res.json;
      res.json = function(data: any) {
        // Cache the response
        redis.setex(cacheKey, duration, JSON.stringify(data));
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Redis cache error:', error);
      next();
    }
  };
};

export const clearCache = async (resource: string, identifier?: string) => {
  try {
    // Clear specific resource cache
    const pattern = generateCacheKey({
      prefix: 'api',
      resource,
      identifier
    });
    
    const keys = await redis.keys(`${pattern}*`);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export default redis; 