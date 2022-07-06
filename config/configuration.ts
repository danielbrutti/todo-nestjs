export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    throttler: {
        ttl: 60,      // time to live
        limit: 1000   // max number of requests withing ttl
    },
    cache: {
        ttl: 5,     // time to live objects in cache
        max: 20     // max 20 items, according to page size when doing pagination
    },
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        db: process.env.DATABASE_DB || 'todo_nestjs',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'root',
    }
});