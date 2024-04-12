<?php

namespace App\Http\Controllers\Creditors;

use App\Http\Controllers\Controller;
use App\Models\creditors\creditors as CreditorsModel;
use Illuminate\Http\Request;

class CreditorsController extends Controller
{
    public function index(){
        $data = CreditorsModel::where('seller_uuid', auth()->user()->seller_uuid)->get();
        return view('repairpartseller.creditors.index', compact('data'));
    }

    public function create(){
        return view('repairpartseller.creditors.create');
    }

    public function store(Request $request){
        $creditor = new CreditorsModel();
        $creditor->seller_uuid = auth()->user()->seller_uuid;
        $creditor->creditor_name = $request->input('creditor_name');
        $creditor->creditor_contact = $request->input('creditor_contact');
        $creditor->amount_due = $request->input('ammount_due');
        $creditor->save();

        return redirect()->route('repairpartseller.creditors');
    }

    public function delete($id)
    {
        $creditor = CreditorsModel::where('seller_uuid',$id)->first();
        if ($creditor) {
            $creditor->delete();
            return response()->json(['message' => 'Creditor record deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Creditor record not found'], 404);
        }
    }
}

