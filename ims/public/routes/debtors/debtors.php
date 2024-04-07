use App\Http\Controllers\debtors\debtorsController.php;
use Illuminate\Support\Facades\Route;
Route::resource('debtors/debtors', 'debtors\debtorsController')->names([
    'index' => 'repairpartseller.debtors.debtors.index',
    'create' => 'repairpartseller.debtors.debtors.create',
    'store' => 'repairpartseller.debtors.debtors.store',
    'show' => 'repairpartseller.debtors.debtors.show',
    'edit' => 'repairpartseller.debtors.debtors.edit',
    'update' => 'repairpartseller.debtors.debtors.update',
    'destroy' => 'repairpartseller.debtors.debtors.destroy',
]);
