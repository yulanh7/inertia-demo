<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';

Route::middleware(['auth'])->group(function () {
    Route::resource('tasks', App\Http\Controllers\TaskController::class)
        ->only(['index', 'store', 'update', 'destroy']);
});