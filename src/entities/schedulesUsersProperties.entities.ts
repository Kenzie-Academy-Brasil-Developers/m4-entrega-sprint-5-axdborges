import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToMany,
	ManyToOne,
} from 'typeorm';
import { Properties } from './properties.entities';
import { User } from './users.entities';

@Entity('schedules_users_properties')
export class SchedulesUsersProperties {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;
	@Column('date')
	date: string;
	@Column('time')
	hour: string;

	@ManyToOne(() => Properties, )
	property: Properties;
	@ManyToOne(() => User, { eager: true })
	user: User;
}
