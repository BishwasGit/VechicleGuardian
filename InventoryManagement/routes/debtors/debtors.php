use App\Http\Controllers\debtors\debtorsController;
Route::prefix('debtors')->group(function () {
    Route::get('debtors', [debtorsController::class, 'index'])->name('repairpartseller.debtors.debtors.index');
    Route::get('debtors/create', [debtorsController::class, 'create'])->name('repairpartseller.debtors.debtors.create');
    Route::post('debtors', [debtorsController::class, 'store'])->name('repairpartseller.debtors.debtors.store');
    Route::get('debtors/{id}', [debtorsController::class, 'show'])->name('repairpartseller.debtors.debtors.show');
    Route::get('debtors/{id}/edit', [debtorsController::class, 'edit'])->name('repairpartseller.debtors.debtors.edit');
    Route::put('debtors/{id}', [debtorsController::class, 'update'])->name('repairpartseller.debtors.debtors.update');
    Route::delete('debtors/{id}', [debtorsController::class, 'destroy'])->name('repairpartseller.debtors.debtors.destroy');
});

