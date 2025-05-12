// Auto-generated TypeScript interfaces based on Prisma schema

export interface User {
    id: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    email?: string | null;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    password: string;
    roles: any; // JSON field
    userImage?: string | null;
    listings: Listing[];
    wishlists: Wishlist[];
    trips: Trip[];
    blogs: Blog[];
    comments: Comment[];
  }
  
  export interface Listing {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    price: number;
    locationType: string;
    placeType: string;
    listingCreatedById: string;
    mapData: any;
    locationData: any;
    photos: any;
    placeAmenities: any;
    placeSpace: any;
    wishlists: Wishlist[];
    trips: Trip[];
    listingCreatedBy?: User;
  }
  
  export interface Wishlist {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    listingId: string;
    user?: User;
    listing?: Listing;
  }
  
  export interface Trip {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    listingId: string;
    tripinfo: any;
    user?: User;
    listing?: Listing;
  }
  
  export interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    coverImage?: string | null;
    tags: string[];
    isPublished: boolean;
    author?: User;
    comments: Comment[];
  }
  
  export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    blogId: string;
    userId: string;
    blog?: Blog;
    user?: User;
  }
  