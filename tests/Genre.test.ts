import { Genre } from '../src/entities/Genre';
import { GenreService } from '../src/services/GenreService';

describe('Genre', () => {
  it('should create a Genre', () => {
    const genre = new Genre({name:'test',is_active: true });
    expect(genre).toBeInstanceOf(Genre);
    expect(genre.props.is_active).toBe(true);
    expect(genre.created_at).toBeInstanceOf(Date);
  });

  it('should throw error for invalid is_active', () => {
    expect(() => new Genre({name:'test',is_active: null as unknown as boolean })).toThrow();
  });
});

describe('GenreService', () => {
  let repository: GenreService;

  beforeEach(() => {
    repository = new GenreService();
  });

  it('should create and retrieve a Genre', () => {
    const genre = new Genre({name:'test',is_active: true });
    repository.create(genre);
    const found = repository.findById(genre.id);
    expect(found).toEqual(genre);
  });

  it('should update a Genre', () => {
    const genre = new Genre({name:'test',is_active: true });
    repository.create(genre);
    genre.props.is_active = false;
    repository.update(genre);
    const found = repository.findById(genre.id);
    expect(found?.props.is_active).toBe(false);
  });

  it('should delete a Genre', () => {
    const genre = new Genre({name:'test',is_active: true });
    repository.create(genre);
    repository.delete(genre.id);
    const found = repository.findById(genre.id);
    expect(found).toBeUndefined();
  });
});
