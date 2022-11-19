<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//Public Routes
Route::post('/register/user', [UserController::class, 'register']);
Route::post('/login/user', [UserController::class, 'login']);

// Protected Routes for user
Route::middleware(['auth:user'])->group(function () {

    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::post('/logout/user', [UserController::class, 'logout']);

});
