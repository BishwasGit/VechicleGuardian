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
                            <div class="nk-block">
                                <form action="{{ route('party.store') }}" method="POST" class="card p-3">
                                    @csrf
                                    <h3>Add Party Details</h3><hr>
                                    <div class="row">
                                    <div class="form-group col-6">
                                        <label for="party_name" class="form-label">Party Name</label>
                                        <input type="text" class="form-control" id="party_name" name="party_name"
                                            required>
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="contact_person" class="form-label">Telephone</label>
                                        <input type="text" class="form-control" id="contact_person"
                                            name="contact_person" required>
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" name="email">
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="phone" class="form-label">Mobile Phone</label>
                                        <input type="text" class="form-control" id="phone" name="phone" required>
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="address" class="form-label">Address</label>
                                        <input class="form-control" id="address" name="address"></input>
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="amount_due" class="form-label">Amount Due</label>
                                        <input class="form-control" id="amount_due" name="amount_due"></input>
                                    </div>

                                    <div class="form-group col-6 mt-4">
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="is_debtor" name="is_debtor"
                                            onclick="uncheckCreditor()">
                                        <label class="form-check-label" for="is_debtor">Is Debtor</label>
                                    </div>
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="is_creditor" name="is_creditor"
                                            onclick="uncheckDebtor()">
                                        <label class="form-check-label" for="is_creditor">Is Creditor</label>
                                    </div>
                                </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary my-3 col-4">Submit</button>
                                </form>
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
    <script>
        function uncheckCreditor() {
            if (document.getElementById('is_creditor').checked) {
                document.getElementById('is_creditor').checked = false;
            }
        }

        function uncheckDebtor() {
            if (document.getElementById('is_debtor').checked) {
                document.getElementById('is_debtor').checked = false;
            }
        }
    </script>
@endpush
