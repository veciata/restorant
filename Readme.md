# Restaurant Management System

A premium, full-stack restaurant management application built with **Laravel 12** and **React**.

## 🚀 Overview
This system is designed to handle every aspect of a modern restaurant, from public-facing menus and Three.js-powered table bookings to complex backend management for Chefs, Waiters, and CEOs.

## 🛠 Tech Stack
- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React, Material UI, Three.js (for 3D seating)
- **Database**: SQLite (Development)

## 👥 User Roles & Features
- **Public/Users**: Browse menu, read reviews, book tables (3D visualization), and track orders.
- **Chefs**: Manage order queue and update item availability.
- **Waiters**: Table assignments and order placement.
- **Editors**: Content management for Home and About pages.
- **CEO**: Full admin dashboard with financial reporting (Daily/Weekly/Monthly income, top items).

## 📂 Project Structure
- `/app`, `/database`, `/routes`: Laravel Backend API.
- `/frontend`: React Frontend (To be initialized).

## 🛠 Installation & Setup

### Backend
1. Clone the repository.
2. Install dependencies:
   ```bash
   composer install
   ```
3. Setup environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```
5. Start the server:
   ```bash
   php artisan serve
   ```

### Frontend (Coming Soon)

resources folder contains the frontend code.

## 📜 License
This project is licensed under the MIT license.
