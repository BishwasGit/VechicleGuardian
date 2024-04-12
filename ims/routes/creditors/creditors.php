<?php

use App\Http\Controllers\Creditors\CreditorsController;
use Illuminate\Support\Facades\Route;

Route::prefix('creditors')->group(function(){
    Route::get('/', [CreditorsController::class, 'index'])->name('repairpartseller.creditors');
    Route::get('add', [CreditorsController::class, 'create'])->name('repairpartseller.creditors.create');
    Route::post('store', [CreditorsController::class, 'store'])->name('repairpartseller.creditors.store');
    Route::delete('delete/{id}', [CreditorsController::class, 'delete'])->name('repairpartseller.creditors.delete');
});

