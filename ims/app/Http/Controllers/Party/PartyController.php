<?php

namespace App\Http\Controllers\Party;

use App\Models\party\Party as PartyModel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PartyController extends Controller
{
   public function index(){
    $uuid = auth()->user()->seller_uuid;
    $data = PartyModel::get()->where('seller_uuid',$uuid);
    return view('repairpartseller.party_management.index',compact('data'));
   }
   public function create(){
    return view('repairpartseller.party_management.create');
   }
   public function store(Request $request){
    $validatedData = $request->validate([
        'party_name' => 'required|string|max:255',
        'contact_person' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255',
        'phone' => [
            'required',
            'string',
            'size:10', // Ensure the phone number has exactly 10 characters
            Rule::unique('parties'), // Optionally, you can add unique validation if phone number should be unique
        ],
        'address' => 'nullable|string',
        'amount_due' => 'nullable|numeric',
        'is_debtor' => 'nullable|boolean',
        'is_creditor' => 'nullable|boolean',
    ]);
    $party = new PartyModel();
    $party->seller_uuid = auth()->user()->seller_uuid;
    $party->party_name = $request->party_name;
    $party->contact_person = $request->contact_person;
    $party->email = $request->email;
    $party->phone = $request->phone;
    $party->address = $request->address;
    $party->amount_due = $request->amount_due;
    if ($request->has('is_debtor')) {
        $party->is_debtor = true;
    } elseif ($request->has('is_creditor')) {
        $party->is_creditor = true;
    }
    $party->save();
    return redirect()->route('party.index')->with('success', 'Party created successfully');
}
public function edit($id){

}
}
