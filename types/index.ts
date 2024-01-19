export interface MovieInterface {
  modified: {
    time: string;
  };
  _id: string;
  slug: string;
  name: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  year: number;
}

interface Episode {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

interface MovieDetail {
  created: {
    time: string;
  };
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  thumb_url: string;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  slug: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  country: {
    id: string;
    name: string;
    slug: string;
  }[];
  is_copyright: boolean;
  chieurap: boolean;
  poster_url: string;
  sub_docquyen: boolean;
}

export interface MovieDetailInterface {
  movie: MovieDetail;
  episodes: Episode[];
}

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