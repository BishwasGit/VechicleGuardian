<?php
namespace App\Http\Controllers\debtors;

use App\Models\debtors\debtors;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class debtorsController extends Controller
{
    public function index(Request $request)
    {
        $debtors = debtors::all();
        return view('repairpartseller.debtors.index', compact('debtors'));
    }

    public function create()
    {
        return view('repairpartseller.debtors.create');
    }

    public function store(Request $request)
    {
        // Validate and store the new record
        $data = $request->validate([
            // Add validation rules based on your field requirements
        ]);

        debtors::create($data);

        return redirect()->route('repairpartseller.debtors.index');
    }

    public function show($id)
    {
        $debtors = debtors::findOrFail($id);
        return view('repairpartseller.debtors.show', compact('debtors'));
    }

    public function edit($id)
    {
        $debtors = debtors::findOrFail($id);
        return view('repairpartseller.debtors.edit', compact('debtors'));
    }

    public function update(Request $request, $id)
    {
        // Validate and update the record
        $data = $request->validate([
            // Add validation rules based on your field requirements
        ]);

        debtors::findOrFail($id)->update($data);

        return redirect()->route('repairpartseller.debtors.index');
    }

    public function destroy($id)
    {
        // Delete the record
        debtors::findOrFail($id)->delete();

        return redirect()->route('repairpartseller.debtors.index');
    }
}
