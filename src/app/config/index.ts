import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.join((process.cwd(),'.env'))})
let a=process.env.PORT
export default{
    port:process.env.PORT,
    database_url:process.env.DATABASE_URL
}