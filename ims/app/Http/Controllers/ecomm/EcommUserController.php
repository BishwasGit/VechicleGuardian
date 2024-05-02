<?php

namespace App\Http\Controllers\ecomm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ecomm\EcommUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\ecomm\ShoppingCart;
use App\Models\inventories\inventories as InventoryModel;
class EcommUserController extends Controller
{
    public function login_index(){
        return view(
            'shop.user.auth.login'
        );
    }
    public function register_index(){
        return view(
            'shop.user.auth.register'
        );
    }
    public function register_store(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:255',
            'user_phone' => 'required|string|max:20',
            'user_email' => 'required|string|email|max:255|unique:ecomm.users,user_email',
            'password' => 'required|string|min:8',
        ]);

        $user_uuid = str::uuid();

        $user = new EcommUser([
            'user_uuid' => $user_uuid,
            'user_name' => $request->user_name,
            'user_phone' => $request->user_phone,
            'user_email' => $request->user_email,
            'user_password' => Hash::make($request->password),
        ]);
        $user->save();
        Auth::login($user);
        return redirect()->route('shop.index');
    }

    public function login_auth(Request $request)
    {
        try {
            $user = EcommUser::where('user_phone', $request->user_phone)->first();
            if ($user && password_verify($request->user_password, $user->user_password)) {
                Auth::login($user, $request->filled('remember'));
                if(Auth::check())
                {
                    return redirect()->route('shop.authenticated.user',['uuid' => auth()->user()->user_uuid]);
                }
            } else {
                return redirect()->back()->withInput()->withErrors(['credentials' => 'Invalid username or password']);
            }
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['credentials' => 'An unexpected error occurred']);
        }
    }
    public function dashboard($uuid){
        return view('shop.authenticated.dashboard');
    }
    public function addtocart($product_uuid,$user_uuid){
            $shoppingCart = new ShoppingCart();
            $shoppingCart->user_uuid = $user_uuid;
            $shoppingCart->item_uuid = $product_uuid;
            $shoppingCart->quantity = 1;
            $shoppingCart->save();

            $isInCart = ShoppingCart::where('user_uuid', $user_uuid)
                ->where('item_uuid', $product_uuid)
                ->exists();

            return response()->json(['message' => 'Product added to cart successfully','isInCart' => $isInCart]);
    }

    public function getItemDetails(Request $request){
        $itemUUID = $request->input('item_uuid');
        $itemDetails = InventoryModel::where('item_uuid', $itemUUID)->first();
        return response()->json($itemDetails);
    }
    public function view_cart($uuid){

    }

    public function wishlist($product_uuid,$user_uuid){

    }

}
