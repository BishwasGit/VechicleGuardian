<?php

namespace App\Http\Controllers\sales;
use App\Models\inventories\inventories as InventoryModel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\sales\sales as SalesModel;
use Illuminate\Support\Facades\DB;

class salesController extends Controller
{
    //
    public function index(){
        $data = InventoryModel::get();
        return view('repairpartseller.sales.create',compact('data'));
    }

    public function store(Request $request){
        // Retrieve the item from the inventory
        $item = InventoryModel::findOrFail($request->item_id);

        // Update the quantity of the item in the inventory
        $item->item_quantity -= $request->quantity_sold;
        $item->save();

        // Create a new sales record
        $sale = new SalesModel();
        $sale->item_id = $request->item_id;
        $sale->sold_to = $request->sold_to;
        $sale->quantity_sold = $request->quantity_sold;
        $sale->total_price = $request->total_price;
        $sale->sold_at = DB::raw('now()'); // Set sold_at to current timestamp
        $sale->save();

        return redirect()->back()->with('success', 'Sale recorded successfully');
    }
    public function manage()
    {
        $sales = SalesModel::all(); // Retrieve all sales records
        return view('repairpartseller.sales.manage', ['sales' => $sales]);
    }
}
