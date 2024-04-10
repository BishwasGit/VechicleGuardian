<?php

namespace App\Models\Creditors;

use Illuminate\Database\Eloquent\Model;

class Creditors extends Model
{
    protected $table = 'creditors';
    protected $primaryKey = 'creditor_id';
    protected $fillable = [
        'seller_uuid',
        'creditor_name',
        'creditor_contact',
        'amount_due',
        'created_at',
        'updated_at',
    ];
}
