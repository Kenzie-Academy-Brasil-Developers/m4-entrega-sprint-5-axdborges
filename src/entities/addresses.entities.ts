import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('addresses')
export class Addresses {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;
	@Column({ length: 80 })
	district: string;
	@Column({ length: 8 })
	zipCode: string;
	@Column({ length: 80, nullable: true })
	number: string;
	@Column({ length: 60 })
	city: string;
	@Column({ length: 2 })
	state: string;
}
