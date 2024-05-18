import { Categoria } from '../entities/Categoria';

export class CategoriaService {
  private categorias: Categoria[] = [];

  createCategoria(nome: string, descricao?: string): Categoria {
    const categoria = new Categoria({ nome, descricao });
    this.categorias.push(categoria);
    return categoria;
  }

  getCategoriaById(id: string): Categoria | undefined {
    return this.categorias.find(categoria => categoria.id === id);
  }

  updateCategoria(id: string, nome: string, descricao?: string): Categoria | undefined {
    const categoria = this.getCategoriaById(id);
    if (categoria) {
        categoria.props.nome = nome;
        categoria.props.descricao = descricao;
    }
    return categoria;
  }

  deleteCategoria(id: string): boolean {
    const index = this.categorias.findIndex(categoria => categoria.id === id);
    if (index !== -1) {
      this.categorias.splice(index, 1);
      return true;
    }
    return false;
  }
}
