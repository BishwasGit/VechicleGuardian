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
                    <img class="nk-nav-text" src="{{asset('/assets/output1.png')}}" height="" width="200px">
                    </li>
                </ul>
            </nav>
            <div class="search-inline">
                <div class="form-control-wrap flex-grow-1 dataTable-search"><input placeholder="Search Here" type="text" class="form-control-plaintext" class="dataTable-input"></div><em class="icon icon-sm ni ni-search"></em>
            </div>
            <div class="nk-header-tools">
                <button class="btn btn-icon btn-md btn-zoom d-none d-sm-inline-flex" data-bs-toggle="offcanvas" data-bs-target="#notificationOffcanvas"><em class="icon ni ni-bell"></em></button>
                <button class="btn btn-icon btn-md btn-zoom d-none d-sm-inline-flex" data-bs-toggle="offcanvas" data-bs-target="#notificationOffcanvas"><em class="icon ni ni-cart-fill"></em></button>
                <button class="btn btn-icon btn-md btn-zoom d-none d-sm-inline-flex" data-bs-toggle="offcanvas" data-bs-target="#notificationOffcanvas"><em class="icon ni ni-user-alt-fill"></em></button>
            </div>
        </div>
        <div class="container my-3">
            <ul class="nk-menu-sub flex-row" style="display: flex; flex-direction: row;">
                @php
                $vehicleCategories = DB::table('vehicle_category')->get();
                @endphp
                @foreach($vehicleCategories as $vehicleCategory)
                <li class="nk-menu-item has-sub" style="list-style-type: none; margin-right: 10px;">
                    <a href="#" class="nk-menu-link nk-menu-toggle">
                        <span class="nk-menu-text" style="margin-right: 10px;">{{ $vehicleCategory->Vehicle_category }}</span>
                        <span class="dropdown-arrow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </a>
                    <ul class="nk-menu-sub" style="display: none; flex-direction: row;">
                        @php
                        $associatedCategories = DB::table('categories')
                        ->where('vehicle_category_id', $vehicleCategory->vehicle_category_id)
                        ->get();
                        @endphp
                        @foreach($associatedCategories as $associatedCategory)
                        <li class="nk-menu-item" style="list-style-type: none; margin-right: 10px;">
                            <a href="{{ route('shop.categorized.details',['id'=>$associatedCategory->category_id]) }}" class="nk-menu-link">
                                <span class="nk-menu-text">{{ $associatedCategory->category_name }}</span>
                            </a>
                        </li>
                        @endforeach
                    </ul>
                </li>
                @endforeach
            </ul>
        </div>
    </div>
</div>