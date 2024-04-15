<?php

use App\Http\Controllers\ShopController;
use Illuminate\Support\Facades\Route;

Route::prefix('shop')->group(function () {
Route::get('/view_categorized/{id}',[ShopController::class,'view_categoried'])->name('shop.categorized.details');
});

