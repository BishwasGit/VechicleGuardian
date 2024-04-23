<?php

namespace App\Http\Controllers;

use App\Models\categories\categories as ItemCategories;
use App\Models\inventories\inventories as ItemInventories;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function view_categoried($id)
    {
        $getdata = ItemInventories::where('model_id',$id)->get();
       if($getdata){
       return view('shop.categoried_view',compact('getdata','id'));
        }
        else{
            return redirect()->route('shop.index')->with('error','Something went wrong');
        }

    }
}
