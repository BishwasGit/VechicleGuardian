<?php

namespace App\Http\Controllers\Categories;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\categories\categories as ItemCategories;

class CategoriesController extends Controller
{
    public function index(){
        $categoriesList = ItemCategories::get();
        return view('repairpartseller.categories.index',compact('categoriesList'));
    }

    public function create(){
        $getVehicleTypes = DB::TABLE('vehicle_category')->get();
        return view('repairpartseller.categories.create',compact('getVehicleTypes'));
    }

    public function store(Request $request){
            $storecategory = new ItemCategories();
            $storecategory->category_name = $request->category_name;
            $storecategory->save();
            return response()->json(['message' => 'Category stored successfully'], 200);
    }

    public function edit(){

    }
    public function delete(){

    }
}
