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
                                        <h2 class="nk-block-title">Add companies</h2>
                                        <nav>
                                            <ol class="breadcrumb breadcrumb-arrow mb-0">
                                                <li class="breadcrumb-item"><a href="#">companies</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add companies</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-block">
                                <form action="{{ route('companies.store') }}" method="POST"
                                    enctype="multipart/form-data">
                                    @csrf
                                    <div class="row g-gs">
                                        <div class="col-xxl-9">
                                            <div class="gap gy-4">
                                                <div class="gap-col">
                                                    <div class="card card-gutter-md">
                                                        <div class="card-body">
                                                            <div class="row g-gs">
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label for="company"
                                                                            class="form-label">company Name</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="company_name" name="company_name"
                                                                                placeholder="company_name">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label for="company_logo"
                                                                            class="form-label">Company Logo</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="file" class="form-control"
                                                                                id="company_logo" name="company_logo"
                                                                                placeholder="company_logo">
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
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
