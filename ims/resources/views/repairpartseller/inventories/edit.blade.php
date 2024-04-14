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
                                <form method="POST" action="{{ route('repairpartseller.inventories.inventories.update', ['id'=>$inventories->item_id]) }}" enctype="multipart/form-data">
                                    @csrf
                                    @method('PUT')
                                    <div class="row g-gs">
                                        <div class="col-xxl-9">
                                            <div class="gap gy-4">
                                                <div class="gap-col">
                                                    <div class="card card-gutter-md">
                                                        <div class="card-body">
                                                            <div class="row g-gs">
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="item_name"
                                                                            class="form-label">Item_name</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="item_name" name="item_name"
                                                                                placeholder="Item_name"
                                                                                value="{{ $inventories->item_name }}">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="item_quantity"
                                                                            class="form-label">Item_quantity</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="item_quantity" name="item_quantity"
                                                                                placeholder="Item_quantity"
                                                                                value="{{ $inventories->item_quantity }}"
                                                                                >
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
                                                                                placeholder="Item_price"
                                                                                value="{{ $inventories->item_price }}">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-12">
                                                                    <div class="form-group"><label
                                                                            class="form-label">Description</label>
                                                                        <div class="form-control-wrap">
                                                                                <textarea name="text_description" cols="10" rows="5" class="form-control">{{ $inventories->item_description }}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-12">
                                                                    <div class="form-group">
                                                                        <label for="formFile" class="form-label">Item Image</label>
                                                                        <div class="form-control-wrap">
                                                                            <!-- Display the previously stored image -->
                                                                            <img src="<?php echo $inventories->item_image; ?>" alt="Item Image" width="150">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label for="new_item_image" class="form-label">Upload New Image</label>
                                                                        <input class="form-control" type="file" id="new_item_image" name="new_item_image">
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <label class="form-label">Select item category</label>
                                                                    <select class="form-select" name="category">
                                                                        @foreach($getCatregoriesNames as $names)
                                                                            <option value="{{ $names->category_id }}" {{ $names->category_id == $inventories->category ? 'selected' : '' }}>{{ $names->category_name }}</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <label class="form-label">Is the item for sale ?</label>
                                                                    <select class="form-select" name="item_for_sale">
                                                                        <option value="1" {{ $inventories->item_for_sale == 1 ? 'selected' : '' }}>No</option>
                                                                        <option value="0" {{ $inventories->item_for_sale == 0 ? 'selected' : '' }}>Yes</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <div class="form-control-wrap">
                                                                        <button type="submit"
                                                                            class="btn btn-primary mt-3"
                                                                            name="submit">Submit</button>
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
