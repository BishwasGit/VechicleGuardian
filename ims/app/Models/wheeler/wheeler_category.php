<?php

namespace App\Models\wheeler;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class wheeler_category extends Model
{
    protected $table = 'Vehicle_category';
    protected $primaryKey = 'vehicle_category_id';
    protected $fillable = [
                    'Vehicle_category',
                    'updated_at',
                    'created_at'
            ];

}
