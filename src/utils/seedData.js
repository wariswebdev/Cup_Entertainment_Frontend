import {
  movieService,
  tvShowService,
  userService,
  categoryService,
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
    poster: "https://via.placeholder.com/300x400/EF4444/FFFFFF?text=Drama+Deep",
  },
];

const sampleTVShows = [
  {
    title: "Mystery Series",
    description: "A thrilling mystery series with unexpected twists.",
    seasons: 3,
    episodes: 30,
    releaseDate: "2023-06-15",
    director: "Mystery Director",
    cast: ["Lead Detective", "Partner", "Mysterious Character"],
    category: "Drama",
    quality: "HD",
    language: ["English"],
    trailer: "https://example.com/trailer-series1",
    status: "Active",
    poster:
      "https://via.placeholder.com/300x400/10B981/FFFFFF?text=Mystery+Series",
  },
  {
    title: "Comedy Show",
    description: "A sitcom that brings laughter to your daily life.",
    seasons: 5,
    episodes: 120,
    releaseDate: "2022-09-01",
    director: "Comedy Show Director",
    cast: ["Main Character", "Best Friend", "Neighbor"],
    category: "Comedy",
    quality: "FHD",
    language: ["English"],
    trailer: "https://example.com/trailer-series2",
    status: "Active",
    poster:
      "https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=Comedy+Show",
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
