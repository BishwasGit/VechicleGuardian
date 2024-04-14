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
        $vehicleType = $request->vehicle_category_id;
        $getVehicleTypeId = DB::Table('vehicle_category')->where('Vehicle_category',$vehicleType)->first();
        if ($getVehicleTypeId) {
            $vehicleCategoryId = $getVehicleTypeId->vehicle_category_id;
            $storecategory = new ItemCategories();
            $storecategory->category_name = $request->category_name;
            $storecategory->vehicle_category_id = $vehicleCategoryId;
            $storecategory->save();
            return redirect()->route('repairpartseller.categories')->with('success', 'Item category created successfully.');
        } else {
            return redirect()->back()->with('error', 'Vehicle category not found.');
        }
    }

    public function edit(){

    }
    public function delete(){

    }
}
