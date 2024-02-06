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
                            <div class="nk-block-head">
                                <div class="nk-block-head-between flex-wrap gap g-2">
                                    <div class="nk-block-head-content">
                                        <h2 class="nk-block-title">Add Product</h2>
                                        <nav>
                                            <ol class="breadcrumb breadcrumb-arrow mb-0">
                                                <li class="breadcrumb-item"><a href="#">{{ $directoryName}}</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add {{ $directoryName }}</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-block">
                                <form action="{{ route('repairpartseller.' . strtolower($directoryName) . '.' . strtolower($tableName) . '.store') }}" method="POST">
                                    <div class="row g-gs">
                                        <div class="col-xxl-9">
                                            <div class="gap gy-4">
                                                <div class="gap-col">
                                                    <div class="card card-gutter-md">
                                                        <div class="card-body">
                                                            <div class="row g-gs">
                                                                @foreach($columns as $column)
                                                                    <div class="col-lg-12">
                                                                        <div class="form-group">
                                                                            <label for="{{ $column }}" class="form-label">{{ ucfirst($column) }}</label>
                                                                            <div class="form-control-wrap">
                                                                                <input type="text" class="form-control" id="{{ $column }}" name="{{ $column }}" placeholder="{{ ucfirst($column) }}">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                @endforeach
                                                                <div class="col-lg-12">
                                                                    <div class="form-group">
                                                                        <div class="form-control-wrap">
                                                                            <button type="submit" class="btn btn-primary" name="submit">Submit</button>
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
    @verbatim
@endsection
@endverbatim
