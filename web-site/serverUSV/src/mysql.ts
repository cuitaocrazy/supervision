import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Announcement } from './entity/Announcement';
import { Attendance } from './entity/Attendance';
import { Complaint } from './entity/Complaint';
import { Consumer } from './entity/Consumer';
import { ConsumerStudent } from './entity/ConsumerStudent';
import { Contract } from './entity/Contract';
import { ContractNego } from './entity/ContractNego';
import { EduLesson } from './entity/EduLesson';
import { EduOrg } from './entity/EduOrg';
import { EduTeacher } from './entity/EduTeacher';
import { SupervisorBlackEdu } from './entity/SupervisorBlackEdu';
import { SupervisorOrg } from './entity/SupervisorOrg';
import { SupervisorUser } from './entity/SupervisorUser';
import { Transfer } from './entity/Transfer';
import { ChainCode } from './entity/ChainCode';
import { Transaction } from './entity/Transaction'
const datasource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "yadadb",
        password: "yadadb",
        database: "yadadb",
        synchronize: false,
        logging: true,
        entities: [Announcement, Attendance, Complaint, Consumer, ConsumerStudent,
                Contract, ContractNego, EduLesson, EduOrg, EduTeacher, SupervisorBlackEdu,
                SupervisorOrg, SupervisorUser, Transfer, ChainCode, Transaction],
        subscribers: [],
        migrations: [],
        namingStrategy: new SnakeNamingStrategy(),
})
datasource.initialize()
export default datasource;