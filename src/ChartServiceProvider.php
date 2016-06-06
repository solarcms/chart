<?php

namespace Solarcms\Chart;

use Illuminate\Support\ServiceProvider as ServiceProvider;

class ChartServiceProvider extends ServiceProvider
{


    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {


        // For publishing configuration file
        $this->publishes([
            __DIR__ . '/Config/SolarChartConfig.php' => config_path('solar_chart_config.php'),
        ], 'chart-config');

        // For publishing assets
        $this->publishes([
            __DIR__ . DIRECTORY_SEPARATOR . 'Assets'. DIRECTORY_SEPARATOR . 'dist' => public_path('assets/chart'),
        ], 'chart');
        $this->publishes([
            __DIR__ . DIRECTORY_SEPARATOR . 'Assets'. DIRECTORY_SEPARATOR . 'amChart' => public_path('assets/chart/amChart'),
        ], 'chart-am');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {

        $this->mergeConfigFrom(__DIR__ . '/Config/SolarChartConfig.php', 'Chart');

        // View
        $this->loadViewsFrom(__DIR__ . DIRECTORY_SEPARATOR .'Views', 'Chart');

        $this->app['Chart'] = $this->app->share(function ($app) {
            return new Chart;
        });
    }
}