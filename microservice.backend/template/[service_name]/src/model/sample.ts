/**
 * https://github.com/typeorm/typeorm/blob/master/docs/entities.md
 * https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
 */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SampleEntity {
    @PrimaryGeneratedColumn('uuid')
    // @ts-ignore
    public id: string;

    @Column({ type: 'string', nullable: false })
    // @ts-ignore
    public title: string;
}

export default SampleEntity;
