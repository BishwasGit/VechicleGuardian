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
                    'seller_uuid',
                    'sales_uuid',
                    'quantity_sold',
                    'total_price',
                    'vat',
                    'grand_total',
                    'sold_at',
                    'sold_to',
                    'created_at',
                    'updated_at',
            ];

            public function getItemData()
            {
                return $this->belongsTo(InventoryModel::class, 'item_id');
            }
    // Implement your model properties and methods here
}
