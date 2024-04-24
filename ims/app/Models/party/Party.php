<?php

namespace App\Models\party;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    use HasFactory;

    protected $table = 'parties';
    protected $primarykey = 'party_id';

    protected $fillable = [
        'party_name', 'contact_person', 'email', 'phone', 'address', 'is_debtor', 'is_creditor', 'amount_due', 'created_at', 'updated_at'
    ];
}
