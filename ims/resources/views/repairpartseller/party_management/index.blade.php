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
                                            <ul class="d-flex">
                                                <li>
                                                    <a href="{{ route('party.create') }}"
                                                        class="btn btn-md d-md-none btn-primary">
                                                        <em class="icon ni ni-plus"></em><span>Add</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('party.create') }}"
                                                        class="btn btn-primary d-none d-md-inline-flex">
                                                        <em class="icon ni ni-plus"></em><span>Add Party Details</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
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
                                </div>
                                <div class="nk-block">
                                    <div class="card">
                                        <table class="datatable-init table dataTable-table"
                                        data-nk-container="table-responsive">
                                        <thead class="table-light">
                                            <tr>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Party Id</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Party Name</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Party Contacts</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Party Type</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Ammount Due</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Created At</span>
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
                                            <tbody>
                                                @foreach ($data as $item)
                                                <tr>
                                                    <td class="tb-col">{{ $item->party_id }}</td>
                                                    <td class="tb-col">{{ $item->party_name }}</td>
                                                    <td class="tb-col">{{ $item->contact_person }}</td>
                                                    <td class="tb-col">
                                                        @if ($item->is_debtor)
                                                        Debtor
                                                        @elseif ($item->is_creditor)
                                                        Creditor
                                                        @else
                                                        None
                                                        @endif
                                                    </td>
                                                    <td class="tb-col">{{ $item->amount_due }}</td>
                                                    <td class="tb-col">{{ $item->created_at }}</td>
                                                    <td class="tb-col">
                                                        <div class="gap-col"><a type="button"
                                                            class="btn btn-sm btn-icon bg-primary-soft"
                                                            title="Print"
                                                            href="{{ route('party.edit', ['id' => $item->party_id]) }}"><em
                                                                class="icon ni ni-edit"></em></a>
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
