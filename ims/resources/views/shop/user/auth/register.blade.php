@extends('repairpartseller.layouts.layout')
@section('content')
<div class="nk-app-root">
    <div class="nk-main">
        <div class="nk-wrap align-items-center justify-content-center">
            <div class="container p-2 p-sm-4">
                <div class="wide-xs mx-auto">
                    <div class="card card-gutter-lg rounded-4 card-auth">
                        <div class="card-body">
                            <div class="nk-block-head">
                                <div class="nk-block-head-content">
                                    <h3 class="nk-block-title mb-1">Create New Account</h3>
                                    <p class="small">
                                        Please register an account
                                      </p>
                                </div>
                            </div>
                            <form action="{{ route('ecomm.user.registration') }}" method="post">
                                @csrf
                                <div class="row gy-3">
                                    <div class="col-12">
                                        <div class="form-group"><label for="username"
                                                class="form-label">Username</label>
                                            <div class="form-control-wrap"><input type="text" class="form-control"
                                                    id="username" placeholder="Enter username" name="user_name"></div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group"><label for="phone"
                                                class="form-label">Phone</label>
                                            <div class="form-control-wrap"><input type="text" class="form-control"
                                                    id="phone" placeholder="Enter phone number" name="user_phone"></div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group"><label for="email" class="form-label">Email</label>
                                            <div class="form-control-wrap"><input type="email" class="form-control"
                                                    id="email" placeholder="Enter email address" name="user_email"></div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group"><label for="password"
                                                class="form-label">Password</label>
                                            <div class="form-control-wrap"><input type="password" class="form-control"
                                                    id="password" placeholder="Enter password" name="password"></div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-grid"><button class="btn btn-primary" type="submit">Register</button></div>
                                    </div>
                                </div>
                            </form>
                            <div class="my-3 text-center">
                                <h6 class="overline-title overline-title-sep"><span>OR</span></h6>
                            </div>
                            <div class="row g-2">
                                <div class="col-sm-6"><a href="#" class="btn btn-outline-light w-100"><img
                                            src="{{ asset('assets/images/icon/d.png') }}" alt="" class="icon"><span
                                            class="fw-medium">With Google</span></a></div>
                                <div class="col-sm-6"><a href="#" class="btn btn-outline-light w-100"><img
                                            src="{{ asset('assets/images/icon/b.png') }}" alt="" class="icon"><span
                                            class="fw-medium">With Facebook</span></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-5">
                        <p class="small">Already have an account? <a href="{{ route('ecomm.user.login') }}">Login</a></p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
@endsection
