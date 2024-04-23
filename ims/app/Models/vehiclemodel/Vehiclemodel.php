<?php

namespace App\Models\vehiclemodel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiclemodel extends Model
{
    use HasFactory;
    protected $table = 'Vehicle_model';
    protected $primarykey = 'model_id';
    protected $fillable = [
        'companies_id',
        'vehicle_category_id',
        'vehicle_model',
        'year_of_launch',
        'vehicle_type',
        'engine_type',
        'fuel_efficiency',
        'transmission_type',
        'number_of_seats',
        'price',
        'additional_features',
        'created_at',
        'updated_at'
    ];
}
