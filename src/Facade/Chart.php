<?php

namespace Solarcms\Chart\Facade;

use Illuminate\Support\Facades\Facade as Facade;

class Chart extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'Chart';
    }
}