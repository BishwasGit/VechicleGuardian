@extends('shop.layouts.layout')
@section('content')
<div class="nk-app-root">
    <div class="nk-main">
        <div class="nk-wrap">
            @include('shop.authenticated.includes.navbar')
            @php
            $products = DB::table('inventories')->where('item_for_sale', '0')->get()
            @endphp
            <div class="nk-content products-in-shop" style="margin-top: 5%;">
                <div class="container mt-5">
                    <div class="nk-content-inner mt-5">
                        <div id="carouselExampleIndicators" class="carousel slide mt-5">
                            <div class="carousel-inner">
                                @php
                                $companies = DB::table('vehicle_companies')->get();
                                $totalCompanies = count($companies);
                                $itemsPerSlide = 5; // Number of items per slide
                                $totalSlides = ceil($totalCompanies / $itemsPerSlide);
                                @endphp
                                @for ($i = 0; $i < $totalSlides; $i++)
                                <div class="carousel-item {{ $i === 0 ? 'active' : '' }}">
                                    <div class="row mt-5">
                                        @for ($j = $i * $itemsPerSlide; $j < min(($i + 1) * $itemsPerSlide, $totalCompanies); $j++)
                                        <div class="col">
                                            <img src="{{ $companies[$j]->company_logo }}" class="img-fluid" alt="{{ $companies[$j]->company_name }}" width="150" height="150">
                                        </div>
                                        @endfor
                                    </div>
                                </div>
                                @endfor
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
                                            <li class="">₹{{ $product->selling_price }}</li>
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
                                                <a href="#" class="btn btn-success"><em class="icon ni ni-equal-sm"></em>&nbsp;Add to Wishlist</a>
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
