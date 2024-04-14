@extends('shop.layouts.layout')
@section('content')
    <div class="nk-app-root">
        <div class="nk-main">
            @include('shop.includes.sidebar')
            <div class="nk-wrap">
                @include('shop.includes.navbar')
                <div class="nk-content">
                    <div class="container-fluid">
                        <div class="nk-content-inner">
                            @php
                                $products = DB::table('inventories')->where('item_for_sale', '0')->get()
                            @endphp
                            <div class="row g-gs">
                                @foreach($products as $product)
                                <div class="col-sm-6 col-xl-4 col-xxl-3">
                                    <div class="card text-center h-100">
                                        <div class="card-body">
                                            <div class=""><img
                                                    src="{{ $product->item_image }}" alt="user"></div>
                                            <div class="mt-1 mb-4"><a href="#"
                                                    class="my-2 h3">{{ $product->item_name }}</a>
                                            </div>
                                            <div class="row g-gs justify-content-center">
                                                <div class="col-4">
                                                    <a href="#"><em class="icon ni ni-plus"></em></a>
                                                </div>
                                                <div class="col-4">
                                                   <a href="#"><em class="icon ni ni-equal-sm"></em></a>
                                                </div>
                                                <div class="col-4">
                                                    <a href="#"><em class="icon ni ni-share"></em></a>
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
