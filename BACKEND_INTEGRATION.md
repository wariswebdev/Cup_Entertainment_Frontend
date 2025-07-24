# Backend Authentication Integration Documentation

## ✅ Integration Status

The Cup Entertainment frontend is **fully integrated** with your backend authentication system. The integration is complete and ready to use with your backend API running on `http://localhost:3000`.

## 🚀 How It Works

### API Configuration

- **Base URL**: `http://localhost:3000` (configured in `src/services/api.js`)
- **Endpoints**:
  - `POST /auth/signup` - User registration
  - `POST /auth/login` - User authentication

### Authentication Flow

#### 1. **User Registration (Sign Up)**

**Frontend Flow:**

```
SignUp Page → AuthContext.createUser() → apiService.signup() → POST /auth/signup
```

**Payload sent to backend:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "userPassword123"
}
```

**Expected response from backend:**

```json
{
  "success": true,
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### 2. **User Login**

**Frontend Flow:**

```
Login Page → AuthContext.signIn() → apiService.login() → POST /auth/login
```

**Payload sent to backend:**

```json
{
  "email": "john@example.com",
  "password": "userPassword123"
}
```

**Expected response from backend:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 🔒 Security Features

1. **JWT Token Management**

   - Tokens stored in localStorage
   - Automatically included in all authenticated requests
   - Token cleared on logout

2. **Session Management**

   - 30-minute session timeout
   - Session warning before expiration
   - Activity tracking

3. **Error Handling**
   - Comprehensive error messages
   - Backend error propagation
   - User-friendly error display

## 🧪 Testing the Integration

A **BackendTester** component has been added to help you test the integration:

1. **Start your backend server** on `http://localhost:3000`
2. **Start the frontend**: `npm run dev`
3. **Open the app** in your browser
4. **Look for the testing panel** in the top-right corner (only visible in development)
5. **Click "Test Backend Connection"** to verify backend is reachable
6. **Click "Test Auth Endpoints"** to test signup and login

The test results will be logged in the browser console.

## 📁 Key Files

### Core Authentication Files:

- `src/services/api.js` - API service with authentication endpoints
- `src/contexts/AuthContext.jsx` - Authentication state management
- `src/pages/Login.jsx` - Login page with backend integration
- `src/pages/SignUp.jsx` - Registration page with backend integration

### Testing Files:

- `src/utils/testAuth.js` - Backend testing utilities
- `src/components/BackendTester.jsx` - UI testing component

## 🛠 Configuration

### Environment Variables (Optional)

You can create a `.env` file to configure the API URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Then update `src/services/api.js`:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
```

## 🔧 Backend Requirements

Your backend should:

1. **Accept the exact payload format** shown above
2. **Return the exact response format** with `token` and `user` fields
3. **Handle CORS** for frontend requests from `http://localhost:5173`
4. **Use JWT tokens** for authentication
5. **Accept Bearer tokens** in Authorization header for protected routes

### Example Backend CORS Configuration:

```javascript
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
```

## 🚦 Status Indicators

- ✅ **Green**: Everything working correctly
- ⚠️ **Yellow**: Warning (check console for details)
- ❌ **Red**: Error (check console and network tab)

## 📝 Error Handling

The frontend handles these backend errors gracefully:

- **Invalid credentials**: "Invalid email or password"
- **User not found**: "Invalid email or password"
- **Email already exists**: Shows backend error message
- **Network errors**: "Failed to connect to server"
- **Invalid response**: "Invalid response from server"

## 🔄 Next Steps

1. **Start your backend server** on port 3000
2. **Test the integration** using the BackendTester component
3. **Try signing up** a new user through the UI
4. **Try logging in** with the created user
5. **Remove the BackendTester** component when you're satisfied with the integration

## 📞 Support

If you encounter any issues:

1. Check the **browser console** for detailed error messages
2. Check the **Network tab** in DevTools to see API requests/responses
3. Verify your **backend is running** on the correct port
4. Ensure **CORS is configured** properly on your backend
5. Verify the **response format** matches the expected structure

---

**Integration Status: ✅ COMPLETE**

Your frontend is now fully integrated with your backend authentication system!
