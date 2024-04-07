<?php

namespace App\Providers;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('view', function (User $loggedInUser, string $requestedUserId) {
            // Retrieve the requested user based on the seller_uuid
            $requestedUser = User::where('seller_uuid', $requestedUserId)->first();

            // Ensure that the requested user exists
            if (!$requestedUser) {
                return false; // or handle appropriately
            }

            // Return the result of the authorization logic
            return $loggedInUser->seller_uuid === $requestedUser->seller_uuid;
        });

    }

}
