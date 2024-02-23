<?php
namespace App\Http\Controllers\inventories;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\inventories\inventories as InventoryModel;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class inventoriesController extends Controller
{
    public function index(Request $request)
    {
        $inventories = InventoryModel::all();
        return view('repairpartseller.inventories.index', compact('inventories'));
    }

    public function create()
    {
        return view('repairpartseller.inventories.create');
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            // Add validation rules for other form fields here
            'item_name' => 'required|string|max:255',
            'item_description' => 'required|string|max:255',
            'item_quantity' => 'required|integer',
            'item_price' => 'required|numeric',
            'item_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size as needed
        ]);
        $uploadedFileUrl = Cloudinary::upload($request->file('item_image')->getRealPath())->getSecurePath();

        InventoryModel::create([
            'seller_uuid' => auth()->user()->seller_uuid,
            'item_name' => $request->item_name,
            'item_description' => $request->item_description,
            'item_quantity' => $request->item_quantity,
            'item_price' => $request->item_price,
            'item_image' => $uploadedFileUrl,
        ]);

        // Redirect back or to a success page
        return redirect()->route('repairpartseller.inventories.inventories.index')->with('success', 'Item added successfully');
    }

    public function show($id)
    {
        $inventories = InventoryModel::findOrFail($id);
        return view('repairpartseller.inventories.show', compact('inventories'));
    }

    public function edit($id)
    {
        $inventories = InventoryModel::where('item_id', $id)->firstOrFail();
        return view('repairpartseller.inventories.edit', compact('inventories'));
    }
    public function update(Request $request, $id)
    {
        $inventory = InventoryModel::where('item_id', $id)->firstOrFail();
          // Update the inventory fields with the new data
            $inventory->item_name = $request->item_name;
            $inventory->item_description = $request->item_description;
            $inventory->item_quantity = $request->item_quantity;
            $inventory->item_price = $request->item_price;
            $inventory->seller_uuid =  auth()->user()->seller_uuid;

            // Check if a new image file is uploaded
        if ($request->hasFile('new_item_image')) {
            // Upload the new image and update the item_image field
            $uploadedFileUrl = Cloudinary::upload($request->file('new_item_image')->getRealPath())->getSecurePath();
            $inventory->item_image = $uploadedFileUrl;
        }
            // Save the updated inventory item
            $inventory->save();

            return redirect()->route('repairpartseller.inventories.inventories.index');
    }
    public function destroy($id)
    {
        try {
            // Find and delete the record
            $inventory = InventoryModel::where('item_id', $id)->firstOrFail();
            $inventory->delete();
        } catch (ModelNotFoundException $e) {
            // Handle the case where the record is not found
            return redirect()->route('repairpartseller.inventories.inventories.index')->with('error', 'Record not found.');
        }

        // Redirect to index page after successful deletion
        return redirect()->route('repairpartseller.inventories.inventories.index')->with('success', 'Inventory item deleted successfully.');
    }
}
