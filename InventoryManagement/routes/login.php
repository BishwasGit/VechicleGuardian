<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->match(['get', 'post'], '/login', [LoginController::class, 'login'])->name('login');
