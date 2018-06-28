import {CreateDateColumn, UpdateDateColumn, VersionColumn, ObjectID, PrimaryColumn } from "typeorm";

export abstract class AbstractEntity {
    @PrimaryColumn()
    id:number;
    
    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @VersionColumn()
    version:number;

}