<?php

use App\Http\Controllers\Debtors\DebtorsController;
use Illuminate\Support\Facades\Route;

Route::prefix('debtors')->group(function(){
    Route::get('debtors', [DebtorsController::class, 'index'])->name('repairpartseller.debtors');
    Route::get('add_debtors', [DebtorsController::class, 'create'])->name('repairpartseller.debtors.create');
    Route::post('store_debtors', [DebtorsController::class, 'store'])->name('repairpartseller.debtors.store');
    Route::delete('delete_debtors/{id}', [DebtorsController::class, 'delete'])->name('repairpartseller.debtors.delete');
});
