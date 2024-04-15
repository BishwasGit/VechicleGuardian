<div class="nk-sidebar nk-sidebar-fixed is-theme left-fixed" id="sidebar">
    <div class="nk-sidebar-element nk-sidebar-head">
        <div class="nk-sidebar-brand"><a href="index-2.html" class="logo-link">
                <div class="logo-wrap">
                    <!-- SIDE BAR LOGO HERE-->
                    <h1 class="logo-title">LOGO HERE</h1>
                </div>
            </a>
            <div class="nk-compact-toggle me-n1"><button
                    class="btn btn-md btn-icon text-light btn-no-hover compact-toggle"><em
                        class="icon off ni ni-chevrons-left"></em><em
                        class="icon on ni ni-chevrons-right"></em></button></div>
            <div class="nk-sidebar-toggle me-n1"><button
                    class="btn btn-md btn-icon text-light btn-no-hover sidebar-toggle"><em
                        class="icon ni ni-arrow-left"></em></button></div>
        </div>
    </div>
    <div class="nk-sidebar-element nk-sidebar-body">
        <div class="nk-sidebar-content">
            <div class="nk-sidebar-menu" data-simplebar>
                <ul class="nk-menu">
                    <li class="nk-menu-item">
                        <a href="{{ route('shop.index') }}" class="nk-menu-link">
                            <span class="nk-menu-icon"><em class="icon ni ni-bag"></em></span>
                            <span class="nk-menu-text">All Products</span>
                        </a>
                    </li>
                    <li class="nk-menu-item has-sub">
                        <a href="#" class="nk-menu-link nk-menu-toggle">
                            <span class="nk-menu-icon"><em class="icon ni ni-cart"></em></span>
                            <span class="nk-menu-text">Product Categories</span>
                        </a>
                        <ul class="nk-menu-sub">
                            @php
                            $vehicleCategories = DB::table('vehicle_category')->get();
                            @endphp
                            @foreach($vehicleCategories as $vehicleCategory)
                            <li class="nk-menu-item has-sub">
                                <a href="#" class="nk-menu-link nk-menu-toggle">
                                    <span class="nk-menu-text">{{ $vehicleCategory->Vehicle_category }}</span>
                                </a>
                                <ul class="nk-menu-sub">
                                    @php
                                    $associatedCategories = DB::table('categories')
                                        ->where('vehicle_category_id', $vehicleCategory->vehicle_category_id)
                                        ->get();
                                    @endphp
                                    @foreach($associatedCategories as $associatedCategory)
                                    <li class="nk-menu-item">
                                        <a href="{{ route('shop.categorized.details',['id'=>$associatedCategory->category_id]) }}" class="nk-menu-link">
                                            <span class="nk-menu-text">{{ $associatedCategory->category_name }}</span>
                                        </a>
                                    </li>
                                    @endforeach
                                </ul>
                            </li>
                            @endforeach
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
