@extends('shop.layouts.layout')
@push('css')
    <style>
        .modal.right .modal-dialog {
            margin-right: 1.5rem;
            position: fixed;
            margin: auto;
            width: 50%;
            height: 100%;
            right: -50%;
            top: 0;
            transform: translate3d(0, 0, 0);
            transition: right 0.3s ease;
            border-radius: 0px !important;
        }

        .modal.right.show .modal-dialog {
            right: 10px;
        }

        .modal.right .modal-content {
            height: 100%;
            overflow-y: auto;
        }
    </style>
@endpush
@section('content')
    <div class="nk-app-root">
        <div class="nk-main">
            <div class="nk-wrap">
                @include('shop.authenticated.includes.navbar')
                @php
                    $products = DB::table('inventories')->where('item_for_sale', '0')->get();
                    $shoppingCartItems = DB::connection('ecomm')
                        ->table('shopping_carts')
                        ->where('user_uuid', $user->user_uuid)
                        ->pluck('item_uuid')
                        ->toArray();
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
                                                        <img src="{{ $companies[$j]->company_logo }}" class="img-fluid"
                                                            alt="{{ $companies[$j]->company_name }}" width="150"
                                                            height="150">
                                                    </div>
                                                @endfor
                                            </div>
                                        </div>
                                    @endfor
                                </div>

                                <button class="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="toast mt-2" role="alert" aria-live="assertive" aria-atomic="true"
                                id="successToast">
                                <div class="toast-header">
                                    <strong class="me-auto">Success</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Product added to cart!
                                </div>
                            </div>
                            <div class="toast mt-2" role="alert" aria-live="assertive" aria-atomic="true" id="errorToast">
                                <div class="toast-header">
                                    <strong class="me-auto">Error</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Failed to add prodcut
                                </div>
                            </div>
                            <div class="row g-gs mt-5">
                                @foreach ($products as $product)
                                    <div class="col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card text-center h-100">
                                            <div class="card-body">
                                                <div class=""><img src="{{ $product->item_image }}" alt="user">
                                                </div>
                                                <div class="mt-1 mb-4"><a
                                                        href="{{ route('item.details', ['uuid' => $product->item_uuid]) }}"
                                                        class="my-2 h3">{{ $product->item_name }}</a>
                                                </div>
                                                <div class="price" style="list-style: none;">
                                                    <li class="">₹{{ $product->selling_price }}</li>
                                                </div>
                                                <div class="rating d-flex flex-row align-items-center justify-content-center py-2"
                                                    style="list-style: none;">
                                                    <li class="rating-label checked"><em class="icon ni ni-star-fill"></em>
                                                    </li>
                                                    <li class="rating-label checked"><em class="icon ni ni-star-fill"></em>
                                                    </li>
                                                    <li class="rating-label checked"><em class="icon ni ni-star-fill"></em>
                                                    </li>
                                                    <li class="rating-label checked"><em class="icon ni ni-star-fill"></em>
                                                    </li>
                                                </div>
                                                <div class="row g-gs d-flex flex-column">
                                                    <div class="col">
                                                        @if (in_array($product->item_uuid, $shoppingCartItems))
                                                            <a href="#" class="btn btn-warning view-cart-btn"
                                                                data-product-uuid="{{ $product->item_uuid }}"
                                                                data-user-uuid="{{ $user->user_uuid }}><em class="icon ni
                                                                ni-cart-fill"></em>&nbsp;View in Cart</a>
                                                        @else
                                                            <a href="#" class="btn btn-primary add-to-cart-btn"
                                                                data-product-uuid="{{ $product->item_uuid }}"
                                                                data-user-uuid="{{ $user->user_uuid }}"><em
                                                                    class="icon ni ni-plus"></em>&nbsp;Add to cart</a>
                                                        @endif
                                                    </div>
                                                    <div class="col">
                                                        <a href="{{ route('ecomm.user.wishlist', ['product_uuid' => $product->item_uuid, 'user_uuid' => $user->user_uuid]) }}"
                                                            class="btn btn-success"><em
                                                                class="icon ni ni-equal-sm"></em>&nbsp;Add to Wishlist</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                                <div class="modal right fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-vertical modal-dialog-right"
                                        style="width: 50%;">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="cartModalLabel">Cart Details</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="spinner-grow text-primary d-flex justify-content-center align-item-center" role="status" id="loader">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                                <span id="itemDetails">
                                                </span>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary">Order Now</button>
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
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
@push('js')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        $(document).ready(function() {
            $('.add-to-cart-btn').click(function(e) {
                e.preventDefault();
                var productUUID = $(this).data('product-uuid');
                var userUUID = $(this).data('user-uuid');
                $.ajax({
                    url: "{{ route('ecomm.user.addtocart', ['product_uuid' => ':product_uuid', 'user_uuid' => ':user_uuid']) }}"
                        .replace(':product_uuid', productUUID)
                        .replace(':user_uuid', userUUID),
                    type: 'GET',
                    success: function(response) {
                        $('.toast-body').text('Product added to cart!');
                        $('#successToast').toast('show');
                        if (response.isInCart) {
                            $('.add-to-cart-btn[data-product-uuid="' + productUUID + '"]')
                                .hide();
                            $('.view-cart-btn[data-product-uuid="' + productUUID + '"]')
                                .removeClass('d-none');;
                        } else {
                            $('.add-to-cart-btn[data-product-uuid="' + productUUID + '"]')
                                .show();
                            $('.view-cart-btn[data-product-uuid="' + productUUID + '"]')
                                .addClass('d-none');
                        }
                    },
                    error: function(xhr, status, error) {
                        $('.toast-body').text('Failed to add prodcut');
                        $('#errorToast').toast('show');
                    }
                });
            });
        });
        $.ajax({
            error: function(xhr, status, error) {
                Swal.fire(
                    'Error!',
                    'An error occurred.',
                    'error'
                );
            }
        });

        function openCartModal(itemUUID, userUUID) {
            $('#selectedItemUUID').text(itemUUID);
            $('#userUUID').text(userUUID);
            $('#cartModal').modal('show');
            $('#loader').show();
            $.ajax({
                url: '{{ route('get.item.details') }}',
                type: 'GET',
                data: {
                    item_uuid: itemUUID
                },
                success: function(response) {
                    $('#loader').hide()
                    console.log(response);
                    $('#selectedItemUUID').text(response.item_uuid);
                    $('#userUUID').text(response.user_uuid)

                    function calculateTotalPrice(quantity) {
                        return parseFloat(response.selling_price) * parseInt(quantity);
                    }

                    var itemDetailsHTML = '<div><h5>' + response.item_name + '</h5>';
                    itemDetailsHTML += '<img src="' + response.item_image +
                        '" class="img-fluid" alt="Item Image">';
                    itemDetailsHTML += '<p class="mt-1">Description: ' + response.item_description +
                        '</p>';
                    itemDetailsHTML += '<p>Price: $' + response.selling_price + '</p>';
                    var initialQuantity = 1;
                    var initialTotalPrice = calculateTotalPrice(initialQuantity);
                    itemDetailsHTML += '<p>Total Price: $<span id="totalPrice">' + initialTotalPrice.toFixed(
                        2) + '</span></p>';
                    itemDetailsHTML += '<div class="mb-3">';
                    itemDetailsHTML += '<label for="quantityInput" class="form-label">Quantity:</label>';
                    itemDetailsHTML +=
                        '<input type="number" class="form-control" id="quantityInput" value="1" min="1" max="' +
                        response.item_quantity + '">';
                    itemDetailsHTML += '</div></div>';
                    $('#itemDetails').html(itemDetailsHTML);
                    $('#cartModal').modal('show');
                    $('#quantityInput').on('input', function() {
                        var selectedQuantity = parseInt($(this).val());
                        var totalPrice = calculateTotalPrice(selectedQuantity);
                        $('#totalPrice').text(totalPrice.toFixed(2));
                    });
                    $('#addToCartBtn').click(function() {
                        var selectedQuantity = parseInt($('#quantityInput').val());
                        var totalQuantity = parseInt(response.item_quantity);
                        if (selectedQuantity > totalQuantity) {
                            alert('Selected quantity exceeds available quantity.');
                            return;
                        }
                        console.log('Selected quantity:', selectedQuantity);
                    });
                },
                error: function(xhr) {
                    $('#loader').hide();
                    console.error('Error:', xhr.responseText);
                }
            });
        }

        function closeCartModal() {
            $('#cartModal').modal('hide');
        }
        $('.view-cart-btn').click(function(e) {
            e.preventDefault();
            var itemUUID = $(this).data('product-uuid');
            var userUUID = $(this).data('user-uuid');
            openCartModal(itemUUID, userUUID);
        });
    </script>
@endpush
