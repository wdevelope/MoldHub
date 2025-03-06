import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("test")
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude() // 늘 응답값에서 제외
  @Column()
  password: string;

  // 챕터가 생성된 날짜
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  // 공지사항 수정 일시
  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
