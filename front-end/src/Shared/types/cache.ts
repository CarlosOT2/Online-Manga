type CacheItem<T> = {
  key: string;
  value: T;
  timestamp: number; 
  maxage: number;    
  version: string;  
};