<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Assuming your User model is located here

class DashboardController extends Controller
{
    public function index(User $user)
    {
        // Return the dashboard view with the user data
        return view('repairpartseller.dashboard', ['user' => $user]);
    }
}
