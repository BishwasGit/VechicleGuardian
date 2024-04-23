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
                                <div class="card p-3">
                                    <form action="{{ route('vehiclemodel.store') }}" method="POST"
                                        enctype="multipart/form-data">
                                        <div class="row">
                                            @csrf
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="vehicle_category_id">Vehicle Wheel
                                                    Type</label>
                                                <select id="vehicle_category_id" name="vehicle_category_id"
                                                    class="form-select">
                                                    @foreach ($wheeler_category as $wheeler)
                                                        <option value={{ $wheeler->vehicle_category_id }}>
                                                            {{ $wheeler->Vehicle_category }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="company_id">Vehicle Make</label>
                                                <select id="company_id" name="company_id" class="form-select">
                                                    @foreach ($vehicle_companies as $company)
                                                        <option value={{ $company->companies_id }}>
                                                            {{ $company->company_name }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="vehicle_model">Vehicle Model</label>
                                                <input type="text" id="vehicle_model" name="vehicle_model"
                                                    class="form-control">
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="year_of_launch">Year of Launch</label>
                                                <select id="year_of_launch" name="year_of_launch" class="form-select">
                                                    @for ($year = date('Y'); $year >= 1900; $year--)
                                                        <option value="{{ $year }}">{{ $year }}</option>
                                                    @endfor
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="vehicle_type">Vehicle Type</label>
                                                <select id="vehicle_type" name="vehicle_type" class="form-select">
                                                    <option value="sedan">Other</option>
                                                    <option value="sedan">Sedan</option>
                                                    <option value="SUV">SUV</option>
                                                    <option value="truck">Truck</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="engine_type">Engine Type</label>
                                                <select id="engine_type" name="engine_type" class="form-select">
                                                    <option value="petrol">Petrol</option>
                                                    <option value="diesel">Diesel</option>
                                                    <option value="hybrid">Hybrid</option>
                                                    <option value="electric">Electric</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="fuel_efficiency">Fuel Efficiency (MPG/L per
                                                    100km)</label>
                                                <input type="number" id="fuel_efficiency" name="fuel_efficiency"
                                                    step="0.01" class="form-control">
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="transmission_type">Transmission
                                                    Type</label>
                                                <select id="transmission_type" name="transmission_type" class="form-select">
                                                    <option value="automatic">Automatic</option>
                                                    <option value="manual">Manual</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="number_of_seats">Number of Seats</label>
                                                <input type="number" id="number_of_seats" name="number_of_seats"
                                                    min="1" class="form-control">
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label class ="form-label" for="price">Price</label>
                                                <input type="number" id="price" name="price" step="0.01"
                                                    class="form-control">
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <label class ="form-label" for="additional_features">Additional
                                                    Features</label>
                                                <textarea id="additional_features" name="additional_features" class="form-control"></textarea>
                                            </div>
                                            <div class="form-group col mt-3">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
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
