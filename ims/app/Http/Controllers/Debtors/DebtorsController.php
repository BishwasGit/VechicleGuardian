<?php

namespace App\Http\Controllers\Debtors;

use App\Http\Controllers\Controller;
use App\Models\debtors\debtors as DebtorsModel;
use Illuminate\Http\Request;

class DebtorsController extends Controller
{
    public function index(){
        $data = DebtorsModel::where('seller_uuid', auth()->user()->seller_uuid)->get();
        return view('repairpartseller.debtors.index', compact('data'));
    }
    public function create(){
        return view('repairpartseller.debtors.create');
    }
    public function store(Request $request){
        $debtor = new DebtorsModel();
        $debtor->seller_uuid = auth()->user()->seller_uuid;
            $debtor->debtor_name = $request->input('debor_name');
            $debtor->debtor_contact = $request->input('debtor_contact');
            $debtor->amount_due = $request->input('ammount_due');
            $debtor->save();
            return redirect()->route('repairpartseller.debtors');
    }
    public function delete($id)
    {
        $debtor = DebtorsModel::where('seller_uuid',$id)->first();
        if ($debtor) {
            $debtor->delete();
            return response()->json(['message' => 'Debtor record deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Debtor record not found'], 404);
        }
    }
}
