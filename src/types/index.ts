export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  count?: number;
};

export type Profile = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  phone: string;
  secondaryPhone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  address: string;
  workingHours?: string;
  googleMapsUrl?: string;
  logo?: string;
  logoShape?: 'square' | 'horizontal';
  coverImage?: string;
  galleryImages?: string[];
  services?: string[];
  isFeatured: boolean;
  isVerified: boolean;
  isPending?: boolean;
  isActive?: boolean;
  verificationStatus?: 'unverified' | 'verified' | 'checked_subject';
  verifiedAt?: string;
  createdAt?: string;
};

export type Location = {
  id: string;
  name: string;
  slug: string;
  parentRegion?: string;
};

export type UsefulContact = {
  id: string;
  title: string;
  category: string;
  phone: string;
  secondaryPhone?: string;
  address?: string;
  notes?: string;
  icon: string;
};

export type RecommendationArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  related_profile_ids?: string[];
  created_at: string;
};

