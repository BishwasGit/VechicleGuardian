<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/dashboard', function () {
    return view('repairpartseller.dashboard');
});

Route::get('/', function () {
    return view('login');
})->name('main.login');

Route::get('/register', function () {
    return view('register');
})->name('main.register');

require __DIR__ . '/registration.php';
