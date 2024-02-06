namespace App\Http\Controllers\{{ $directoryName }};

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\{{ $directoryName }}\{{ $tableName }};
use App\Models\{{ $directoryName }}\{{ $tableName }};

class {{ $tableName }}Controller extends Controller
{
    public function index(Request $request)
    {
        ${{ $tableName }} = {{ $tableName }}::all();
        return view('repairpartseller.{{ $directoryName }}.index', compact('{{ $tableName }}','{{ $tableNameSingular }}'));
    }

    public function create()
    {
        return view('repairpartseller.{{ $directoryName }}.create');
    }

    public function store(Request $request)
    {
        // Validate and store the new record
        $data = $request->validate([
            // Add validation rules based on your field requirements
        ]);

        {{ $tableName }}::create($data);

        return redirect()->route('repairpartseller.{{ $directoryName }}.index');
    }

    public function show($id)
    {
        ${{ $tableName }} = {{ $tableName }}::findOrFail($id);
        return view('repairpartseller.{{ $directoryName }}.show', compact('{{ $tableName }}'));
    }

    public function edit($id)
    {
        ${{ $tableName }} = {{ $tableName }}::findOrFail($id);
        return view('repairpartseller.{{ $directoryName }}.edit', compact('{{ $tableName }}'));
    }

    public function update(Request $request, $id)
    {
        // Validate and update the record
        $data = $request->validate([
            // Add validation rules based on your field requirements
        ]);

        {{ $tableName }}::findOrFail($id)->update($data);

        return redirect()->route('repairpartseller.{{ $directoryName }}.index');
    }

    public function destroy($id)
    {
        // Delete the record
        {{ $tableName }}::findOrFail($id)->delete();

        return redirect()->route('repairpartseller.{{ $directoryName }}.index');
    }
}
