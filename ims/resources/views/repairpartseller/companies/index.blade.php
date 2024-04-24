@extends('repairpartseller.layouts.layout')
@section('content')
    <div class="nk-app-root">
        <div class="nk-main">
            @include('repairpartseller.includes.sidebar')
            <div class="nk-wrap">
                @include('repairpartseller.includes.nav')
                <div class="nk-content">
                    <div class="container-fluid">
                        <div class="nk-content-inner">
                            <div class="nk-content-body">
                                <div class="nk-block-head">
                                    <div class="nk-block-head-between flex-wrap gap g-2">
                                        <div class="nk-block-head-content">
                                            <div class="nk-block-head-content">
                                                <div class="dropdown">
                                                    <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                      Download As
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                      <li><a class="dropdown-item" href="#">CSV</a></li>
                                                      <li><a class="dropdown-item" href="#">Excel</a></li>
                                                      <li><a class="dropdown-item" href="#">PDF</a></li>
                                                    </ul>
                                                  </div>
                                            </div>
                                        </div>
                                        <div class="nk-block-head-content">
                                            <ul class="d-flex">
                                                <li>
                                                    <a href="{{ route('companies.create') }}"
                                                        class="btn btn-md d-md-none btn-primary">
                                                        <em class="icon ni ni-plus"></em><span>Add</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('companies.create') }}"
                                                        class="btn btn-primary d-none d-md-inline-flex">
                                                        <em class="icon ni ni-plus"></em><span>Add companies</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block">
                                    <div class="card">
                                        <table class="datatable-init table dataTable-table"
                                        data-nk-container="table-responsive">
                                        <thead class="table-light">
                                            <tr>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Company Id</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Company Name</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Company Logo</span>
                                                    </a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($data as $item )
                                            <tr>
                                                <td class="tb-col">{{ $item->companies_id }}</td>
                                                <td class="tb-col">{{ $item->company_name }}</td>
                                                <td>
                                                    <div><img
                                                        src="{{ $item->company_logo }}"
                                                        alt="{{ $item->company_name }}"
                                                        height="100"
                                                        width="100"
                                                        ></div>
                                                </td>
                                            </tr>
                                            @endforeach
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
@endsection
@push('js')

@endpush
