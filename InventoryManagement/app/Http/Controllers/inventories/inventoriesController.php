<?php
namespace App\Http\Controllers\inventories;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\inventories\inventories as InventoryModel;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

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
        $inventories = InventoryModel::findOrFail($id);
        return view('repairpartseller.inventories.edit', compact('inventories'));
    }

    public function update(Request $request, $id)
    {
        // Validate and update the record
        $data = $request->validate([
            // Add validation rules based on your field requirements
        ]);

        InventoryModel::findOrFail($id)->update($data);

        return redirect()->route('repairpartseller.inventories.index');
    }

    public function destroy($id)
    {
        // Delete the record
        InventoryModel::findOrFail($id)->delete();

        return redirect()->route('repairpartseller.inventories.index');
    }
}
