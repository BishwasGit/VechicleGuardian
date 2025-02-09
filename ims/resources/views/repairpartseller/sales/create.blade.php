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
                          <div class="nk-content-body">
                            <div class="nk-block">
                                <div class="nk-block">
                                    <div class="card p-4">
                                        <div class="nk-block">
                                            <div class="nk-block-head mb-1">
                                                <h1 class="title">Add New Sale</h1>
                                                <hr>
                                            </div>
                                            <div class="nk-block">
                                                <form action="#" method="POST" id="new-sale-form">
                                                    @csrf
                                                    <div class="row">
                                                    <div class="form-group col-3 my-3">
                                                        <label class="form-label" for="sold_to">Sold To</label>
                                                        <input type="text" class="form-control" id="sold_to" name="sold_to" min="1">
                                                    </div>
                                                    <div class="form-group col-3 my-3">
                                                        <label class="form-label" for="sold_at">Sold At</label>
                                                        <input type="text" class="form-control" id="sold_at" name="sold_at" value={{ Date(now()) }} readonly>
                                                    </div>
                                                </div>
                                                <div class="card p-4">
                                                    <table class="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Item <br>Name</th>
                                                                <th>Current <br>Quantity</th>
                                                                <th>Price <br>Per Unit</th>
                                                                <th>Quantity<br>To be sold</th>
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="sale-items">
                                                            <tr>
                                                                <td colspan="2"><button type="button" class="btn btn-primary mt-3" id="add-row">Add Items</button></td>
                                                            <td>
                                                                <div>
                                                                    <label for="vat">VAT:</label>
                                                                    <input type="number" class="form-control" id="vat" name="vat" required>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <label for="showtotalprices">Total: (without VAT)</label>
                                                                <input class="form-control" id="showtotalprices" name="showtotalprices" readonly>
                                                            </td>
                                                            <td>
                                                            <div>
                                                                <label for="grand_total">Grand Total:</label>
                                                                <input type="number" class="form-control" id="grand_total" name="grand_total" readonly>
                                                            </div>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <button type="submit" class="btn btn-primary mt-3" id="submit-sales">Add Sale</button>
                                                </form>
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
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
     $(document).ready(function() {
    var rowCount = 1; // Initialize row counter

    $('#add-row').click(function() {
        var newRow = $('<tr></tr>');
        newRow.append('<td><select class="form-control" id="item_id_' + rowCount + '" name="item_id"><option value="">Select Item</option>@foreach($data as $item)<option value="{{ $item->item_id }}" data-quantity="{{ $item->item_quantity }}" data-price="{{ $item->item_price }}">{{ $item->item_name }}</option>@endforeach</select></td>');
        newRow.append('<td><input type="text" class="form-control" id="current_quantity_' + rowCount + '" name="current_quantity" readonly></td>');
        newRow.append('<td><input type="text" class="form-control" id="price_per_unit_' + rowCount + '" name="price_per_unit" readonly></td>');
        newRow.append('<td><input type="number" class="form-control quantity_sold" data-row="' + rowCount + '" min="1" required></td>');
        newRow.append('<td><input type="text" class="form-control" id="total_price_' + rowCount + '" name="total_price" readonly></td>');

        $('#add-row').parent().parent().before(newRow);
        rowCount++;
    });

    // Event delegation for dynamically added input elements
    $('#sale-items').on('change', '[id^="item_id_"]', function() {
        var selectedOption = $(this).find(':selected');
        var currentQuantity = selectedOption.data('quantity');
        var pricePerUnit = selectedOption.data('price');
        var rowId = $(this).attr('id').split('_')[2];

        $('#current_quantity_' + rowId).val(currentQuantity);
        $('#price_per_unit_' + rowId).val(pricePerUnit);
        $('.quantity_sold[data-row="' + rowId + '"]').attr('max', currentQuantity);
        calculateTotalPrice(rowId);
    });

    // Event delegation for dynamically added input elements
    $('#sale-items').on('input', '.quantity_sold', function() {
        var rowId = $(this).data('row');
        var currentQuantity = parseInt($('#current_quantity_' + rowId).val());
        var quantitySold = parseInt($(this).val());

        if (quantitySold > currentQuantity) {
            $(this).get(0).setCustomValidity('Quantity to be sold cannot exceed current quantity');
        } else {
            $(this).get(0).setCustomValidity('');
            calculateTotalPrice(rowId);
        }
    });

    function calculateTotalPrice(rowId) {
        var quantitySold = parseInt($('.quantity_sold[data-row="' + rowId + '"]').val());
        var pricePerUnit = parseFloat($('#price_per_unit_' + rowId).val());
        var totalPrice = quantitySold * pricePerUnit;

        $('#total_price_' + rowId).val(totalPrice.toFixed(2));
    }
    function calculateGrandTotal() {
        var totalPrices = 0; // Initialize total prices variable
        $('[id^="item_id_"]').each(function() {
            var rowId = $(this).attr('id').split('_')[2];
            var totalPrice = $('#total_price_' + rowId).val();
            totalPrices += parseFloat(totalPrice); // Add to total prices
        });

        var vatPercentage = parseFloat($('#vat').val()); // Get VAT percentage
        var vatAmount = (totalPrices * vatPercentage) / 100; // Calculate VAT amount
        var grandTotal = totalPrices + vatAmount; // Calculate grand total
        // Display VAT amount and grand total
        $('#vat').val(vatAmount.toFixed(2));
        $('#grand_total').val(grandTotal.toFixed(2));
        $('#showtotalprices').val(totalPrices.toFixed(2));
    }
    calculateGrandTotal();
    $('#vat').change(function() {
        calculateGrandTotal();
    });
    $('#submit-sales').click(function(event) {
                        event.preventDefault();
                        var saleItems = [];
                        var grandTotal = $('#grand_total').val();
                        var vatAmmount = $('#vat').val();
                        var soldTo = $('#sold_to').val();
                        $('[id^="item_id_"]').each(function() {
                            var rowId = $(this).attr('id').split('_')[2];
                            var itemId = $(this).val();
                            var currentQuantity = $('#current_quantity_' + rowId).val();
                            var pricePerUnit = $('#price_per_unit_' + rowId).val();
                            var quantitySold = $('.quantity_sold[data-row="' + rowId + '"]').val();
                            var totalPrice = $('#total_price_' + rowId).val();
                            var rowData = {
                                item_id: itemId,
                                current_quantity: currentQuantity,
                                price_per_unit: pricePerUnit,
                                quantity_sold: quantitySold,
                                total_price: totalPrice,
                                grand_total: grandTotal,
                                vat: vatAmmount,
                                sold_to : soldTo,
                            };
                            saleItems.push(rowData);
                        });
                        var jsonData = JSON.stringify(saleItems);
                        var csrfToken = $('meta[name="csrf-token"]').attr('content');
                        $.ajax({
                    url: '{{ route("repairpartseller.sales.store") }}',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    },
                    data: jsonData
                })
                .then(function(response) {
                    // Handle success response
                    console.log(response);
                    // Show success message using SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Sale recorded successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(function(){
                            window.location.reload();
                        }, 1500);
                })
                .catch(function(xhr, status, error) {
                    // Handle error response
                    console.error(xhr.responseText);
                    // Show error message using SweetAlert
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred. Please try again later.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
    });
});

    </script>
@endpush
