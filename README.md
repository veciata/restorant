# Regal Resto - Fine Dining Restaurant Management System

A modern, full-featured restaurant management system built with Laravel 12 and React 19, featuring 3D table visualization, real-time booking management, and elegant user interface.

## 🌟 Features

### 🎯 Core Features

- **Online Table Reservations** with real-time availability
- **3D Restaurant Visualization** using React Three Fiber
- **Menu Management** with categories and pricing
- **Order Management** with status tracking
- **User Management** with role-based permissions
- **Site Settings** with customizable content
- **Responsive Design** with Tailwind CSS v4

### 🍽️ Restaurant Operations

- **Table Management** with visual 3D layout
- **Booking System** with time slot management
- **Order Processing** with kitchen workflow
- **Staff Management** with role assignments
- **Customer Reviews** and testimonials

### 🎨 User Experience

- **Modern UI/UX** with smooth animations
- **Dark/Light Theme** support
- **Mobile Responsive** design
- **Real-time Updates** without page refresh
- **Interactive Elements** with Framer Motion

## 📸 Screenshots

### Home Page

![Home Page](/public/screenshots/home-page.png) ![Home Page Light](/public/screenshots/home-page-light.png)

The elegant home page featuring the new hero image with restaurant statistics, testimonials, and call-to-action sections.

### Booking System

![Booking System](/public/screenshots/booking-system.png)

### About Page

![About Page](/public/screenshots/about-page.png)

Interactive 3D table visualization with real-time availability status and seamless booking interface.

Comprehensive admin panel for managing reservations, orders, menu items, and site settings.

## 🛠️ Technology Stack

### Backend

- **Laravel 12** - PHP Framework
- **MySQL** - Database
- **SQLite** - Testing Database
- **Inertia.js** - SPA without API
- **Laravel Boost** - Enhanced development tools

### Frontend

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **React Three Fiber** - 3D Graphics
- **Lucide React** - Icons

### Development Tools

- **PHPUnit 11** - Testing
- **ESLint 9** - Code Quality
- **Prettier** - Code Formatting
- **Vite** - Build Tool

## 🚀 Quick Start

### Prerequisites

- PHP 8.5+
- Node.js 18+
- Composer
- Docker & Docker Compose

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd restorant
   ```

2. **Install dependencies**

   ```bash
   composer install
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Start Docker services**

   ```bash
   ./vendor/bin/sail up -d
   ```

5. **Run migrations and seeders**

   ```bash
   ./vendor/bin/sail artisan migrate
   ./vendor/bin/sail artisan db:seed
   ```

6. **Build frontend assets**

   ```bash
   npm run build
   ```

7. **Access the application**
   - Frontend: `http://localhost`
   - Admin: `http://localhost/admin`

## 📱 Demo Users

### Admin Access

- **Email**: `admin@regalresto.com`
- **Password**: `admin123`

### Customer Access

- **Email**: `john.anderson@example.com`
- **Password**: `password123`

## 🧪 Testing

### Run Tests

```bash
# PHPUnit tests
./vendor/bin/phpunit

# Frontend linting
npm run lint

# Build verification
npm run build
```

### Test Coverage

- ✅ Unit Tests: Core business logic
- ✅ Feature Tests: User workflows
- ✅ Integration Tests: API endpoints
- ✅ Frontend Tests: Component behavior

## 📁 Project Structure

```
restorant/
├── app/
│   ├── Http/Controllers/     # API Controllers
│   ├── Models/              # Eloquent Models
│   ├── Enums/               # PHP Enums
│   └── Middleware/          # Custom Middleware
├── database/
│   ├── migrations/          # Database Migrations
│   ├── seeders/             # Database Seeders
│   └── factories/           # Model Factories
├── resources/
│   ├── js/
│   │   ├── pages/           # React Pages
│   │   ├── components/      # Reusable Components
│   │   └── hooks/           # Custom Hooks
│   └── views/               # Blade Templates
├── public/
│   ├── images/              # Static Images
│   └── build/               # Compiled Assets
└── tests/
    ├── Unit/                # Unit Tests
    └── Feature/             # Feature Tests
```

## 🔧 Configuration

### Site Settings

Customize your restaurant via the admin panel:

- Restaurant name and description
- Working hours and contact info
- Hero images and banner texts
- Social media links
- Testimonials and statistics

### Menu Management

- Add/edit menu categories
- Manage menu items with pricing
- Upload dish images
- Set availability status

### Booking Configuration

- Define table layouts
- Set working hours
- Configure time slots
- Manage booking rules

## 🎨 Customization

### Theme Customization

```css
/* Primary Colors */
--primary-orange: #ea580c;
--primary-dark: #1f2937;
--primary-light: #f9fafb;

/* Typography */
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Component Styling

All components use Tailwind CSS classes for consistent styling. Customize the theme in `tailwind.config.js`.

## 🔄 Deployment

### Production Setup

1. **Environment Variables**

   ```env
   APP_ENV=production
   APP_DEBUG=false
   DB_CONNECTION=mysql
   ```

2. **Optimize Application**

   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   npm run build
   ```

3. **Queue Setup**
   ```bash
   php artisan queue:work --daemon
   ```

## 📊 Performance

### Optimization Features

- **Lazy Loading** for images and components
- **Code Splitting** for faster initial load
- **Database Optimization** with proper indexing
- **Asset Caching** for static resources
- **API Response Caching** where appropriate

### Monitoring

- **Laravel Telescope** for application monitoring
- **Query Optimization** with eager loading
- **Performance Metrics** tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Code Standards

- Follow PSR-12 for PHP
- Use ESLint for JavaScript/TypeScript
- Write tests for new features
- Document your changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the FAQ section

## 🎉 Acknowledgments

- Built with [Laravel](https://laravel.com/)
- Powered by [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Images by [Unsplash](https://unsplash.com/)

---

**Regal Resto** - Where Technology Meets Culinary Excellence 🍽️✨
