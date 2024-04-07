<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;


Route::post('/registration', [RegisterController::class, 'registration'])->name('registration');
