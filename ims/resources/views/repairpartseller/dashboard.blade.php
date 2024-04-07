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
                            @include('repairpartseller.includes.bodycontents')
                        </div>
                    </div>
                </div>
                @include('repairpartseller.includes.nkfooter')
            </div>
        </div>
    </div>
@endsection
