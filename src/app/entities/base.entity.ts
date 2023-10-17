import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

export abstract class BaseEntityAudit extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: "timestamp" })
  createAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp" })
  updatedAt: Date = new Date();

  @Column({ name: 'disabled_date', type: "timestamp", nullable: true })
  disabledDate: Date;

  @Column({ name: "create_user_id" })
  createUserId: string;

  @Column({ name: 'change_user_id' })
  changeUserId: string;


}

