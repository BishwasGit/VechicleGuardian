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

        Gate::define('view', function (User $loggedInUser, User $requestedUser) {
            // Return the result of the authorization logic
            return $loggedInUser->repair_parts_seller_users_id === $requestedUser->repair_parts_seller_users_id;
        });
    }

}
