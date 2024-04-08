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
    public function store(Request $request) {
        // Decode the JSON data received from the frontend
        $saleItems = json_decode($request->getContent(), true);

        // Initialize arrays to store item ids, quantity sold, and total prices
        $itemIds = [];
        $quantitiesSold = [];
        $totalPrices = [];

        // Iterate through each item in the JSON data
        foreach ($saleItems as $item) {
            // Retrieve the item from the inventory
            $inventoryItem = InventoryModel::findOrFail($item['item_id']);

            // Update the quantity of the item in the inventory
            $inventoryItem->item_quantity -= $item['quantity_sold'];
            $inventoryItem->save();

            // Store item id, quantity sold, and total price in arrays
            $itemIds[] = $item['item_id'];
            $quantitiesSold[] = $item['quantity_sold'];
            $totalPrices[] = $item['total_price'];
        }

        // Create a new sales record
        $sale = new SalesModel();
        $sale->items_id = json_encode($itemIds); // Store item ids as JSON string
        $sale->sold_to = $request->sold_to;
        $sale->quantity_sold = json_encode($quantitiesSold); // Store quantities sold as JSON string
        $sale->total_price = json_encode($totalPrices); // Store total prices as JSON string
        $sale->sold_at = now(); // Set sold_at to current timestamp
        $sale->save();

        return redirect()->back()->with('success', 'Sale recorded successfully');
    }
    public function manage()
    {
        $sales = SalesModel::all(); // Retrieve all sales records
        return view('repairpartseller.sales.manage', ['sales' => $sales]);
    }
}
