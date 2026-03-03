<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    /** @use HasFactory<\Database\Factories\TableFactory> */
    use HasFactory;

    protected $fillable = [
        'table_number',
        'capacity',
        'x_pos',
        'y_pos',
        'z_pos',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'capacity' => 'integer',
            'x_pos' => 'float',
            'y_pos' => 'float',
            'z_pos' => 'float',
        ];
    }

    public function bookings(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function orders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Order::class);
    }
}
