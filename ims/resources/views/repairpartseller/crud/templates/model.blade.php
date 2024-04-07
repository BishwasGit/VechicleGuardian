namespace App\{{ $directoryName }};

use Illuminate\Database\Eloquent\Model;

class {{ $tableName }} extends Model
{
    // Fillable fields based on the columns
    protected $table = '{{ $tableName }}';
    protected $fillable = [
        @foreach($columns as $column)
            '{{ $column }}',
        @endforeach
    ];

    // Implement your model properties and methods here
}
