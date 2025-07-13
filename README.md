# Cup Entertainment - Admin Dashboard

A modern, responsive admin dashboard for managing an entertainment streaming platform built with React, Vite, and Tailwind CSS.

## Features

### 🎬 Content Management

- **Movies Management**: Add, edit, and manage movie content with advanced filtering
- **TV Shows Management**: Comprehensive TV series management with seasons/episodes
- **Categories & Genres**: Organize content with customizable categories
- **Live Streaming**: Manage live events, premieres, and scheduled streams

### 👥 User Management

- **User Accounts**: Manage user profiles, roles, and permissions
- **Subscription Management**: Track user subscriptions and payment status
- **User Analytics**: Monitor user engagement and behavior

### 📊 Analytics & Reporting

- **Performance Metrics**: Track views, engagement, and revenue
- **Audience Insights**: Geographic and device-based analytics
- **Content Performance**: Identify top-performing content
- **Real-time Dashboard**: Live activity monitoring

### ⚙️ System Administration

- **Settings Management**: Configure system-wide preferences
- **Security Controls**: Two-factor authentication, session management
- **Email Configuration**: SMTP settings and notification preferences
- **Storage Management**: Cloud storage and file upload settings

## Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Development**: ESLint for code quality

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AdminLayout.jsx      # Main admin layout wrapper
│   │   ├── Header.jsx           # Top navigation header
│   │   ├── Sidebar.jsx          # Sidebar navigation
│   │   └── FormLayout.jsx       # Reusable form layout
│   └── ui/
│       ├── Button.jsx           # Customizable button component
│       ├── Card.jsx             # Card container component
│       ├── Input.jsx            # Form input component
│       ├── Select.jsx           # Dropdown select component
│       ├── Table.jsx            # Data table component
│       ├── StatsCard.jsx        # Statistics display card
│       ├── Loading.jsx          # Loading spinner component
│       ├── EmptyState.jsx       # Empty state component
│       └── Modal.jsx            # Modal dialog component
├── pages/
│   └── admin/
│       ├── Dashboard.jsx        # Main dashboard overview
│       ├── AllMovies.jsx        # Movies listing and management
│       ├── AddMovie.jsx         # Add new movie form
│       ├── MovieCategories.jsx  # Movie categories management
│       ├── TVShows.jsx          # TV shows management
│       ├── LiveStreaming.jsx    # Live streaming management
│       ├── UserManagement.jsx   # User accounts management
│       ├── Analytics.jsx        # Analytics and reporting
│       └── SystemSettings.jsx   # System configuration
├── data/
│   └── mockData.js              # Sample data for development
└── utils/                       # Utility functions (future)
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Cup_Entertainment_Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Features Overview

### Dashboard

- Overview statistics with key metrics
- Recent activity monitoring
- Quick action shortcuts
- Performance charts and visualizations

### Movies Management

- Complete CRUD operations for movies
- Advanced filtering by category, quality, status
- Bulk operations and export functionality
- Image and video upload capabilities

### TV Shows Management

- Season and episode management
- Series status tracking (ongoing, completed, cancelled)
- Rating and viewership analytics
- Grid and table view options

### User Management

- User account administration
- Role-based access control
- Subscription status tracking
- User activity monitoring

### Live Streaming

- Stream scheduling and management
- Real-time viewer monitoring
- Stream performance analytics
- Event categorization

### Analytics

- Comprehensive performance metrics
- Audience demographic insights
- Revenue tracking and reporting
- Real-time activity monitoring

### System Settings

- Multi-tab configuration interface
- Security and authentication settings
- Email and notification preferences
- Storage and streaming configuration

## UI Components

### Design System

- **Color Scheme**: Purple primary with gray neutrals
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent 4px grid system
- **Interactive Elements**: Hover states and smooth transitions

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimized layouts
- Flexible grid system
- Touch-friendly interface elements

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced user permissions
- [ ] Content approval workflows
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Advanced reporting features
- [ ] API integration
- [ ] File upload progress indicators
- [ ] Drag and drop functionality
- [ ] Advanced search and filtering

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.
