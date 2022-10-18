import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Properties } from './properties.entities';

@Entity('categories')
export class Categories {
    
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;
	@Column({ length: 60, unique: true })
	name: string;

	@OneToMany(() => Properties, (properties) => properties.category)
	@JoinColumn()
	properties: Properties[];
}
