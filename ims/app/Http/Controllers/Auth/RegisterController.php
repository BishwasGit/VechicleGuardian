<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }
    public function registration(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:repair_parts_seller_users',
            'phone' => 'required|string|max:255|unique:repair_parts_seller_users',
            'email' => 'required|string|email|max:255|unique:repair_parts_seller_users',
            'password' => 'required|string|min:8',
        ]);

        $seller_uuid = Str::uuid()->toString();

        $user = User::create([
            'username' => $request->username,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'seller_uuid' => $seller_uuid,
        ]);

          // Optionally log in the user directly after registration
        // auth()->login($user);

        return redirect()->route('main.login');
    }
}
