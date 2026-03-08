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
            $table->string('hero_title')->nullable();
            $table->string('hero_subtitle')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('hero_image')->nullable();
            $table->integer('michelin_stars')->nullable()->default(0);
            $table->string('happy_guests')->nullable();
            $table->string('artisan_dishes')->nullable();
            $table->text('testimonial_text')->nullable();
            $table->string('testimonial_author')->nullable();
            $table->string('testimonial_role')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'hero_title',
                'hero_subtitle', 
                'hero_description',
                'hero_image',
                'michelin_stars',
                'happy_guests',
                'artisan_dishes',
                'testimonial_text',
                'testimonial_author',
                'testimonial_role'
            ]);
        });
    }
};
