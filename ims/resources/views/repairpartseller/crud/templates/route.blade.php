use App\Http\Controllers\{{ $directoryName }}\{{ $tableName }}Controller;
Route::prefix('{{ strtolower($directoryName) }}')->group(function () {
    Route::get('{{ strtolower($tableName) }}', [{{ $tableName }}Controller::class, 'index'])->name('repairpartseller.{{ $directoryName }}.{{ $tableName }}.index');
    Route::get('{{ strtolower($tableName) }}/create', [{{ $tableName }}Controller::class, 'create'])->name('repairpartseller.{{ $directoryName }}.{{ $tableName }}.create');
    Route::post('{{ strtolower($tableName) }}', [{{ $tableName }}Controller::class, 'store'])->name('repairpartseller.{{ $directoryName }}.{{ $tableName }}.store');
    Route::get('{{ strtolower($tableName) }}/{id}', [{{ $tableName }}Controller::class, 'show'])->name('repairpartseller.{{ $directoryName }}.{{ $tableName }}.show');
    Route::get('{{ strtolower($tableName) }}/{id}/edit', [{{ $tableName }}Controller::class, 'edit'])->name('repairpartseller.{{ $directoryName }}.{{ $tableName }}.edit');
    Route::put('{{ strtolower($tableName) }}/{id}', [{{ $tableName }}Controller::class, 'update'])->name('repairpartseller.{{ $directoryName }}.{{ $tableName }}.update');
    Route::delete('{{ strtolower($tableName) }}/{id}', [{{ $tableName }}Controller::class, 'destroy'])->name('repairpartseller.{{ $directoryName }}.{{ $tableName }}.destroy');
});

