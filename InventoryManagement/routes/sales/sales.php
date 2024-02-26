<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\sales\salesController;

Route::prefix('sales')->group(function () {
    Route::get('addsales', [salesController::class, 'index'])->name('repairpartseller.sales.create');
    Route::post('sales/store', [salesController::class, 'store'])->name('repairpartseller.sales.store');
    Route::get('/managesales', [SalesController::class, 'manage'])->name('sales.manage');
    Route::get('/sales/{id}/edit', [SalesController::class, 'manage'])->name('sales.edit');
    Route::get('/sales/{id}/delete', [SalesController::class, 'manage'])->name('sales.delete');
    Route::get('/sales/{id}/show', [SalesController::class, 'manage'])->name('sales.show');
});

