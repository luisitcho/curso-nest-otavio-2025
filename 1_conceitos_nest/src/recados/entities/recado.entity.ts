import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Recado')
export class RecadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ type: 'boolean', default: false })
  lido: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Muitos recados podem ser enviados por uma única pessoa (emissor)
  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna "de" que armazena o ID da pessoa que enviou o recado
  @JoinColumn({ name: 'de' })
  de: Pessoa;

  // Muitos recados podem ser enviados para uma única pessoa (destinatário)
  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna "para" que armazena o ID da pessoa que recebe o recado
  @JoinColumn({ name: 'para' })
  para: Pessoa;
}
