export interface Post {
  id: string | null;
  title: string;
  content: string;
  file?: File;
  imagePath?: string;
}
export interface PostResponse {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
}
