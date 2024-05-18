import { Entidade } from './Entidade';

interface CategoriaProps {
  nome: string;
  descricao?: string;
}

export class Categoria extends Entidade<CategoriaProps> {
  constructor(props: CategoriaProps, id?: string) {
    super(props, id);
  }

  get nome(): string {
    return this.props.nome;
  }

  get descricao(): string | undefined {
    return this.props.descricao;
  }
}
