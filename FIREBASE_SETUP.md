# Firebase Console Setup Guide for Cup Entertainment App

## Required Firebase Console Configuration

### 1. Project Setup

- Project ID: `cup-entertainment` (already configured)
- Ensure your project is in the correct billing plan for development

### 2. Firestore Database Setup

#### Enable Firestore Database:

1. Go to Firestore Database in Firebase Console
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select your preferred location

#### Required Collections:

The app will automatically create these collections when you seed data:

```
cup-entertainment (project)
├── movies/
│   ├── [document-id]/
│   │   ├── title: string
│   │   ├── description: string
│   │   ├── duration: string
│   │   ├── releaseDate: string
│   │   ├── director: string
│   │   ├── cast: array
│   │   ├── category: string
│   │   ├── quality: string
│   │   ├── language: array
│   │   ├── trailer: string
│   │   ├── status: string
│   │   ├── poster: string (base64 or URL)
│   │   ├── createdAt: timestamp
│   │   └── updatedAt: timestamp
│
├── tvShows/
│   ├── [document-id]/
│   │   ├── title: string
│   │   ├── description: string
│   │   ├── seasons: number
│   │   ├── episodes: number
│   │   ├── releaseDate: string
│   │   ├── director: string
│   │   ├── cast: array
│   │   ├── category: string
│   │   ├── quality: string
│   │   ├── language: array
│   │   ├── trailer: string
│   │   ├── status: string
│   │   ├── poster: string (base64 or URL)
│   │   ├── createdAt: timestamp
│   │   └── updatedAt: timestamp
│
├── users/
│   ├── [document-id]/
│   │   ├── name: string
│   │   ├── email: string
│   │   ├── phone: string
│   │   ├── role: string
│   │   ├── status: string
│   │   ├── subscription: string
│   │   ├── avatar: string (base64 or URL)
│   │   ├── createdAt: timestamp
│   │   └── updatedAt: timestamp
│
├── categories/
│   ├── [document-id]/
│   │   ├── name: string
│   │   ├── description: string
│   │   ├── createdAt: timestamp
│   │   └── updatedAt: timestamp
│
└── analytics/
    └── [document-id]/
        ├── totalViews: number
        ├── timestamp: timestamp
        └── metadata: object
```

### 3. Security Rules (Development)

Set these Firestore Security Rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Important**: These rules allow anyone to read/write your database. For production, implement proper authentication and authorization rules.

### 4. Authentication (Optional for now)

- Go to Authentication > Sign-in method
- Enable Email/Password if you plan to add user authentication later
- Configure authorized domains if deploying

### 5. Hosting (Optional)

- Already configured with site: "cupentertainment"
- Deploy with: `firebase deploy --only hosting`

## Image Handling Configuration

### Current Setup: Base64 Images

- Images are converted to base64 strings and stored directly in Firestore documents
- Suitable for small images (< 1MB recommended)
- No additional Firebase Storage configuration needed

### Firestore Document Size Limits

- Maximum document size: 1 MiB (1,048,576 bytes)
- Base64 encoding increases image size by ~33%
- Recommended image sizes:
  - Posters: 300x400px, optimized JPEG/PNG
  - Thumbnails: 150x200px, optimized JPEG/PNG
  - Avatars: 100x100px, optimized JPEG/PNG

## Getting Started

1. Ensure Firestore is enabled in your Firebase Console
2. Set security rules to test mode
3. Run your React app: `npm run dev`
4. Use the "Seed Sample Data" button in the dashboard to populate initial data
5. Navigate through the admin panel to see Firebase integration working

## Monitoring

- Check Firestore usage in Firebase Console > Usage tab
- Monitor read/write operations to stay within free tier limits
- Free tier includes: 50K reads, 20K writes, 20K deletes per day

## Production Considerations

When ready for production:

1. Implement proper authentication
2. Create restrictive security rules
3. Consider moving to Firebase Storage for larger images
4. Set up proper user roles and permissions
5. Implement proper error handling and logging
