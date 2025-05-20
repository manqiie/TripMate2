# TripMate - Travel Planning Application

TripMate is a comprehensive travel planning application built with Django for the backend, React for the frontend, and MySQL for the database. This application allows users to plan trips, optimize travel routes, save memories, and share travel experiences.

## Features

### User Authentication
- User registration and login
- Password reset functionality
- Profile management

### Trip Planning
- Create and save trip plans
- Optimize travel routes with Google Maps integration
- View trips on an interactive map

### Memory Management
- Upload photos and videos to document experiences
- View a timeline or slideshow of uploaded media
- Organize media by trip

### Sharing & Social
- Share trip plans with others
- Control privacy settings for your content

### Admin Features
- Manage user accounts
- Moderate content
- Handle user inquiries

## Technology Stack

### Backend
- Django
- Django REST Framework
- MySQL Database

### Frontend
- React.js
- Material UI
- React Router
- Formik & Yup for form handling

### APIs & Services
- Google Maps API for route optimization
- Media storage

## Setup Instructions

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd tripmate
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install django djangorestframework django-cors-headers mysqlclient
```

4. Configure the MySQL database:
   - Make sure MySQL is installed and running
   - Create a database named 'tripmate'
   - Update the database settings in `tripmate_project/settings.py` with your credentials

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser:
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd tripmate-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. The application should now be running at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/accounts/register/` - Register a new user
- `POST /api/accounts/login/` - Login a user
- `POST /api/accounts/logout/` - Logout a user
- `PUT /api/accounts/change-password/` - Change user password
- `POST /api/accounts/reset-password-request/` - Request password reset
- `GET/PUT /api/accounts/profile/` - Get or update user profile

### Trip Management
(To be implemented in the next phase)

## Project Structure

### Backend
```
tripmate/
├── accounts/       # User authentication and profiles
├── trips/          # Trip planning and management
├── media/          # User uploaded content
└── tripmate_project/  # Project settings
```

### Frontend
```
tripmate-frontend/
├── public/
├── src/
│   ├── components/  # React components
│   ├── context/     # React contexts
│   ├── services/    # API services
│   ├── App.js       # Main application
│   └── index.js     # Entry point
└── package.json
```

## Development Roadmap

1. Phase 1: User Authentication (Current)
   - Registration, login, profile management

2. Phase 2: Trip Planning
   - Create, read, update, delete trip plans
   - Google Maps integration

3. Phase 3: Media Management
   - Photo/video upload
   - Timeline/slideshow functionality

4. Phase 4: Sharing & Social Features
   - Share trips with others
   - Privacy controls

5. Phase 5: Admin Features
   - User management
   - Content moderation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.