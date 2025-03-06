import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Request } from './request.model';
import { User } from './user.model';

// * 공급사 제출 견적 테이블
@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  // 견적을 제출한 요청서
  @ManyToOne(() => Request, (request) => request.id)
  request: Request;

  // 견적을 제출한 공급사
  @ManyToOne(() => User, (user) => user.id)
  supplier: User;

  // 제출한 견적 비용
  @Column()
  estimatedCost: number;

  // 제출한 견적 시간
  @Column()
  estimatedTime: number;

  // 견적 승인 여부
  @Column({ type: 'boolean', default: false })
  approved: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
