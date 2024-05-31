import { CastMember, CastMemberType } from '../src/entities/CastMember';
import { CastMemberService } from '../src/services/CastMemberService';

describe('CastMember', () => {
  it('should create a CastMember', () => {
    const castMember = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    expect(castMember).toBeInstanceOf(CastMember);
    expect(castMember.props.name).toBe('John Doe');
    expect(castMember.props.type).toBe(CastMemberType.ACTOR);
    expect(castMember.props.created_at).toBeInstanceOf(Date);
  });

  it('should throw error for invalid name', () => {
    expect(() => new CastMember({ name: 'a'.repeat(256), type: CastMemberType.ACTOR })).toThrow();
  });

  it('should throw error for invalid type', () => {
    expect(() => new CastMember({ name: 'John Doe', type: 3 as CastMemberType })).toThrow();
  });
});

describe('CastMemberRepository', () => {
  let repository: CastMemberService;

  beforeEach(() => {
    repository = new CastMemberService();
  });

  it('should create and retrieve a CastMember', () => {
    const castMember = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    repository.create(castMember);
    const found = repository.findById(castMember.id);
    expect(found).toEqual(castMember);
  });

  it('should update a CastMember', () => {
    const castMember = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    repository.create(castMember);
    castMember.props.name = 'Jane Doe';
    repository.update(castMember);
    const found = repository.findById(castMember.id);
    expect(found?.props.name).toBe('Jane Doe');
  });

  it('should delete a CastMember', () => {
    const castMember = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    repository.create(castMember);
    repository.delete(castMember.id);
    const found = repository.findById(castMember.id);
    expect(found).toBeUndefined();
  });

  it('should find CastMembers by name', () => {
    const castMember1 = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    const castMember2 = new CastMember({ name: 'Jane Doe', type: CastMemberType.DIRECTOR });
    repository.create(castMember1);
    repository.create(castMember2);
    const found = repository.findByName('John');
    expect(found.length).toBe(1);
    expect(found[0]).toEqual(castMember1);
  });

  it('should find CastMembers by type', () => {
    const castMember1 = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    const castMember2 = new CastMember({ name: 'Jane Doe', type: CastMemberType.DIRECTOR });
    repository.create(castMember1);
    repository.create(castMember2);
    const found = repository.findByType(CastMemberType.ACTOR);
    expect(found.length).toBe(1);
    expect(found[0]).toEqual(castMember1);
  });

  it('should sort CastMembers by name', () => {
    const castMember1 = new CastMember({ name: 'Jane Doe', type: CastMemberType.DIRECTOR });
    const castMember2 = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    repository.create(castMember1);
    repository.create(castMember2);
    const sorted = repository.sortByName();
    expect(sorted[0]).toEqual(castMember1);
    expect(sorted[1]).toEqual(castMember2);
  });

  it('should sort CastMembers by created_at', () => {
    const castMember1 = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR }, new Date('2022-01-01'));
    const castMember2 = new CastMember({ name: 'Jane Doe', type: CastMemberType.DIRECTOR }, new Date('2023-01-01'));
    repository.create(castMember1);
    repository.create(castMember2);
    const sorted = repository.sortByCreatedAt();
    expect(sorted[0]).toEqual(castMember1);
    expect(sorted[1]).toEqual(castMember2);
  });
});
