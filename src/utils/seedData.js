import {
  movieService,
  tvShowService,
  userService,
  categoryService,
  liveStreamService,
} from "../services/firebaseServices";

// Sample data for seeding
const sampleCategories = [
  { name: "Action", description: "Action movies and shows" },
  { name: "Comedy", description: "Comedy entertainment" },
  { name: "Drama", description: "Dramatic content" },
  { name: "Horror", description: "Horror and thriller content" },
  { name: "Romance", description: "Romantic movies and shows" },
  { name: "Sci-Fi", description: "Science fiction content" },
  { name: "Documentary", description: "Documentary content" },
];

const sampleMovies = [
  {
    title: "The Action Hero",
    description:
      "An epic action movie with stunning visuals and intense scenes.",
    duration: "120 min",
    releaseDate: "2024-01-15",
    director: "John Director",
    cast: ["Actor One", "Actor Two", "Actor Three"],
    category: "Action",
    quality: "HD",
    language: ["English"],
    trailer: "https://example.com/trailer1",
    status: "Active",
    imdbRating: 8.2,
    poster:
      "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Action+Hero",
  },
  {
    title: "Comedy Central",
    description: "A hilarious comedy that will make you laugh out loud.",
    duration: "95 min",
    releaseDate: "2024-02-20",
    director: "Jane Comedy",
    cast: ["Funny Actor", "Comic Relief", "Lead Comedian"],
    category: "Comedy",
    quality: "FHD",
    language: ["English"],
    trailer: "https://example.com/trailer2",
    status: "Active",
    imdbRating: 7.5,
    poster:
      "https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=Comedy+Central",
  },
  {
    title: "Drama Deep",
    description: "A deep and emotional drama that touches the heart.",
    duration: "140 min",
    releaseDate: "2024-03-10",
    director: "Drama Director",
    cast: ["Dramatic Actor", "Supporting Lead", "Character Actor"],
    category: "Drama",
    quality: "4K",
    language: ["English", "Spanish"],
    trailer: "https://example.com/trailer3",
    status: "Active",
    imdbRating: 9.1,
    poster: "https://via.placeholder.com/300x400/EF4444/FFFFFF?text=Drama+Deep",
  },
  {
    title: "Sci-Fi Adventure",
    description: "An interstellar journey through space and time.",
    duration: "155 min",
    releaseDate: "2024-04-05",
    director: "Space Director",
    cast: ["Space Actor", "Alien Performer", "Robot Voice"],
    category: "Sci-Fi",
    quality: "4K",
    language: ["English"],
    trailer: "https://example.com/trailer4",
    status: "Active",
    imdbRating: 8.7,
    poster:
      "https://via.placeholder.com/300x400/10B981/FFFFFF?text=Sci-Fi+Adventure",
  },
  {
    title: "Horror Night",
    description: "A spine-chilling horror that will keep you awake.",
    duration: "105 min",
    releaseDate: "2024-05-12",
    director: "Horror Master",
    cast: ["Scream Actor", "Final Girl", "Monster Performer"],
    category: "Horror",
    quality: "HD",
    language: ["English"],
    trailer: "https://example.com/trailer5",
    status: "Active",
    imdbRating: 7.8,
    poster:
      "https://via.placeholder.com/300x400/DC2626/FFFFFF?text=Horror+Night",
  },
];

const sampleTVShows = [
  {
    title: "Breaking Bad",
    description:
      "A high school chemistry teacher turned methamphetamine manufacturing drug dealer.",
    seasons: 5,
    totalEpisodes: 62,
    releaseDate: "2008-01-20",
    lastEpisodeDate: "2013-09-29",
    director: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    category: "Drama",
    quality: "HD",
    language: ["English"],
    trailer: "https://youtube.com/watch?v=HhesaQXLuRY",
    status: "active",
    isOngoing: false,
    network: "AMC",
    imdbRating: 9.5,
    tags: ["crime", "drama", "thriller"],
    poster:
      "https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Breaking+Bad",
  },
  {
    title: "Stranger Things",
    description:
      "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    seasons: 4,
    totalEpisodes: 42,
    releaseDate: "2016-07-15",
    lastEpisodeDate: "2022-07-01",
    director: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    category: "Sci-Fi",
    quality: "4K",
    language: ["English"],
    trailer: "https://youtube.com/watch?v=b9EkMc79ZSU",
    status: "active",
    isOngoing: true,
    network: "Netflix",
    imdbRating: 8.7,
    tags: ["supernatural", "sci-fi", "horror"],
    poster:
      "https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Stranger+Things",
  },
  {
    title: "The Office",
    description:
      "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior.",
    seasons: 9,
    totalEpisodes: 201,
    releaseDate: "2005-03-24",
    lastEpisodeDate: "2013-05-16",
    director: "Greg Daniels",
    cast: ["Steve Carell", "John Krasinski", "Jenna Fischer"],
    category: "Comedy",
    quality: "HD",
    language: ["English"],
    trailer: "https://youtube.com/watch?v=LHOtME2DL4g",
    status: "active",
    isOngoing: false,
    network: "NBC",
    imdbRating: 8.9,
    tags: ["comedy", "workplace", "mockumentary"],
    poster: "https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=The+Office",
  },
  {
    title: "Game of Thrones",
    description:
      "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.",
    seasons: 8,
    totalEpisodes: 73,
    releaseDate: "2011-04-17",
    lastEpisodeDate: "2019-05-19",
    director: "David Benioff",
    cast: ["Emilia Clarke", "Peter Dinklage", "Kit Harington"],
    category: "Drama",
    quality: "4K",
    language: ["English"],
    trailer: "https://youtube.com/watch?v=rlR4PJn8b8I",
    status: "active",
    isOngoing: false,
    network: "HBO",
    imdbRating: 9.2,
    tags: ["fantasy", "drama", "medieval"],
    poster:
      "https://via.placeholder.com/300x400/DC2626/FFFFFF?text=Game+of+Thrones",
  },
  {
    title: "Friends",
    description:
      "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
    seasons: 10,
    totalEpisodes: 236,
    releaseDate: "1994-09-22",
    lastEpisodeDate: "2004-05-06",
    director: "David Crane",
    cast: ["Jennifer Aniston", "Courteney Cox", "Lisa Kudrow"],
    category: "Comedy",
    quality: "FHD",
    language: ["English"],
    trailer: "https://youtube.com/watch?v=hDNNmeeJs1Q",
    status: "active",
    isOngoing: false,
    network: "NBC",
    imdbRating: 8.9,
    tags: ["sitcom", "friendship", "romance"],
    poster: "https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=Friends",
  },
  {
    title: "Mystery Island",
    description: "A thrilling mystery series set on a remote island.",
    seasons: 3,
    totalEpisodes: 24,
    releaseDate: "2024-03-01",
    director: "Sarah Mystery",
    cast: ["Actor One", "Actor Two", "Actor Three"],
    category: "Drama",
    quality: "4K",
    language: ["English", "Spanish"],
    trailer: "https://youtube.com/watch?v=sample1",
    status: "active",
    imdbRating: 8.2,
    poster:
      "https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Mystery+Island",
    tags: ["Mystery", "Drama", "Island"],
  },
  {
    title: "Space Adventures",
    description: "Epic science fiction series exploring the cosmos.",
    seasons: 2,
    totalEpisodes: 16,
    releaseDate: "2024-01-15",
    director: "John Space",
    cast: ["Space Actor A", "Space Actor B"],
    category: "Sci-Fi",
    quality: "HD",
    language: ["English"],
    trailer: "https://youtube.com/watch?v=sample2",
    status: "ongoing",
    imdbRating: 7.8,
    poster:
      "https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Space+Adventures",
    tags: ["Sci-Fi", "Adventure", "Space"],
  },
];

const sampleUsers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    role: "User",
    status: "Active",
    subscription: "Premium",
    avatar:
      "https://ui-avatars.com/api/?name=John+Doe&background=af3494&color=fff",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 8901",
    role: "Moderator",
    status: "Active",
    subscription: "Basic",
    avatar:
      "https://ui-avatars.com/api/?name=Jane+Smith&background=3b82f6&color=fff",
  },
  {
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 234 567 8902",
    role: "User",
    status: "Inactive",
    subscription: "Free",
    avatar:
      "https://ui-avatars.com/api/?name=Mike+Johnson&background=ef4444&color=fff",
  },
  {
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 234 567 8903",
    role: "Admin",
    status: "Active",
    subscription: "Premium",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Wilson&background=10b981&color=fff",
  },
];

export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // Seed categories
    console.log("Seeding categories...");
    for (const category of sampleCategories) {
      await categoryService.addCategory(category);
    }

    // Seed movies
    console.log("Seeding movies...");
    for (const movie of sampleMovies) {
      await movieService.addMovie(movie);
    }

    // Seed TV shows
    console.log("Seeding TV shows...");
    for (const tvShow of sampleTVShows) {
      await tvShowService.addTVShow(tvShow);
    }

    // Seed users
    console.log("Seeding users...");
    for (const user of sampleUsers) {
      await userService.addUser(user);
    }

    console.log("Database seeding completed successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
