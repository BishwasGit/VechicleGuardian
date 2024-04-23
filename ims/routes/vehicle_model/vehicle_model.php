<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\vehiclemodel\VehiclemodelController;

Route::prefix('vehicle_models')->group(function(){
Route::get('/',[VehiclemodelController::class,'index'])->name('vehiclemodel.index');
Route::get('/add',[VehiclemodelController::class,'create'])->name('vehiclemodel.create');
Route::post('/store',[VehiclemodelController::class,'store'])->name('vehiclemodel.store');
});
