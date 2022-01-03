export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    throttler: {
        ttl: 60,
        limit: 10
    },
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        db: process.env.DATABASE_DB || 'todo_nestjs',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'root',
    }
});