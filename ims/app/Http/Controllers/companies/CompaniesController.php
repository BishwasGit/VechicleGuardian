<?php

namespace App\Http\Controllers\companies;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\companies\companies as CompaniesModel;
class CompaniesController extends Controller
{
    public function index(){
        $data = CompaniesModel::get();
        return view('repairpartseller.companies.index',compact('data'));
    }
    public function create(){
        return view('repairpartseller.companies.create');
    }
}
