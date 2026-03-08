<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'author',
        'role',
        'content',
        'rating',
        'status',
        'sort_order',
        'order_id',
    ];

    protected $casts = [
        'status' => 'boolean',
        'rating' => 'integer',
        'sort_order' => 'integer',
    ];
}
