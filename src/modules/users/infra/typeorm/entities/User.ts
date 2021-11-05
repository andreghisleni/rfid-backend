import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import UserIp from './UserIp';
import UserToken from './UserToken';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  user: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column({ name: 'password_update_time' })
  passwordUpdateTime: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserIp, userIp => userIp.user)
  ips: UserIp[];

  @OneToMany(() => UserToken, userToken => userToken.user, {
    // eager: true,
  })
  tokens: UserToken[];

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.${uploadConfig.config.aws.region}.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}
export default User;
