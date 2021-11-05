import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import RfidAccessKey from './RfidAccessKey';

@Entity('rfid_access_logs')
class RfidAccessLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  rfid_access_key_id: string;

  @ManyToOne(() => RfidAccessKey)
  @JoinColumn({ name: 'rfid_access_key_id' })
  rfid_access_key: RfidAccessKey;

  @Column()
  blocked_access: boolean;

  @Column()
  why: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default RfidAccessLog;
