<?php

namespace App\Http\Controllers\wheeler;

use App\Http\Controllers\Controller;
use App\Models\wheeler\wheeler_category as WheelerCategory;
use Illuminate\Http\Request;

class WheelerCategoryController extends Controller
{
    public function index(){
        $data = WheelerCategory::get();
        return view('repairpartseller.wheeler_category.index',compact('data'));
    }
    public function store(Request $request){
        WheelerCategory::create([
            'Vehicle_category' => $request->Vehicle_category
        ]);
        return response()->json(['message' => 'Vehicle category stored successfully'], 200);
    }
    public function edit($id){

    }
    public function delete($id){

    }
}
