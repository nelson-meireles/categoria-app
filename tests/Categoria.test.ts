import { CategoriaService } from '../src/services/CategoriaService';

describe('CategoriaService', () => {
  let categoriaService: CategoriaService;

  beforeEach(() => {
    categoriaService = new CategoriaService();
  });

  it('criar categoria', () => {
    const categoria = categoriaService.createCategoria('Ficção', 'Não são reais');
    expect(categoria).toBeDefined();
    expect(categoria.nome).toBe('Ficção');
    expect(categoria.descricao).toBe('Não são reais');
  });

  it('recuperar categoria por id', () => {
    const categoria = categoriaService.createCategoria('Ficção', 'Não são reais');
    const foundCategoria = categoriaService.getCategoriaById(categoria.id);
    expect(foundCategoria).toBeDefined();
    expect(foundCategoria?.id).toBe(categoria.id);
  });

  it('alterar categoria', () => {
    const categoria = categoriaService.createCategoria('Ficçã', 'Não reais');
    const updatedCategoria = categoriaService.updateCategoria(categoria.id, 'Ficção', 'Não são reais');
    expect(updatedCategoria).toBeDefined();
    expect(updatedCategoria?.nome).toBe('Ficção');
    expect(updatedCategoria?.descricao).toBe('Não são reais');
  });

  it('deletar categoria', () => {
    const categoria = categoriaService.createCategoria('Ficção', 'Não são reais');
    const result = categoriaService.deleteCategoria(categoria.id);
    expect(result).toBe(true);
    const foundCategoria = categoriaService.getCategoriaById(categoria.id);
    expect(foundCategoria).toBeUndefined();
  });
});
