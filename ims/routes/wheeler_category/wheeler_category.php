<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\wheeler\WheelerCategoryController;

Route::prefix('wheeler-category')->group(function(){
Route::get('/',[WheelerCategoryController::class,'index'])->name('wheelercategory.index');
Route::post('/store', [WheelerCategoryController::class, 'store'])->name('wheelercategory.store');
Route::get('/edit/{id}',[WheelerCategoryController::class,'edit'])->name('wheelercategory.edit');
Route::get('/delete/{id}',[WheelerCategoryController::class,'delete'])->name('wheelercategory.delete');
});