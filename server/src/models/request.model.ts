import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.model';
import { Quote } from './quote.model';

// * 발주
@Entity('request')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  // 발주사
  @ManyToOne(() => User, (user) => user.id)
  orderer: User;

  // 연결된 공급사
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  supplier: User;

  // 발주 요청사항 설명
  @Column()
  description: string;

  // 예상 납기 일정
  @Column()
  dueDate: string;

  // 파일 URL
  @Column({ nullable: true })
  fileUrl: string;

  // 상태 관리 ENUM (등록됨, 검토 중, 승인됨 등)
  @Column({
    type: 'enum',
    enum: [
      '등록됨',
      '검토 중',
      '승인됨',
      '견적 요청됨',
      '견적 접수 중',
      '견적 마감', // 보류
      '발주 확정됨',
      '진행 중',
      '완료됨',
    ],
    default: '등록됨',
  })
  status: string;

  // 발주사 완료 여부
  @Column({ default: false })
  ordererCompleted: boolean;

  // 공급사 완료 여부
  @Column({ default: false })
  supplierCompleted: boolean;

  // 견적 리스트
  @OneToMany(() => Quote, (quote) => quote.request)
  quotes: Quote[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
