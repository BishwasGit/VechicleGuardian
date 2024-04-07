namespace App\debtors;

use Illuminate\Database\Eloquent\Model;

class debtors extends Model
{
    // Fillable fields based on the columns
    protected $table = 'debtors';
    protected $fillable = [
                    'debtor_id',
                    'customer_name',
                    'contact_number',
                    'email_address',
                    'billing_address',
                    'transaction_history',
                    'amount_due',
                    'due_date',
                    'payment_status',
                    'last_payment_date',
                    'credit_limit',
                    'overdue_days',
                    'sales_representative',
                    'notes',
            ];

    // Implement your model properties and methods here
}
