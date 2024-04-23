@extends('shop.layouts.layout')
@section('content')
    <div class="nk-app-root">
        <div class="nk-main">
            @include('shop.includes.sidebar')
            <div class="nk-wrap">
                @include('shop.includes.navbar')
                <div class="nk-content mt-5">
                    <div class="container-fluid mt-5">
                        <div class="nk-content-inner mt-5">
                            <div class="row g-gs mt-5">
                                @foreach($getdata as $data)
                                <div class="col-sm-6 col-xl-4 col-xxl-3 mt-5">
                                    <div class="card text-center h-100 mt-5">
                                        <div class="card-body">
                                            <div class=""><img
                                                    src="{{ $data->item_image }}" alt="user"></div>
                                            <div class="mt-1 mb-4"><a href="#"
                                                    class="my-2 h3">{{ $data->item_name }}</a>
                                            </div>
                                            <div class="rating">
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
