<div class="nk-header nk-header-fixed mb-5">
    <div class="container-fluid">
        <div class="nk-header-wrap">
            <div class="nk-header-logo ms-n1">
            </div>
            <nav class="nk-header-menu nk-navbar py-3">
                <ul class="nk-nav">
                    <li class="nk-nav-item">
                        <h5 class="nk-nav-text" id="clock"></h5>
                    </li>
                    <li class="nk-nav-item">
                        <img class="nk-nav-text" src="{{ asset('/assets/output1.png') }}" height="" width="200px">
                    </li>
                </ul>
            </nav>
            <div class="search-inline">
                <div class="form-control-wrap flex-grow-1 dataTable-search"><input placeholder="Search Here"
                        type="text" class="form-control-plaintext" class="dataTable-input"></div><em
                    class="icon icon-sm ni ni-search"></em>
            </div>
            <div class="nk-header-tools">
                <a class="btn btn-icon btn-md btn-zoom d-none d-sm-inline-flex"><em class="icon ni ni-bell"></em></a>
                <a class="btn btn-icon btn-md btn-zoom d-none d-sm-inline-flex"><em class="icon ni ni-cart-fill"></em></a>
                @if(Auth::check())
                <a class="btn btn-icon btn-md btn-zoom d-none d-sm-inline-flex" href="{{ route('shop.authenticated.user',['uuid'=>auth()->user()->uuid]) }}"><em class="icon ni ni-user-alt-fill"></em></a>
                @else
                    <a class="btn btn-icon btn-md btn-zoom d-none d-sm-inline-flex" href="{{ route('ecomm.user.login') }}"><em class="icon ni ni-user-alt-fill"></em></a>
                @endif
            </div>
        </div>
        <div class="container my-3">
            <ul class="nk-menu-sub flex-row" style="display: flex; flex-direction: row;">
                @php
                $vehicleCompanies = DB::table('vehicle_companies')->get();
            @endphp

            @foreach ($vehicleCompanies as $vehicleCompany)
                <li class="nk-menu-item has-sub" style="list-style-type: none; margin-right: 10px;">
                    <a href="#" class="nk-menu-link nk-menu-toggle">
                        <span class="nk-menu-text" style="margin-right: 10px;">{{ $vehicleCompany->company_name }}</span>
                        <span class="dropdown-arrow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </a>
                    <ul class="nk-menu-sub" style="display: none; flex-direction: row;">
                        @php
                            $wheelerCategories = DB::table('vehicle_category')
                                ->get();
                        @endphp
                        @foreach ($wheelerCategories as $wheelerCategory)
                        <li class="has-sub">
                            <a href="#" class="nk-menu-link nk-menu-toggle">
                                <span class="nk-menu-text">{{ $wheelerCategory->Vehicle_category }}</span>
                                <span class="dropdown-arrow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </a>
                            <ul class="nk-menu-sub" style="left: 100%; top: 0;">
                                @php
                                    $vehiclePartsCategories = DB::table('vehicle_parts_categories')->get();
                                @endphp
                                @foreach ($vehiclePartsCategories as $vehiclePartsCategory)
                                    <li><a href="#" style="text-decoration:none;color:black;" class="px-2">{{ $vehiclePartsCategory->category_name }}</a></li>
                                @endforeach
                            </ul>
                        </li>
                        @endforeach
                    </ul>
                </li>
            @endforeach
            </ul>
        </div>
    </div>
</div>
