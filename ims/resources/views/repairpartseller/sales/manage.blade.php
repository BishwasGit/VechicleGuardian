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
                                <div class="nk-block-head">
                                    <div class="nk-block-head-between flex-wrap gap g-2">
                                        <div class="nk-block-head-content">
                                            <h2 class="nk-block-title">Manage Sales</h2>
                                            <nav>
                                                <ol class="breadcrumb breadcrumb-arrow mb-0">
                                                    <li class="breadcrumb-item"><a href="#">sales</a></li>
                                                </ol>
                                            </nav>
                                        </div>
                                        <div class="nk-block-head-content">
                                            <ul class="d-flex">

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block">
                                    <div class="card">
                                        <div
                                            class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                            <div class="dataTable-top">
                                                <div class="dataTable-dropdown"><label><select class="dataTable-selector">
                                                            <option value="5">5</option>
                                                            <option value="10" selected="">10</option>
                                                            <option value="15">15</option>
                                                            <option value="20">20</option>
                                                            <option value="25">25</option>
                                                        </select> Per page</label></div>
                                                <div class="dataTable-search"><input class="dataTable-input"
                                                        placeholder="Search..." type="text"></div>
                                            </div>
                                            <div class="dataTable-container table-responsive">
                                                <table class="datatable-init table dataTable-table"
                                                    data-nk-container="table-responsive">
                                                    <thead class="table-light">
                                                        <tr>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Sales Id</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Item_id</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Quantity Sold</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Total Price</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Sold At</span>
                                                                </a>
                                                            </th>
                                                            <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                                <a href="#" class="dataTable-sorter">
                                                                    <span class="overline-title">Action</span>
                                                                </a>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        @foreach ($sales as $item)
                                                            <tr>
                                                                <td class="tb-col">{{ $item->sales_id }}</td>
                                                                <td class="tb-col">{{ $item->item->item_name }}</td>
                                                                <td class="tb-col">{{ $item->quantity_sold }}</td>
                                                                <td class="tb-col">{{ $item->total_price }}</td>
                                                                <td class="tb-col">{{ $item->sold_at }}</td>
                                                                <td class="tb-col tb-col-end">
                                                                    <div class="d-flex justify-content-end gap g-2">
                                                                        <div class="gap-col"><a type="button"
                                                                                class="btn btn-sm btn-icon bg-primary-soft"
                                                                                title="Print"
                                                                                href="{{ route('sales.edit', ['id' => $item->sales_id]) }}"><em
                                                                                    class="icon ni ni-edit"></em></a>
                                                                        </div>
                                                                        <div class="gap-col"><a
                                                                                href="{{ route('sales.show', ['id' => $item->sales_id]) }}"
                                                                                class="btn btn-sm bg-success-soft"> <em
                                                                                    class="icon ni ni-eye"></em>
                                                                            </a></div>
                                                                        <div class="gap-col">
                                                                            <a href="#" id="delete-item"
                                                                                class="btn btn-sm bg-danger-soft delete-item"
                                                                                data-item-id="{{ $item->sales_id }}">
                                                                                <em class="icon ni ni-trash"></em>
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                    </tbody>
                                                </table>
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
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        // Add event listener to delete link with the class 'delete-item'
        $('.delete-item').on('click', function(event) {
            event.preventDefault();
            const itemId = $(this).data('item-id');
            // Show confirmation dialog
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Make Ajax request to delete route
                    $.ajax({
                        type: 'DELETE',
                        url: "{{ route('repairpartseller.inventories.inventories.destroy', ':id') }}"
                            .replace(':id', itemId),
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function(response) {
                            // Handle success response
                            Swal.fire(
                                'Deleted!',
                                'Your item has been deleted.',
                                'success'
                            ).then(() => {
                                // Reload the page or update UI as needed
                                window.location.reload();
                            });
                        },
                        error: function(xhr, status, error) {
                            // Handle error response
                            Swal.fire(
                                'Error!',
                                'An error occurred while deleting the item.',
                                'error'
                            );
                        }
                    });
                }
            });
        });
    </script>
@endpush
