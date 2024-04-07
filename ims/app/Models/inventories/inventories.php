<?php
namespace App\Models\inventories;
use Illuminate\Database\Eloquent\Model;

class inventories extends Model
{
    // Fillable fields based on the columns
    protected $table = 'inventories';
    protected $primaryKey = 'item_id';
    protected $fillable = [
                    'seller_uuid',
                    'item_name',
                    'item_description',
                    'item_quantity',
                    'item_price',
                    'item_image',
                    'created_at',
                    'updated_at',
            ];

    // Implement your model properties and methods here
}
