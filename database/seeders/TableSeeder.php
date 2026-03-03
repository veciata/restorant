<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        $tables = [
            ['number' => '1', 'capacity' => 2, 'x' => 0, 'y' => 0, 'z' => 0, 'status' => 'available'],
            ['number' => '2', 'capacity' => 4, 'x' => 4, 'y' => 0, 'z' => 0, 'status' => 'available'],
            ['number' => '3', 'capacity' => 2, 'x' => -4, 'y' => 0, 'z' => 0, 'status' => 'reserved'],
            ['number' => '4', 'capacity' => 6, 'x' => 0, 'y' => 0, 'z' => 4, 'status' => 'available'],
            ['number' => '5', 'capacity' => 4, 'x' => 4, 'y' => 0, 'z' => 4, 'status' => 'occupied'],
            ['number' => '6', 'capacity' => 2, 'x' => -4, 'y' => 0, 'z' => 4, 'status' => 'available'],
            ['number' => 'VIP 1', 'capacity' => 10, 'x' => 0, 'y' => 0, 'z' => -5, 'status' => 'available'],
        ];

        foreach ($tables as $t) {
            Table::create([
                'table_number' => $t['number'],
                'capacity' => $t['capacity'],
                'x_pos' => $t['x'],
                'y_pos' => $t['y'],
                'z_pos' => $t['z'],
                'status' => $t['status'],
            ]);
        }
    }
}
