<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        Auth::logout();

        // Invalidate the session and regenerate a new session ID
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to the login page after logout
        return redirect()->route('main.login');
    }
}
