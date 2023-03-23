import { DataSource } from "typeorm"
import path from "path"
import "dotenv/config"
import { User } from "./entities/userEntity"
import { createUser1679573461772 } from "./migrations/1679573461772-createUser"

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test" ?
    {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"]
    } :
    {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        logging: true,
        entities: [User],
        synchronize: false,
        migrations: [createUser1679573461772]
    }
)
    
export default AppDataSource