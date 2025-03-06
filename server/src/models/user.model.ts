import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// * 유저
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // 유저 이름
  @Column()
  name: string;

  // 유저 이메일
  @Column({ unique: true })
  email: string;

  // 비밀번호
  @Exclude()
  @Column()
  password: string;

  // 발주사(ORDERER), 공급사(SUPPLIER), 닷코(DOTCO) 구분
  @Column({ type: 'enum', enum: ['ORDERER', 'SUPPLIER', 'DOTCO'] })
  status: 'ORDERER' | 'SUPPLIER' | 'DOTCO';

  // 접근 권한 레벨 (1: 기본 사용자, 2: 유저 매니저, 3: 관리자)
  @Column({ default: 1 })
  accessLevel: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
