<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
    // Login logic
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
        $user = User::where('username', $request->username)->first();
        if ($user && password_verify($request->password, $user->password)) {
            Auth::login($user, $request->filled('remember'));
            return redirect()->route('repaircenter_dashboard', ['user' => $user->seller_uuid]);
        }
        return redirect()->back()->withInput()->withErrors(['credentials' => 'Invalid username or password']);
    }
}
