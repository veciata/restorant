<?php

namespace App\Enums;

enum UserRole: string
{
    case Customer = 'customer';
    case Chef = 'chef';
    case Waiter = 'waiter';
    case Editor = 'editor';
    case CEO = 'ceo';
}
