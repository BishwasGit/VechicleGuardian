<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\inventories\inventoriesController;


Route::get('/',function(){
return view('/shop/index');
})->name('shop.index');

Route::get('/userlogin', function () {
    return view('login');
})->name('main.login');

Route::get('/register', function () {
    return view('register');
})->name('main.register');

Route::get('/dashboard/{user}', [DashboardController::class, 'index'])
->name('repaircenter_dashboard')
->middleware(['auth', 'can:view,user']);

Route::get('/lowstock/{selleruuid}',[inventoriesController::class, 'lowstock'])->name('inventories.lowstock');

require __DIR__ . '/registration.php';
require __DIR__ . '/master_crud.php';
require __DIR__ . '/login.php';
require __DIR__ . '/logout.php';
require __DIR__ . '/inventories/inventories.php';
require __DIR__ . '/sales/sales.php';
require __DIR__ . '/debtors/debotrs.php';
require __DIR__ . '/creditors/creditors.php';
require __DIR__ . '/categories/categories.php';
require __DIR__ . '/shop/shop.php';
require __DIR__ . '/companies/companies.php';
require __DIR__ . '/wheeler_category/wheeler_category.php';
require __DIR__ . '/vehicle_model/vehicle_model.php';
