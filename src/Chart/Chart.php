<?php

namespace Solarcms\Chart\Chart;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Response;
use Request;
use Illuminate\Routing\ResponseFactory as Resp;


use Illuminate\Support\Facades\Validator;
use App;

class Chart
{
    public $viewName = 'AdminPanel::._pages.chart';
    public $default_locale = 'MN';
    public $locales_table = 'solar_locales';
    public $chartData = [];
    public $graphs = [];

    public function run($action){


        // purpose: built-in controller
        switch($action){


            case "index":         return $this->index($this->viewName);       break;
            case "save":         return $this->save();       break;
            case "update":         return $this->updateMenu();       break;
            case "delete":         return $this->deleteMenu();       break;
            case "list":         return $this->listMenu();       break;


            default:              return $this->index($this->viewName);
        }

    }

    public function index($viewName){



        if (Session::has('locale')) {

        } else {
                Session::set('locale', $this->default_locale);
        }


        $locales = DB::table($this->locales_table)->select('id', 'code')->orderBy('id', 'ASC')->get();




        $chartSetup = [
            'default_locale'=>Session::get('locale'),
            'locales'=>$locales,
            'chartData'=>$this->chartData,
            'graphs'=>$this->graphs
        ];

        ////

        return view($viewName, compact('page_name', 'chartSetup'));
    }
    public function save(){
        $menu = Request::input('menu');

        $new = [
          'slug'=>$menu['slug'],
            'items'=>json_encode($menu['items'])
        ];
        DB::table('solar_menus')->insert($new);

        return 'success';
    }
    public function updateMenu(){
        $menu = Request::input('menu');
        $id = Request::input('id');

        $new = [
          'slug'=>$menu['slug'],
            'items'=>json_encode($menu['items'])
        ];
        DB::table('solar_menus')->where('id', '=', $id)->update($new);

        return 'success';
    }
    public function deleteMenu(){

        $id = Request::input('id');

        DB::table('solar_menus')->where('id', '=', $id)->delete();

        return 'success';
    }
    public function listMenu(){

        $menus = DB::table('solar_menus')->get();

        return $menus;
    }

}