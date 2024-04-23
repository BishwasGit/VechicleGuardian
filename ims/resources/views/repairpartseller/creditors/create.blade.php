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
                            <div class="nk-block-head">
                                <div class="nk-block-head-between flex-wrap gap g-2">
                                    <div class="nk-block-head-content">
                                        <h2 class="nk-block-title">Add Product</h2>
                                        <nav>
                                            <ol class="breadcrumb breadcrumb-arrow mb-0">
                                                <li class="breadcrumb-item"><a href="#">creditors</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add creditors</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-block">
                                <form action="{{ route('repairpartseller.creditors.store') }}" method="POST"
                                    enctype="multipart/form-data">
                                    @csrf
                                    <div class="row g-gs">
                                        <div class="col-xxl-9">
                                            <div class="gap gy-4">
                                                <div class="gap-col">
                                                    <div class="card card-gutter-md">
                                                        <div class="card-body">
                                                            <div class="row g-gs">
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="creditor"
                                                                            class="form-label">Creditor Name</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="creditor_name" name="creditor_name"
                                                                                placeholder="creditor_name">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="creditor_contact"
                                                                            class="form-label">Contact</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="creditor_contact" name="creditor_contact"
                                                                                placeholder="creditor_contact">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="ammount_due" class="form-label">
                                                                            Ammount Due</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="number" class="form-control"
                                                                                id="ammount_due" name="ammount_due"
                                                                                placeholder="ammount_due">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <div class="form-control-wrap">
                                                                        <button type="submit"
                                                                            class="btn btn-primary mt-3">Submit</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
