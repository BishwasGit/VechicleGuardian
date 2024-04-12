<?php

namespace App\Http\Controllers\sales;
use App\Models\inventories\inventories as InventoryModel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\sales\sales as SalesModel;
use Illuminate\Support\Str;
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
        $soldTo = [];
        $vat = [];
        $grandTotal = [];

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
            $soldTo[] = $item['sold_to'];
            $vat[] = $item['vat'];
            $grandTotal[] = $item['grand_total'];
        }

        // Create a new sales record
        $sale = new SalesModel();
        $sale->items_id = json_encode($itemIds);
        $sale->sold_to = json_encode($soldTo);
        $sale->grand_total = json_encode($grandTotal);
        $sale->vat =  json_encode($vat);
        $sale->quantity_sold = json_encode($quantitiesSold);
        $sale->total_price = json_encode($totalPrices);
        $sale->sold_at = now();
        $sales_uuid = Str::uuid();
        $sale->sales_uuid = $sales_uuid;
        $sale->save();

        return response()->json(['status' => 'success', 'message' => 'Sale recorded successfully']);
    }
    public function manage()
    {
        $sales = SalesModel::all();
        return view('repairpartseller.sales.manage', ['sales' => $sales]);
    }
    public function delete($id)
    {
        $sales = SalesModel::where('sales_uuid', $id)->first();
        if ($sales) {
            $sales->delete();
            return redirect()->back()->with('success', 'Sales record deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Sales record not found.');
        }
    }
}
