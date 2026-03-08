<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            // Add new banner_texts column as JSON first
            $table->json('banner_texts')->nullable();
            
            // Drop old banner text columns if they exist
            if (Schema::hasColumn('site_settings', 'banner_text_1')) {
                $table->dropColumn('banner_text_1');
            }
            if (Schema::hasColumn('site_settings', 'banner_text_2')) {
                $table->dropColumn('banner_text_2');
            }
            if (Schema::hasColumn('site_settings', 'banner_text_3')) {
                $table->dropColumn('banner_text_3');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn('banner_texts');
            
            // Add back old columns
            $table->string('banner_text_1')->nullable();
            $table->string('banner_text_2')->nullable();
            $table->string('banner_text_3')->nullable();
        });
    }
};
