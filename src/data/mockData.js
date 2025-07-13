export const mockMovies = [
  {
    id: 1,
    title: "Day of darkness",
    duration: "2h 40m",
    categories: ["Comedy"],
    quality: "480/720/1080",
    language: ["English"],
    publishDate: "4 Feb. 2025",
    status: "active",
    poster: "https://via.placeholder.com/60x80/FF6B6B/FFFFFF?text=DoD",
  },
  {
    id: 2,
    title: "My true friends",
    duration: "2h 40m",
    categories: ["Action", "Drama"],
    quality: "720/1080",
    language: ["English", "Hindi"],
    publishDate: "12 Jan. 2025",
    status: "inactive",
    poster: "https://via.placeholder.com/60x80/4ECDC4/FFFFFF?text=MTF",
  },
  {
    id: 3,
    title: "Troll hunter",
    duration: "2h 40m",
    categories: ["Comedy"],
    quality: "480/720/1080",
    language: ["English"],
    publishDate: "4 Feb. 2025",
    status: "active",
    poster: "https://via.placeholder.com/60x80/45B7D1/FFFFFF?text=TH",
  },
  {
    id: 4,
    title: "Space Adventure",
    duration: "2h 15m",
    categories: ["Sci-Fi", "Action"],
    quality: "1080/4K",
    language: ["English"],
    publishDate: "10 Jan. 2025",
    status: "active",
    poster: "https://via.placeholder.com/60x80/9B59B6/FFFFFF?text=SA",
  },
  {
    id: 5,
    title: "Love Actually",
    duration: "1h 55m",
    categories: ["Romance", "Comedy"],
    quality: "720/1080",
    language: ["English", "French"],
    publishDate: "8 Jan. 2025",
    status: "active",
    poster: "https://via.placeholder.com/60x80/E74C3C/FFFFFF?text=LA",
  },
];

export const movieCategories = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "horror", label: "Horror" },
  { value: "thriller", label: "Thriller" },
  { value: "romance", label: "Romance" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "fantasy", label: "Fantasy" },
];

export const qualityOptions = [
  { value: "480p", label: "480p" },
  { value: "720p", label: "720p" },
  { value: "1080p", label: "1080p" },
  { value: "4k", label: "4K" },
];

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
];
