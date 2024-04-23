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
                                            <h2 class="nk-block-title">vehicle models</h2>
                                            <nav>
                                                <ol class="breadcrumb breadcrumb-arrow mb-0">
                                                    <li class="breadcrumb-item"><a href="#">vehicle models</a></li>
                                                    <li class="breadcrumb-item active" aria-current="page">Add new vehicle models
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                        <div class="nk-block-head-content">
                                            <ul class="d-flex">
                                                <li>
                                                    <a href="{{ route('vehiclemodel.create') }}"
                                                        class="btn btn-md d-md-none btn-primary">
                                                        <em class="icon ni ni-plus"></em><span>Add</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('vehiclemodel.create') }}"
                                                        class="btn btn-primary d-none d-md-inline-flex">
                                                        <em class="icon ni ni-plus"></em><span>Add new vehicle models</span>
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
                                                        <span class="overline-title">Model Id</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Model Name</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Company Name</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Year Launched</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Action</span>
                                                    </a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($data as $item )
                                            <tr>
                                            <td class="tb-col">{{ $item->model_id }}</td>
                                            <td class="tb-col">{{ $item->vehicle_model }}</td>
                                            <td class="tb-col">
                                                @php
                                                    $companydetails = DB::table('vehicle_companies')->where('companies_id',$item->companies_id)->first();
                                                  $company_name =  $companydetails->company_name
                                                @endphp
                                                {{ $company_name }}
                                            </td>
                                            <td class="tb-col">{{ $item->year_of_launch }}</td>
                                            <td class="tb-col tb-col-end">
                                                <div class="d-flex justify-content-end gap g-2">
                                                    <div class="gap-col"><a
                                                            href="#"
                                                            class="btn btn-sm bg-success-soft"> <em
                                                                class="icon ni ni-eye"></em>
                                                        </a></div>
                                                    <div class="gap-col">
                                                        <a href="#" id="delete-item"
                                                            class="btn btn-sm bg-danger-soft delete-item">
                                                            <em class="icon ni ni-trash"></em>
                                                        </a>
                                                    </div>
                                                </div>

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
