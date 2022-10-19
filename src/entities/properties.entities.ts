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
	OneToMany,
} from 'typeorm';
import { Addresses } from './addresses.entities';
import { Categories } from './categories.entities';
import { SchedulesUsersProperties } from './schedulesUsersProperties.entities';

@Entity('properties')
export class Properties {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;
	@Column({ default: false })
	sold: boolean;
	@Column()
	value: number;
	@Column()
	size: number;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
	@OneToOne(() => Addresses, { eager: true })
	@JoinColumn()
	address: Addresses;
	@ManyToOne(() => Categories, { eager: true })
	category: Categories;
	@OneToMany(() => SchedulesUsersProperties, (schedules) => schedules.property)
	@JoinColumn()
	schedules: SchedulesUsersProperties[];
}
