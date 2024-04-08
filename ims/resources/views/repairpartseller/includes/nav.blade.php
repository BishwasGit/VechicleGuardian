<div class="nk-header nk-header-fixed">
    <div class="container-fluid">
        <div class="nk-header-wrap">
            <div class="nk-header-logo ms-n1">
            </div>
            <nav class="nk-header-menu nk-navbar">
                <ul class="nk-nav">
                    <li class="nk-nav-item">
                        <h5 class="nk-nav-text">Good Morning , {{ auth()->user()->username }}</h5>
                    </li>
                </ul>
            </nav>
            <div class="nk-header-tools">
                <!-- Search box here-->
                <div class="search-inline">
                    <div class="form-control-wrap flex-grow-1"><input placeholder="Search Here" type="text"
                            class="form-control-plaintext"></div><em class="icon icon-sm ni ni-search"></em>
                </div>
            </div>
        </div>
    </div>
</div>
