import { Entidade } from './Entidade';

export enum CastMemberType {
  DIRECTOR = 1,
  ACTOR = 2,
}

interface CastMemberProps {
  name: string;
  type: CastMemberType;
  created_at?: Date;
}

export class CastMember extends Entidade<CastMemberProps> {
  constructor(props: CastMemberProps, id?: string, created_at?: Date) {
    super(props, id, created_at);
    this.validate();
  }

  private validate(): void {
    this.validateName(this.props.name);
    this.validateType(this.props.type);
  }

  private validateName(name: string): void {
    if (typeof name !== 'string' || name.length > 255) {
      throw new Error('Name must be a string with a maximum length of 255 characters.');
    }
  }

  private validateType(type: CastMemberType): void {
    if (!Object.values(CastMemberType).includes(type)) {
      throw new Error('Invalid type. Must be either 1 (Director) or 2 (Actor).');
    }
  }
}
