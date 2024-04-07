<?php

use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;


Route::match(['get', 'post'],'/logout', [LogoutController::class, 'logout'])->name('logout');
