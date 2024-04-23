<?php

namespace App\Models\companies;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class companies extends Model
{
    use HasFactory;

    protected $table= 'vehicle_companies';
    protected $primarykey = 'companies_id';
    protected $fillable =
    [
        'company_name',
        'company_logp'
    ];
}
