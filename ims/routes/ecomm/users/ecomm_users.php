<?php

use App\Http\Controllers\ecomm\EcommUserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get('/ecomm_user_register',[EcommUserController::class,'register_index'])->name('ecomm.user.register');
Route::get('/ecomm_user_login',[EcommUserController::class,'login_index'])->name('ecomm.user.login');
Route::post('/ecomm_user_registration',[EcommUserController::class,'register_store'])->name('ecomm.user.registration');
Route::post('/ecomm_login',[EcommUserController::class,'login_auth'])->name('ecomm.login');

use App\Models\ecomm\EcommUser;

Route::get('/authenticated/user/{uuid}', function ($uuid) {
    $user = EcommUser::where('user_uuid', $uuid)->firstOrFail();
    return view('shop.authenticated.index', ['user' => $user]);
})->name('shop.authenticated.user');


Route::get('/authenticated/user/logout', function (Request $request) {
    Auth::guard('ecomm')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect()->route('shop.index');
})->name('shop.authenticated.user.logout');
