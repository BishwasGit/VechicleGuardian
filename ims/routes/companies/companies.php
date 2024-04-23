<?php

use App\Http\Controllers\companies\CompaniesController;
use Illuminate\Support\Facades\Route;

Route::prefix('/companies')->group(function(){
Route::get('/',[CompaniesController::class,'index'])->name('companies.index');
Route::get('/create-companies',[CompaniesController::class,'create'])->name('companies.create');
Route::get('/store-companies',[CompaniesController::class,'store'])->name('companies.store');
});
