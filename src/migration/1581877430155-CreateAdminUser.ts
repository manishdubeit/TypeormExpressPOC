import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { User as UserEntity } from "../entity/UserEntity";

export class CreateAdminUser1581877430155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new UserEntity();
        user.username = "admin";
        user.password = "admin";
        user.hashPassword();
        user.role = "ADMIN";
        const userRepository = getRepository(UserEntity);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
