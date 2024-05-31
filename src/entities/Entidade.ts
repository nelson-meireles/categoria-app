import crypto from 'crypto';

export abstract class Entidade<T> {
    public readonly id: string;
    public readonly props: T;
    public readonly created_at: Date;
  
    constructor(props: T, id?: string, created_at?: Date) {
      this.id = id ?? crypto.randomUUID();
      this.props = props;
      this.created_at = created_at ?? new Date();
    }
  }
  