<?php

namespace App\Http\Controllers\companies;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompaniesController extends Controller
{
    public function index(){
        return view('repairpartseller.companies.index');
    }
    public function create(){
        return view('repairpartseller.companies.create');
    }
}
