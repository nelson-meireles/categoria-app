import { CastMember, CastMemberType } from '../entities/CastMember';

export class CastMemberService {
  private castMembers: CastMember[] = [];

  create(castMember: CastMember): CastMember {
    this.castMembers.push(castMember);
    return castMember;
  }

  findById(id: string): CastMember | undefined {
    return this.castMembers.find(cm => cm.id === id);
  }

  update(castMember: CastMember): void {
    const index = this.castMembers.findIndex(cm => cm.id === castMember.id);
    if (index !== -1) {
      this.castMembers[index] = castMember;
    }
  }

  delete(id: string): void {
    this.castMembers = this.castMembers.filter(cm => cm.id !== id);
  }

  findAll(): CastMember[] {
    return this.castMembers;
  }

  findByName(name: string): CastMember[] {
    return this.castMembers.filter(cm => cm.props.name.includes(name));
  }

  findByType(type: CastMemberType): CastMember[] {
    return this.castMembers.filter(cm => cm.props.type === type);
  }

  sortByName(): CastMember[] {
    return this.castMembers.sort((a, b) => a.props.name.localeCompare(b.props.name));
  }

  sortByCreatedAt(): CastMember[] {
    return this.castMembers.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
  }
}
