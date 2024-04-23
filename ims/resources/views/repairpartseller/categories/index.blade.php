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
                                <div class="row">
                                    <div class="col-4">
                                        <form action="{{ route('repairpartseller.categories.store') }}" method="POST"
                                        enctype="multipart/form-data" id="parts_category_form">
                                        @csrf
                                        <div class="form-group">
                                            <label for="creditor" class="form-label">Category
                                                Name</label>
                                            <div class="form-control-wrap">
                                                <input type="text" class="form-control"
                                                    id="category_name" name="category_name"
                                                    placeholder="category_name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-control-wrap">
                                                <button type="button" id="submitBtn" class="btn btn-primary mt-3">Submit</button>
                                            </div>
                                        </div>
                                        </form>
                                    </div>
                                    <div class="col-8">
                                    <div class="nk-block">
                                    <div class="card">
                                        <table class="datatable-init table dataTable-table"
                                        data-nk-container="table-responsive">
                                        <thead class="table-light">
                                            <tr>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Categories Id</span>
                                                    </a>
                                                </th>
                                                <th class="tb-col" data-sortable="" style="width: 30.1887%;">
                                                    <a href="#" class="dataTable-sorter">
                                                        <span class="overline-title">Categories Name</span>
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
                                            @foreach ($categoriesList as $item )
                                            <tr>
                                                <td class="tb-col">{{ $item->category_id }}</td>
                                                <td class="tb-col">{{ $item->category_name }}</td>
                                                <td class="tb-col">
                                                    <div class="d-flex justify-content-end gap g-2">
                                                    <div class="gap-col"><a type="button"
                                                        class="btn btn-sm btn-icon bg-primary-soft"
                                                        title="Print"
                                                        href="{{ route('repairpartseller.catregories.edit', ['id' => $item->category_id]) }}"><em
                                                            class="icon ni ni-edit"></em></a>
                                                        </div>
                                                        <div class="gap-col">
                                                            <a href="#" id="delete-categories"
                                                                class="btn btn-sm bg-danger-soft delete-categories"
                                                                data-seller-id="{{ $item->category_idcategory_id }}">
                                                                <em class="icon ni ni-trash"></em>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

    <script>
        $(document).ready(function() {
            $('#submitBtn').click(function(event) {
                event.preventDefault();
                var formData = $('#parts_category_form').serialize();
                $.ajax({
                    url: $('#parts_category_form').attr('action'),
                    type: 'POST',
                    data: formData,
                    success: function(response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.message,
                            timer: 1500, 
                            showConfirmButton: false
                        });
    
                        setTimeout(function() {
                            location.reload();
                        }, 1500); 
                    },
                    error: function(xhr, status, error) {
                        console.error(error);
                    }
                });
            });
        });
    </script>