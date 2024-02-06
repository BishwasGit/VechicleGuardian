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
                            <!-- Body contents here-->
                            <div class="nk-content-body">
                                <div class="nk-block-head">
                                    <div class="nk-block-head-between flex-wrap gap g-2">
                                        <div class="nk-block-head-content">
                                            <h2 class="nk-block-title">debtors List</h2>
                                            <nav>
                                                <ol class="breadcrumb breadcrumb-arrow mb-0">
                                                    <li class="breadcrumb-item"><a href="#">debtors</a></li>
                                                    <li class="breadcrumb-item active" aria-current="page">Add debtors</li>
                                                </ol>
                                            </nav>
                                        </div>
                                        <div class="nk-block-head-content">
                                            <ul class="d-flex">
                                                <li>
                                                    <a href="http://127.0.0.1:8000/debtors/debtors/create"
                                                        class="btn btn-md d-md-none btn-primary">
                                                        <em class="icon ni ni-plus"></em><span>Add</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="http://127.0.0.1:8000/debtors/debtors/create"
                                                        class="btn btn-primary d-none d-md-inline-flex">
                                                        <em class="icon ni ni-plus"></em><span>Add debtors</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block">
                                    <div class="card">
                                        <div
                                            class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                            <div class="dataTable-top">
                                                <div class="dataTable-dropdown"><label><select class="dataTable-selector">
                                                            <option value="5">5</option>
                                                            <option value="10" selected="">10</option>
                                                            <option value="15">15</option>
                                                            <option value="20">20</option>
                                                            <option value="25">25</option>
                                                        </select> Per page</label></div>
                                                <div class="dataTable-search"><input class="dataTable-input"
                                                        placeholder="Search..." type="text"></div>
                                            </div>
                                            <div class="dataTable-container table-responsive">
                                                <table class="datatable-init table dataTable-table"
                                                    data-nk-container="table-responsive">
                                                    <thead class="table-light">
                                                        <tr>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Debtor_id</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Customer_name</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Contact_number</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Email_address</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Billing_address</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Transaction_history</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Amount_due</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Due_date</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Payment_status</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Last_payment_date</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Credit_limit</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Overdue_days</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span
                                                                        class="overline-title">Sales_representative</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Notes</span>
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
@endsection
