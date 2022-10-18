import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SchedulesUsersProperties } from './schedulesUsersProperties.entities';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;
	@Column({ length: 60 })
	name: string;
	@Column({ length: 60, unique: true })
	email: string;
	@Column({ length: 120 })
	@Exclude()
	password: string;
	@Column()
	isAdm: boolean;
	@Column({ default: true })
	isActive: boolean;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => SchedulesUsersProperties, (schedules) => schedules.user)
	@JoinColumn()
	schedules: SchedulesUsersProperties[];
}
