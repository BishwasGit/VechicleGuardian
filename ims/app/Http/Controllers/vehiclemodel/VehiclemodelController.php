<?php

namespace App\Http\Controllers\vehiclemodel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\companies\companies as CompaniesModel;
use App\Models\categories\categories as VehiclePartsCategories;
use App\Models\wheeler\wheeler_category as WheelerCategory;
use App\Models\vehiclemodel\Vehiclemodel as VehicleModel;
class VehiclemodelController extends Controller
{
    public function index(){
    $data = VehicleModel::get();
    return view('repairpartseller.vehicle_model.index',compact('data'));
   }

   public function create(){
    $vehicle_companies = CompaniesModel::get();
    $wheeler_category = WheelerCategory::get();
    return view('repairpartseller.vehicle_model.create',compact('vehicle_companies','wheeler_category'));
   }

   public function store(Request $request){
            $vehicle = new VehicleModel();
                $vehicle->companies_id = $request->companies_id;
                $vehicle->vehicle_model = $request->vehicle_model;
                $vehicle->year_of_launch = $request->year_of_launch;
                $vehicle->vehicle_type = $request->vehicle_type;
                $vehicle->vehicle_category_id = $request->vehicle_category_id;
                $vehicle->engine_type = $request->engine_type;
                $vehicle->fuel_efficiency = $request->fuel_efficiency;
                $vehicle->transmission_type = $request->transmission_type;
                $vehicle->number_of_seats = $request->number_of_seats;
                $vehicle->price = $request->price;
                $vehicle->additional_features = $request->additional_features;
                $vehicle->save();
                return redirect()->route('vehiclemodel.index')->with('success', 'Vehicle added successfully');
   }
}
