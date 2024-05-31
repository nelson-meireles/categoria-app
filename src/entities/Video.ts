import { Entidade } from './Entidade';
import { Categoria } from './Categoria';
import { CastMember } from './CastMember';
import { Genre } from './Genre';

interface VideoProps {
  title: string;
  description: string;
  duration: number;
  year_launched: number;
  category: Categoria;
  cast_members: CastMember[];
  genres: Genre[];
}

export class Video extends Entidade<VideoProps> {
  constructor(props: VideoProps, id?: string, created_at?: Date) {
    super(props, id, created_at);
    this.validate();
  }

  private validate(): void {
    this.validateTitle(this.props.title);
    this.validateDescription(this.props.description);
    this.validateDuration(this.props.duration);
    this.validateYearLaunched(this.props.year_launched);
  }

  private validateTitle(title: string): void {
    if (typeof title !== 'string' || title.length > 255) {
      throw new Error('Title must be a string with a maximum length of 255 characters.');
    }
  }

  private validateDescription(description: string): void {
    if (typeof description !== 'string') {
      throw new Error('Description must be a string.');
    }
  }

  private validateDuration(duration: number): void {
    if (typeof duration !== 'number' || duration <= 0) {
      throw new Error('Duration must be a positive number.');
    }
  }

  private validateYearLaunched(year: number): void {
    const currentYear = new Date().getFullYear();
    if (typeof year !== 'number' || year < 1888 || year > currentYear) {
      throw new Error('Year launched must be a valid year.');
    }
  }
}
