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
  creator?: string;
}
export interface PostResponse {
  _id: string;
  title: string;
  content: string;
  creator: string;
  imagePath: string;
}
