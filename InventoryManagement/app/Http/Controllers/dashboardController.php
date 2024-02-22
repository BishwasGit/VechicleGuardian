<?php

namespace App\Http\Controllers;
use App\Models\User; // Assuming your User model is located here

class DashboardController extends Controller
{
    public function index($sellerUuid)
    {
        // Retrieve the user record based on the seller_uuid
        $user = User::where('seller_uuid', $sellerUuid)->first();

        if (!$user) {
            // Handle case where user is not found
            abort(404);
        }

        // Return the dashboard view with the user data
        return view('repairpartseller.dashboard', ['user' => $user]);
    }
}
