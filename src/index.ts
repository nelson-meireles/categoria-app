import { CategoriaService } from './services/CategoriaService';

const categoriaService = new CategoriaService();

const categoria = categoriaService.createCategoria('Electronics', 'Gadgets and devices');
console.log('Created Categoria:', categoria);

const foundCategoria = categoriaService.getCategoriaById(categoria.id);
console.log('Found Categoria:', foundCategoria);

const updatedCategoria = categoriaService.updateCategoria(categoria.id, 'Updated Electronics', 'Updated description');
console.log('Updated Categoria:', updatedCategoria);

const deleteResult = categoriaService.deleteCategoria(categoria.id);
console.log('Deleted Categoria:', deleteResult);
