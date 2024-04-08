<?php
namespace App\Models\sales;
use Illuminate\Database\Eloquent\Model;
use App\Models\inventories\inventories as InventoryModel;
class sales extends Model
{
    // Fillable fields based on the columns
    protected $table = 'sales';
    protected $primaryKey = 'sales_id';
    protected $fillable = [
                    'items_id',
                    'quantity_sold',
                    'total_price',
                    'grand_total',
                    'sold_at',
                    'sold_to',
                    'created_at',
                    'updated_at',
            ];

            public function item()
            {
                return $this->belongsTo(InventoryModel::class, 'item_id');
            }
    // Implement your model properties and methods here
}
