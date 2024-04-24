<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Party\PartyController;


Route::prefix('/party')->group(function(){
    Route::get('/',[PartyController::class,'index'])->name('party.index');
    Route::get('/create',[PartyController::class,'create'])->name('party.create');
    Route::post('/store',[PartyController::class,'store'])->name('party.store');
    Route::get('/edit/{id}',[PartyController::class,'edit'])->name('party.edit');
});
