import { Video } from '../entities/Video';

export class VideoService {
  private videos: Video[] = [];

  create(video: Video): Video {
    this.videos.push(video);
    return video;
  }

  findById(id: string): Video | undefined {
    return this.videos.find(video => video.id === id);
  }

  update(video: Video): void {
    const index = this.videos.findIndex(v => v.id === video.id);
    if (index !== -1) {
      this.videos[index] = video;
    }
  }

  delete(id: string): void {
    this.videos = this.videos.filter(video => video.id !== id);
  }

  findAll(): Video[] {
    return this.videos;
  }
}
