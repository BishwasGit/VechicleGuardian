<?php

namespace App\Http\Controllers;

use App\Helpers\TemplateHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\File;

class CRUDController extends Controller
{
    public function index()
    {
        $tables = DB::select('SHOW TABLES');

        return view('repairpartseller.crud.index', compact('tables'));
    }

    public function generate(Request $request)
    {
        $tableName = strtolower($request->input('table'));
        $directoryName = strtolower($request->input('directory'));
        $tableNameSingular = rtrim($tableName, 's');
        //extracting column names
        $columns = Schema::getColumnListing($tableName);

        // Create directory
        $directoryPath = resource_path("views/repairpartseller/$directoryName");
        File::makeDirectory($directoryPath, 0755, true, true);

        // Generate Controller
        $this->generateController($tableName, $directoryName);

        // Generate Model
        $this->generateModel($tableName, $directoryName, $columns);

        // Generate Routes
        $this->generateRoutes($tableName, $directoryName, $columns);

        TemplateHelper::generateIndexForm($tableName, $directoryName, $columns, $tableNameSingular);
        TemplateHelper::generateCreateForm($tableName, $directoryName, $columns, $tableNameSingular);
        TemplateHelper::generateShowForm($tableName, $directoryName, $columns, $tableNameSingular);
        TemplateHelper::generateEditForm($tableName, $directoryName, $columns, $tableNameSingular);

        return redirect()->route('repaircenter_dashboard');

    }

    private function generateController($tableName, $directoryName)
{
    // Implement logic to generate controller file content
    $tableNameSingular = rtrim($tableName, 's');
    $content = view('repairpartseller.crud.templates.controller', compact('tableName', 'directoryName', 'tableNameSingular'))->render();

    // Make the controllers directory if it doesn't exist
    File::makeDirectory(base_path("app/Http/Controllers/{$directoryName}"), 0755, true, true);
    // Save the controller file
    $controllersDirectory = base_path("app/Http/Controllers/{$directoryName}");
    $controllerFileName = "{$tableName}Controller.php";
    $controllerFilePath = "{$controllersDirectory}/{$controllerFileName}";
    if (!File::exists($controllerFilePath)) {
        File::put($controllerFilePath, $content);
    }
}


private function generateModel($tableName, $directoryName, $columns)
{
    // Implement logic to generate model file content
    $content = view('repairpartseller.crud.templates.model', compact('tableName', 'directoryName', 'columns'))->render();

    // Save the model file
    File::makeDirectory(base_path("app/Models/{$directoryName}"), 0755, true, true);
    $modelFileName = "{$tableName}.php";
    $modelFilePath = base_path("app/Models/{$directoryName}/{$modelFileName}");

    if (!File::exists($modelFilePath)) {
        File::put($modelFilePath, $content);
    }
}

private function generateRoutes($tableName, $directoryName, $columns)
{
    // Implement logic to generate routes file content
    $content = view('repairpartseller.crud.templates.route', compact('tableName', 'directoryName', 'columns'))->render();

    // Make the routes directory if it doesn't exist
    File::makeDirectory(base_path("routes/{$directoryName}/"), 0755, true, true);

    // Save the routes file
    $routesFileName = "{$tableName}.php";
    $routesFilePath = base_path("routes/{$directoryName}/{$routesFileName}");

    if (!File::exists($routesFilePath)) {
        File::put($routesFilePath, $content);
    }

    File::append(base_path('routes/web.php'), "// {$tableName} routes" . PHP_EOL . $content . PHP_EOL);
}
}
