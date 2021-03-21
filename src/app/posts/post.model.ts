export interface PostList {
  posts: Post[];
  totalPosts: number;
}
export interface Post {
  id: string | null;
  title: string;
  content: string;
  file?: File | string;
  imagePath?: string;
}
export interface PostResponse {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
}
