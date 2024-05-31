import { Video } from '../src/entities/Video';
import { Categoria } from '../src/entities/Categoria';
import { CastMember, CastMemberType } from '../src/entities/CastMember';
import { Genre } from '../src/entities/Genre';
import { VideoService } from '../src/services/VideoService';

describe('Video', () => {
  let category: Categoria;
  let castMember: CastMember;
  let genre: Genre;

  beforeEach(() => {
    category = new Categoria({ nome: 'Category 1' });
    castMember = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    genre = new Genre({name:'teste', is_active: true});
  });

  it('should create a Video', () => {
    const video = new Video({
      title: 'Video Title',
      description: 'Video Description',
      duration: 120,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    });
    expect(video).toBeInstanceOf(Video);
    expect(video.props.title).toBe('Video Title');
    expect(video.props.description).toBe('Video Description');
    expect(video.props.duration).toBe(120);
    expect(video.props.year_launched).toBe(2023);
    expect(video.props.category).toContain(category);
    expect(video.props.cast_members).toContain(castMember);
    expect(video.props.genres).toContain(genre);
    expect(video.created_at).toBeInstanceOf(Date);
  });

  it('should throw error for invalid title', () => {
    expect(() => new Video({
      title: '',
      description: 'Video Description',
      duration: 120,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    })).toThrowError('Title must be a non-empty string with a maximum length of 255 characters.');
  });

  it('should throw error for invalid description', () => {
    expect(() => new Video({
      title: 'Video Title',
      description: '',
      duration: 120,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    })).toThrowError('Description must be a non-empty string.');
  });

  it('should throw error for invalid duration', () => {
    expect(() => new Video({
      title: 'Video Title',
      description: 'Video Description',
      duration: 0,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    })).toThrowError('Duration must be a positive number.');
  });

  it('should throw error for invalid yearLaunched', () => {
    expect(() => new Video({
      title: 'Video Title',
      description: 'Video Description',
      duration: 120,
      year_launched: 1800,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    })).toThrowError('Year launched must be a valid year.');
  });
});

describe('VideoRepository', () => {
  let repository: VideoService;
  let category: Categoria;
  let castMember: CastMember;
  let genre: Genre;

  beforeEach(() => {
    repository = new VideoService();
    category = new Categoria({ nome: 'Category 1' });
    castMember = new CastMember({ name: 'John Doe', type: CastMemberType.ACTOR });
    genre = new Genre({name:'', is_active: true });
  });

  it('should create and retrieve a Video', () => {
    const video = new Video({
      title: 'Video Title',
      description: 'Video Description',
      duration: 120,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    });
    repository.create(video);
    const found = repository.findById(video.id);
    expect(found).toEqual(video);
  });

  it('should update a Video', () => {
    const video = new Video({
      title: 'Video Title',
      description: 'Video Description',
      duration: 120,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    });
    repository.create(video);
    video.props.title = 'Updated Video Title';
    repository.update(video);
    const found = repository.findById(video.id);
    expect(found?.props.title).toBe('Updated Video Title');
  });

  it('should delete a Video', () => {
    const video = new Video({
      title: 'Video Title',
      description: 'Video Description',
      duration: 120,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    });
    repository.create(video);
    repository.delete(video.id);
    const found = repository.findById(video.id);
    expect(found).toBeUndefined();
  });

  it('should find all Videos', () => {
    const video1 = new Video({
      title: 'Video Title 1',
      description: 'Video Description 1',
      duration: 120,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    });
    const video2 = new Video({
      title: 'Video Title 2',
      description: 'Video Description 2',
      duration: 150,
      year_launched: 2023,
      category: category,
      cast_members: [castMember],
      genres: [genre]
    });
    repository.create(video1);
    repository.create(video2);
    const videos = repository.findAll();
    expect(videos.length).toBe(2);
    expect(videos).toContain(video1);
    expect(videos).toContain(video2);
  });
});
