import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    url: process.env.MONGO_URL || dbConfig.url,
    synchronize: process.env.TYPEORMSYNC || dbConfig.synchronize,
    useUnifiedTopology: process.env.TYPEORMTOPO || dbConfig.useUnifiedTopology,
    entities: [__dirname + '/../**/*.entity.{js,ts}']
};