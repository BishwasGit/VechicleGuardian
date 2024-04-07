@verbatim
@extends('repairpartseller.layouts.layout')
@section('content')
    <div class="nk-app-root">
        <div class="nk-main">
            @include('repairpartseller.includes.sidebar')
            <div class="nk-wrap">
                @include('repairpartseller.includes.nav')
                @endverbatim
                <div class="nk-content">
                    <div class="container-fluid">
                        <div class="nk-content-inner">
                            <!-- Body contents here-->
                            <div class="nk-content-body">
                                <div class="nk-block-head">
                                    <div class="nk-block-head-between flex-wrap gap g-2">
                                        <div class="nk-block-head-content">
                                            <h2 class="nk-block-title">{{ $tableName }} List</h2>
                                            <nav>
                                                <ol class="breadcrumb breadcrumb-arrow mb-0">
                                                    <li class="breadcrumb-item"><a href="#">{{ $directoryName}}</a></li>
                                                    <li class="breadcrumb-item active" aria-current="page">Add {{ $directoryName }}</li>
                                                </ol>
                                            </nav>
                                        </div>
                                        <div class="nk-block-head-content">
                                            <ul class="d-flex">
                                                <li>
                                                    <a href="{{ route('repairpartseller.' . strtolower($directoryName) . '.' . strtolower($tableName) . '.create') }}" class="btn btn-md d-md-none btn-primary">
                                                        <em class="icon ni ni-plus"></em><span>Add</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('repairpartseller.' . strtolower($directoryName) . '.' . strtolower($tableName) . '.create') }}" class="btn btn-primary d-none d-md-inline-flex">
                                                        <em class="icon ni ni-plus"></em><span>Add {{ $tableName }} </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block">
                                    <div class="card">
                                        <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                            <div class="dataTable-top">
                                                <div class="dataTable-dropdown"><label><select class="dataTable-selector">
                                                            <option value="5">5</option>
                                                            <option value="10" selected="">10</option>
                                                            <option value="15">15</option>
                                                            <option value="20">20</option>
                                                            <option value="25">25</option>
                                                        </select> Per page</label></div>
                                                <div class="dataTable-search"><input class="dataTable-input" placeholder="Search..."
                                                        type="text"></div>
                                            </div>
                                            <div class="dataTable-container table-responsive">
                                                <table class="datatable-init table dataTable-table"
                                                    data-nk-container="table-responsive">
                                                    <thead class="table-light">
                                                        <tr>
                                                            @foreach($columns as $columnName)
                                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                    <a href="#" class="dataTable-sorter">
                                                                        <span class="overline-title">{{ ucfirst($columnName) }}</span>
                                                                    </a>
                                                                </th>
                                                            @endforeach
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Action</span>
                                                                </a>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @verbatim
@endsection
@endverbatim
