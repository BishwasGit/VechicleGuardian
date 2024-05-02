<?php

use App\Http\Controllers\ecomm\EcommUserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get('/ecomm_user_register',[EcommUserController::class,'register_index'])->name('ecomm.user.register');
Route::get('/ecomm_user_login',[EcommUserController::class,'login_index'])->name('ecomm.user.login');
Route::post('/ecomm_user_registration',[EcommUserController::class,'register_store'])->name('ecomm.user.registration');
Route::post('/ecomm_login',[EcommUserController::class,'login_auth'])->name('ecomm.login');
Route::get('/user_dash/{uuid}',[EcommUserController::class,'dashboard'])->name('ecomm.user.dashboard');

Route::get('/addtocart/{product_uuid}/{user_uuid}',[EcommUserController::class,'addtocart'])->name('ecomm.user.addtocart');
Route::get('/viewcart/{user_uuid}',[EcommUserController::class,'view_cart'])->name('view.cart');
Route::get('/wishlist/{product_uuid}/{user_uuid}',[EcommUserController::class,'wishlist'])->name('ecomm.user.wishlist');

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


Route::get('/get-item-details', [EcommUserController::class, 'getItemDetails'])->name('get.item.details');
