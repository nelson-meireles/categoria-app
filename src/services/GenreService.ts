import { Genre } from '../entities/Genre';

export class GenreService {
  private genres: Genre[] = [];

  create(genre: Genre): Genre {
    this.genres.push(genre);
    return genre;
  }

  findById(id: string): Genre | undefined {
    return this.genres.find(genre => genre.id === id);
  }

  update(genre: Genre): void {
    const index = this.genres.findIndex(g => g.id === genre.id);
    if (index !== -1) {
      this.genres[index] = genre;
    }
  }

  delete(id: string): void {
    this.genres = this.genres.filter(genre => genre.id !== id);
  }

  findAll(): Genre[] {
    return this.genres;
  }
}
