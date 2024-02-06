<?php

use App\Http\Controllers\CRUDController;
use Illuminate\Support\Facades\Route;

Route::get('/crud', [CRUDController::class, 'index'])->name('crud_index');
Route::post('/crud/generate', [CRUDController::class, 'generate'])->name('generate_crud');
