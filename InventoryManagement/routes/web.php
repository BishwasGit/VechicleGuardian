<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard/{user}', [DashboardController::class, 'index'])
->name('repaircenter_dashboard')
->middleware(['auth', 'can:view,user']);

Route::get('/', function () {
    return view('login');
})->name('main.login');

Route::get('/register', function () {
    return view('register');
})->name('main.register');

require __DIR__ . '/registration.php';
require __DIR__ . '/master_crud.php';
require __DIR__ . '/login.php';

