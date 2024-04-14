<?php

use App\Http\Controllers\Categories\CategoriesController;
use Illuminate\Support\Facades\Route;

Route::prefix('categories')->group(function(){
    Route::get('/', [CategoriesController::class, 'index'])->name('repairpartseller.categories');
    Route::match(['GET','POST'],'/add_categories', [CategoriesController::class, 'create'])->name('repairpartseller.categories.create');
    Route::post('/store_categories', [CategoriesController::class, 'store'])->name('repairpartseller.categories.store');
    Route::post('/edit_categories/{id}', [CategoriesController::class, 'edit'])->name('repairpartseller.catregories.edit');
    Route::delete('/delete_categories/{id}', [CategoriesController::class, 'delete'])->name('repairpartseller.categories.delete');
});
