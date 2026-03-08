# Factory Usage Examples

## User Factory Examples

```php
// Create a single customer
User::factory()->customer()->create();

// Create multiple customers
User::factory()->count(10)->customer()->create();

// Create a user with specific details
User::factory()
    ->withName('John Doe')
    ->withEmail('john@example.com')
    ->withPassword('secret123')
    ->customer()
    ->create();

// Create staff users
User::factory()->chef()->create();
User::factory()->waiter()->create();
User::factory()->ceo()->create();

// Create demo users
User::factory()->demo()->create();
```

## Booking Factory Examples

```php
// Create a single booking
Booking::factory()->create();

// Create confirmed bookings
Booking::factory()->count(5)->confirmed()->create();

// Create bookings for specific times
Booking::factory()->today()->create();
Booking::factory()->tomorrow()->create();
Booking::factory()->thisWeekend()->create();

// Create bookings with specific guest count
Booking::factory()->forGuests(4)->create();

// Create VIP bookings
Booking::factory()->vip()->create();

// Create bookings during working hours
Booking::factory()->duringWorkingHours()->create();

// Create bookings for specific table
$table = Table::find(1);
Booking::factory()->forTable($table)->create();

// Create bookings for specific user
$user = User::find(1);
Booking::factory()->forUser($user)->create();

// Complex example
Booking::factory()
    ->forUser($user)
    ->forTable($table)
    ->tomorrow()
    ->confirmed()
    ->forGuests(4)
    ->create();
```

## Running Seeders

```bash
# Run all seeders
php artisan db:seed

# Run specific seeders
php artisan db:seed --class=DemoUsersSeeder
php artisan db:seed --class=DemoBookingsSeeder

# Fresh migration with seeding
php artisan migrate:fresh --seed
```

## Factory States Available

### User Factory States:
- `customer()` - Creates a customer user
- `chef()` - Creates a chef user  
- `waiter()` - Creates a waiter user
- `editor()` - Creates an editor user
- `ceo()` - Creates a CEO/admin user
- `demo()` - Creates a demo user with predictable data
- `withName($name)` - Sets specific name
- `withEmail($email)` - Sets specific email
- `withPassword($password)` - Sets specific password

### Booking Factory States:
- `confirmed()` - Creates a confirmed booking
- `pending()` - Creates a pending booking
- `cancelled()` - Creates a cancelled booking
- `today()` - Sets booking time for today
- `tomorrow()` - Sets booking time for tomorrow
- `thisWeekend()` - Sets booking time for this weekend
- `duringWorkingHours()` - Sets booking time during working hours
- `vip()` - Creates a VIP booking with more guests
- `forGuests($count)` - Sets specific guest count
- `forTable($table)` - Sets specific table
- `forUser($user)` - Sets specific user
