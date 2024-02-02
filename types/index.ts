export interface MovieDetailCommentInterface {
  _id: string;
  movieId: string,
  content: string,
  nameUser: string,
  userId: string,
  createdAt: string
}

export interface UserInterface {
  id: string;
  name: string;
  credentials: {
    email: {
      label: string;
      type: string;
    };
    password: {
      label: string;
      type: string;
    };
  };
  image: string;
  email: string;
  emailVerified: Date;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
  sessions: [];
  accounts: [];
  favoriteIds: string;
}

export interface StoriesInterface {
  _id: string;
  title: string;
  image: string;
  detailsUrl: string;
  createdAt: string;
  chapterUrls: string[]
}