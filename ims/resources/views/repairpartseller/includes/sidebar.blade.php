<div class="nk-sidebar nk-sidebar-fixed is-theme" id="sidebar">
    <div class="nk-sidebar-element nk-sidebar-head">
        <div class="nk-sidebar-brand"><a href="index-2.html" class="logo-link">
                <div class="logo-wrap">
                    <!-- SIDE BAR LOGO HERE-->
                    <h1 class="logo-title"></h1>
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
                    <!-- Dashboard -->
                    <li class="nk-menu-item">
                        <a href="{{ route('repaircenter_dashboard', ['user' => auth()->user()->seller_uuid]) }}" class="nk-menu-link">
                            <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                            <span class="nk-menu-text">Dashboard</span>
                        </a>
                    </li>
                    <!-- Inventory Management -->
                    <li class="nk-menu-item has-sub">
                        <a href="#" class="nk-menu-link nk-menu-toggle">
                            <span class="nk-menu-icon"><em class="icon ni ni-box"></em></span>
                            <span class="nk-menu-text">Inventory Management</span>
                        </a>
                        <ul class="nk-menu-sub">
                            <li class="nk-menu-item"><a href="{{ route('companies.index') }}" class="nk-menu-link"><span
                                class="nk-menu-text">Add Vehicle Companies</span></a></li>
                            <li class="nk-menu-item"><a href="{{ route('wheelercategory.index') }}" class="nk-menu-link"><span
                                class="nk-menu-text">Add Wheeler Category</span></a></li>
                            <li class="nk-menu-item"><a href="{{ route('repairpartseller.categories') }}" class="nk-menu-link"><span
                                class="nk-menu-text">Add Parts Categories</span></a></li>
                            <li class="nk-menu-item"><a href="{{ route('vehiclemodel.index') }}" class="nk-menu-link"><span
                                class="nk-menu-text">Add Vehicle Models</span></a></li>
                            <li class="nk-menu-item"><a href="{{ route('repairpartseller.inventories.inventories.index') }}" class="nk-menu-link"><span
                                        class="nk-menu-text">Add Rpeiar Parts to Inventory</span></a></li>
                            <li class="nk-menu-item"><a href="{{route('inventories.lowstock',['selleruuid' => auth()->user()->seller_uuid])}}" class="nk-menu-link"><span
                                        class="nk-menu-text">Low Stock</span></a></li>
                        </ul>
                    </li>
                    <li class="nk-menu-item has-sub">
                        <a href="#" class="nk-menu-link nk-menu-toggle">
                            <span class="nk-menu-icon"><em class="icon ni ni-users"></em></span>
                            <span class="nk-menu-text">Debtors</span>
                        </a>
                        <ul class="nk-menu-sub">
                            <li class="nk-menu-item"><a href="{{ route('repairpartseller.debtors') }}" class="nk-menu-link"><span
                                        class="nk-menu-text">Add Debtor</span></a></li>
                        </ul>
                    </li>

                    <!-- Creditors Management -->
                    <li class="nk-menu-item has-sub">
                        <a href="#" class="nk-menu-link nk-menu-toggle">
                            <span class="nk-menu-icon"><em class="icon ni ni-user-check"></em></span>
                            <span class="nk-menu-text">Creditors</span>
                        </a>
                        <ul class="nk-menu-sub">
                            <li class="nk-menu-item"><a href="{{ route('repairpartseller.creditors') }}" class="nk-menu-link"><span
                                        class="nk-menu-text">Add Creditor</span></a></li>
                        </ul>
                    </li>
                    <!-- Sales Management -->
                    <li class="nk-menu-item has-sub">
                        <a href="#" class="nk-menu-link nk-menu-toggle">
                            <span class="nk-menu-icon"><em class="icon ni ni-cart"></em></span>
                            <span class="nk-menu-text">Sales</span>
                        </a>
                        <ul class="nk-menu-sub">
                            <li class="nk-menu-item"><a href="{{ route('repairpartseller.sales.create') }}" class="nk-menu-link"><span
                                        class="nk-menu-text">New Sale</span></a></li>
                            <li class="nk-menu-item"><a href="{{route('sales.manage')}}" class="nk-menu-link"><span
                                        class="nk-menu-text">Manage Sales</span></a></li>
                        </ul>
                    </li>

                    <!-- Purchase Management -->
                    <li class="nk-menu-item has-sub">
                        <a href="#" class="nk-menu-link nk-menu-toggle">
                            <span class="nk-menu-icon"><em class="icon ni ni-bag"></em></span>
                            <span class="nk-menu-text">Purchases</span>
                        </a>
                        <ul class="nk-menu-sub">
                            <li class="nk-menu-item"><a href="purchases/new-purchase.html" class="nk-menu-link"><span
                                        class="nk-menu-text">New Purchase</span></a></li>
                            <li class="nk-menu-item"><a href="purchases/manage-purchases.html"
                                    class="nk-menu-link"><span class="nk-menu-text">Manage Purchases</span></a></li>
                        </ul>
                    </li>

                    <!-- Reports -->
                    <li class="nk-menu-item has-sub">
                        <a href="#" class="nk-menu-link nk-menu-toggle">
                            <span class="nk-menu-icon"><em class="icon ni ni-report"></em></span>
                            <span class="nk-menu-text">Reports</span>
                        </a>
                        <ul class="nk-menu-sub">
                            <li class="nk-menu-item"><a href="reports/inventory-report.html"
                                    class="nk-menu-link"><span class="nk-menu-text">Inventory Report</span></a></li>
                            <li class="nk-menu-item"><a href="reports/sales-report.html" class="nk-menu-link"><span
                                        class="nk-menu-text">Sales Report</span></a></li>
                            <li class="nk-menu-item"><a href="reports/purchase-report.html"
                                    class="nk-menu-link"><span class="nk-menu-text">Purchase Report</span></a></li>
                            <li class="nk-menu-item"><a href="reports/financial-report.html"
                                    class="nk-menu-link"><span class="nk-menu-text">Financial Report</span></a></li>
                        </ul>
                    </li>

                    <!-- settings -->
                    <li class="nk-menu-item has-sub">
                        <a href="#" class="nk-menu-link nk-menu-toggle">
                            <span class="nk-menu-icon"><em class="icon ni ni-setting"></em></span>
                            <span class="nk-menu-text">Settings</span>
                        </a>
                        <ul class="nk-menu-sub">
                            <li class="nk-menu-item"><a href="settings/general-settings.html"
                                    class="nk-menu-link"><span class="nk-menu-text">General Settings</span></a></li>
                            <li class="nk-menu-item"><a href="settings/user-management.html"
                                    class="nk-menu-link"><span class="nk-menu-text">User Management</span></a></li>
                        </ul>
                    </li>
                    <!-- profile settings -->
                    <li class="nk-menu-item nk-menu-footer">
                            <span class="media-group">
                                <span class="media media-xl media-middle media-circle"><img src="{{ asset('assets/avatar.png') }}" alt=""></span>
                                <span class="media-text nk-menu-text">
                                    <span class="lead-text">{{ auth()->user()->username }}</span>
                                    <span class="sub-text">Repair Parts Seller</span>
                                    <a href="{{ route('logout') }}" class="lead-text text-primary"><span>Log
                                        Out</span></a>
                                </span>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</div>
