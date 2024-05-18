import crypto from 'crypto';

export abstract class Entidade<T> {
    public readonly id: string;
    public readonly props: T;
  
    constructor(props: T, id?: string) {
      this.id = id ?? crypto.randomUUID();
      this.props = props;
    }
  }
  