export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  section: string;
  is_active: boolean;
  image_url?: string;
  createdAt?: string;
  updatedAt?: string;
}
