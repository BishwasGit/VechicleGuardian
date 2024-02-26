<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\inventories\inventoriesController;

Route::prefix('inventories')->group(function () {
    Route::get('inventories', [inventoriesController::class, 'index'])->name('repairpartseller.inventories.inventories.index');
    Route::get('inventories/create', [inventoriesController::class, 'create'])->name('repairpartseller.inventories.inventories.create');
    Route::post('inventories', [inventoriesController::class, 'store'])->name('repairpartseller.inventories.inventories.store');
    Route::get('inventories/{id}', [inventoriesController::class, 'show'])->name('repairpartseller.inventories.inventories.show');
    Route::get('inventories/{id}/edit', [inventoriesController::class, 'edit'])->name('repairpartseller.inventories.inventories.edit');
    Route::put('inventories/{id}', [inventoriesController::class, 'update'])->name('repairpartseller.inventories.inventories.update');
    Route::delete('inventories/{id}/delete', [inventoriesController::class, 'destroy'])->name('repairpartseller.inventories.inventories.destroy');
});

