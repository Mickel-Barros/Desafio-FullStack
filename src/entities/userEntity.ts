import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm'


@Entity('users')
class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 50, unique: true })
    email: string

    @Column({ length: 120 })
    password: string

    @Column({ length: 600 })
    bio: string

    @Column()
    img: string

    @Column()
    phone: number

    @Column({ default: false})
    isAdm: boolean

    @Column({ default: true})
    isActive: boolean

    @Column({ type: 'jsonb', nullable: true })
    contacts: any[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
}

export { User }