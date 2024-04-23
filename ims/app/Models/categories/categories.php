<?php

namespace App\Models\categories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categories extends Model
{
    use HasFactory;

    protected $table = 'vehicle_parts_categories';

    protected $primaryKey = 'category_id';

    protected $fillable = [
        'category_name',
        'created_at',
        'updated_at',
    ];

}
