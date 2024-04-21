@extends('shop.layouts.layout')
@section('content')
<div class="nk-app-root">
    <div class="nk-main">
        @include('shop.includes.sidebar')
        <div class="nk-wrap">
            @include('shop.includes.navbar')
            @php
            $products = DB::table('inventories')->where('item_for_sale', '0')->get()
            @endphp
            <div class="nk-content products-in-shop" style="margin-top: 5%;">
                <div class="container mt-5">
                    <div class="nk-content-inner">
                    <div id="carouselExampleIndicators" class="carousel slide">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                <img src="https://www.shutterstock.com/image-vector/bicycle-parts-gears-260nw-582381541.jpg" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                <img src="https://www.shutterstock.com/image-vector/bicycle-parts-gears-260nw-582381541.jpg" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                <img src="https://www.shutterstock.com/image-vector/bicycle-parts-gears-260nw-582381541.jpg" class="d-block w-100" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                            </div>
                        <div class="row g-gs mt-5">
                            @foreach($products as $product)
                            <div class="col-sm-6 col-xl-4 col-xxl-3">
                                <div class="card text-center h-100">
                                    <div class="card-body">
                                        <div class=""><img src="{{ $product->item_image }}" alt="user"></div>
                                        <div class="mt-1 mb-4"><a href="#" class="my-2 h3">{{ $product->item_name }}</a>
                                        </div>
                                        <div class="price" style="list-style: none;">
                                            <li class="">₹{{ $product->item_price }}</li>
                                        </div>
                                        <div class="rating d-flex flex-row align-items-center justify-content-center py-2" style="list-style: none;">
                                            <li class="rating-label checked"><em class="icon ni ni-star-fill"></em></li>
                                            <li class="rating-label checked"><em class="icon ni ni-star-fill"></em></li>
                                            <li class="rating-label checked"><em class="icon ni ni-star-fill"></em></li>
                                            <li class="rating-label checked"><em class="icon ni ni-star-fill"></em></li>
                                        </div>
                                        <div class="row g-gs d-flex flex-column">
                                            <div class="col">
                                                <a href="#" class="btn btn-primary"><em class="icon ni ni-plus"></em>&nbsp;Add to cart</a>
                                            </div>
                                            <div class="col">
                                                <a href="#" class="btn btn-success"><em class="icon ni ni-equal-sm"></em>&nbsp;Description</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('js')
<script>
    $.ajax({
        error: function(xhr, status, error) {
            // Handle error response
            Swal.fire(
                'Error!',
                'An error occurred.',
                'error'
            );
        }
    });
</script>
@endpush