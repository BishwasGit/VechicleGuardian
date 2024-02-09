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
        // Validate the input data
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        // Retrieve the user record based on the provided username
        $user = User::where('username', $request->username)->first();
        // Verify the provided password against the hashed password stored in the database
        if ($user && password_verify($request->password, $user->password)) {
            // Start a session
            Auth::login($user, $request->filled('remember'));

            // Redirect to the dashboard with the authenticated user instance
            return redirect()->route('repaircenter_dashboard', ['user' => $user]);
        }

        // If credentials are invalid, redirect back with error message
        return redirect()->back()->withInput()->withErrors(['credentials' => 'Invalid username or password']);
    }
}
