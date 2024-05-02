<?php

namespace App\Models\ecomm;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    use HasFactory;

    protected $table = 'shopping_carts';

    protected $fillable = [
        'user_uuid',
        'product_uuid',
        'quantity',
        'created_at',
        'updated_at'
    ];

    protected $connection = 'ecomm';
}
