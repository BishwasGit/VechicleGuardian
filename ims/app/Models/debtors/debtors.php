<?php

namespace App\Models\debtors;
use Illuminate\Database\Eloquent\Model;

class debtors extends Model
{
    protected $table = 'debtors';
    protected $primaryKey = 'debtor_id';
    protected $fillable = [
                    'seller_uuid',
                    'debtor_name',
                    'debtor_contact',
                    'amount_due',
                    'created_at',
                    'updated_at',
            ];
}
