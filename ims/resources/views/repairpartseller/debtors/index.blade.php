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
                                            <div class="nk-block-head-content">
                                                <div class="dropdown">
                                                    <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                      Download As
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                      <li><a class="dropdown-item" href="#">CSV</a></li>
                                                      <li><a class="dropdown-item" href="#">Excel</a></li>
                                                      <li><a class="dropdown-item" href="#">PDF</a></li>
                                                    </ul>
                                                  </div>
                                            </div>
                                        </div>
                                        <div class="nk-block-head-content">
                                            <ul class="d-flex">
                                                <li>
                                                    <a href="{{ route('repairpartseller.debtors.create') }}"
                                                        class="btn btn-md d-md-none btn-primary">
                                                        <em class="icon ni ni-plus"></em><span>Add</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('repairpartseller.debtors.create') }}"
                                                        class="btn btn-primary d-none d-md-inline-flex">
                                                        <em class="icon ni ni-plus"></em><span>Add Debtors</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block">
                                    <div class="card">
                                        <table class="datatable-init table dataTable-table"
                                        data-nk-container="table-responsive">
                                        <thead class="table-light">
                                            <tr>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Debtors_id</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Debtors Name</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Debtors Contact</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Ammount Due</span>
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
                                            @foreach($data as $item)
                                            <tr>
                                                <td class="tb-col">{{ $item->debtor_id }}</td>
                                                <td class="tb-col">{{ $item->debtor_name }}</td>
                                                <td class="tb-col">{{ $item->debtor_contact }}</td>
                                                <td class="tb-col">{{ $item->amount_due }}</td>
                                                <td class="tb-col tb-col-end">
                                                    <div class="d-flex justify-content-end gap g-2">
                                                        <div class="gap-col">
                                                            <a href="#" id="delete-debtor"
                                                                class="btn btn-sm bg-danger-soft delete-debtor"
                                                                data-seller-id="{{ $item->seller_uuid }}">
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
@endsection
@push('js')
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        // Add event listener to delete link with the class 'delete-item'
        $('.delete-debtor').on('click', function(event) {
            event.preventDefault();
            const seller_uuid = $(this).data('seller-id');
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
                        url: "{{ route('repairpartseller.debtors.delete', ':id') }}"
                            .replace(':id', seller_uuid),
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function(response) {
                            if (response && response.message) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your item has been deleted.',
                                    'success'
                                ).then(() => {
                                    window.location.reload();
                                });
                            } else {
                                Swal.fire(
                                    'Error!',
                                    'An error occurred while deleting the item.',
                                    'error'
                                );
                            }
                        },
                        error: function(xhr, status, error) {
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
