import { Entidade } from './Entidade';

interface GenreProps {
  name: string;
  is_active: boolean;
}

export class Genre extends Entidade<GenreProps> {
  constructor(props: GenreProps, id?: string, created_at?: Date) {
    super(props, id, created_at);
    this.validate();
  }

  private validate(): void {
    this.validateName(this.props.name);
  }

  private validateName(name: string): void {
    if (typeof name !== 'string' || name.length > 255) {
      throw new Error('Name must be a string with a maximum length of 255 characters.');
    }
  }

  get isActive(): boolean {
    return this.props.is_active;
  }

  set isActive(status: boolean) {
    this.props.is_active = status;
  }
}
