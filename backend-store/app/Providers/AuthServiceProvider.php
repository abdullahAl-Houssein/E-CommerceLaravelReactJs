<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();


        Gate::define('create categories', function ($user) {
            return $user->hasRole('admin');
        });

        Gate::define('edit categories', function ($user) {
            return $user->hasRole('admin');
        });

        Gate::define('delete categories', function ($user) {
            return $user->hasRole('admin');
        });



        Gate::define('create product', function ($user) {
            return $user->hasRole('admin');
        });

        Gate::define('edit product', function ($user) {
            return $user->hasRole('admin');
        });

        Gate::define('delete product', function ($user) {
            return $user->hasRole('admin');
        });



        Gate::define('create order', function ($user) {
            return $user->hasRole('admin');
        });

        Gate::define('edit order', function ($user) {
            return $user->hasRole('admin');
        });

        Gate::define('delete order', function ($user) {
            return $user->hasRole('admin');
        });
    }
}
