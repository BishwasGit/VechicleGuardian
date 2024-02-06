<?php
namespace App\Helpers;

class TemplateHelper
{
    public static function generateIndexForm($tableName, $directoryName,$columns,$tableNameSingular)
    {

        $content = view('repairpartseller.crud.templates.index', compact('tableName', 'directoryName','columns','tableNameSingular'))->render();

        $filePath = resource_path("views/repairpartseller/$directoryName/index.blade.php");
        file_put_contents($filePath, $content);
    }

    public static function generateCreateForm($tableName, $directoryName,$columns,$tableNameSingular)
    {

        $content = view('repairpartseller.crud.templates.create', compact('tableName', 'directoryName','columns','tableNameSingular'))->render();

        $filePath = resource_path("views/repairpartseller/$directoryName/create.blade.php");
        file_put_contents($filePath, $content);
    }

    public static function generateShowForm($tableName, $directoryName,$columns,$tableNameSingular)
    {
        // Implement logic to generate edit form template

        $content = view('repairpartseller.crud.templates.show', compact('tableName', 'directoryName','columns','tableNameSingular'))->render();

        $filePath = resource_path("views/repairpartseller/$directoryName/show.blade.php");
        file_put_contents($filePath, $content);
    }
    public static function generateEditForm($tableName, $directoryName,$columns,$tableNameSingular)
    {
        // Implement logic to generate edit form template

        $content = view('repairpartseller.crud.templates.show', compact('tableName', 'directoryName','columns','tableNameSingular'))->render();

        $filePath = resource_path("views/repairpartseller/$directoryName/edit.blade.php");
        file_put_contents($filePath, $content);
    }
}
