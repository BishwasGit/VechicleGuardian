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
                                                <li class="breadcrumb-item"><a href="#">inventories</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add inventories</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-block">
                                <form action="{{ route('repairpartseller.inventories.inventories.store') }}" method="POST"
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
                                                                    <label class="form-label">Select item category</label>
                                                                    <select class="form-select" name="category">
                                                                        @foreach($getCatregoriesNames as $names)
                                                                            <option value="{{ $names->category_id }}" name="{{ $names->category_id }}">{{$names->category_name }}</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <label class="form-label">Select vehicle model</label>
                                                                    <select class="form-select" name="model_id">
                                                                        @foreach($vehiclemodels as $model)
                                                                            <option value="{{ $model->model_id }}" name="{{ $model->model_id }}">{{$model->vehicle_model }}&nbsp;({{ $model->year_of_launch }})</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <label class="form-label">Sell in online platform ?</label>
                                                                    <select class="form-select" name="item_for_sale">
                                                                            <option value="0" name="0">Yes</option>
                                                                            <option value="1" name="1">No</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="item_name"
                                                                            class="form-label">Item name</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="item_name" name="item_name"
                                                                                placeholder="Item_name">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="item_quantity"
                                                                            class="form-label">Item quantity</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="item_quantity" name="item_quantity"
                                                                                placeholder="Item_quantity">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="item_price" class="form-label">Price
                                                                            Per Unit</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="item_price" name="item_price"
                                                                                placeholder="Item_price">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-12">
                                                                    <div class="form-group"><label
                                                                            class="form-label">Description</label>
                                                                        <div class="form-control-wrap">
                                                                            <textarea name="item_description" class="form-control"></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group"> <label for="formFile"
                                                                        class="form-label" name="item_image">Item
                                                                        Image</label>
                                                                    <div class="form-control-wrap"> <input
                                                                            class="form-control" type="file"
                                                                            id="item_image" name="item_image"> </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <div class="form-control-wrap">
                                                                        <button type="submit"
                                                                            class="btn btn-primary mt-3"
                                                                            >Submit</button>
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
