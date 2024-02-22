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
                <ul class="nk-quick-nav ms-2">
                    <li class="dropdown"><a href="#" data-bs-toggle="dropdown">
                            <div class="d-sm-none">
                                <div class="media media-md media-circle"><img src="{{asset('assets/assets/avatar.png')}}"
                                        alt="" class="img-thumbnail"></div>
                            </div>
                            <div class="d-none d-sm-block">
                                <div class="media media-circle"><img src="{{asset('assets/avatar.png')}}" alt=""
                                        class="img-thumbnail"></div>
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-md">
                            <div class="dropdown-content dropdown-content-x-lg py-3 border-bottom border-light">
                                <div class="media-group">
                                    <div class="media media-xl media-middle media-circle"><img
                                            src="{{asset('assets/avatar.png')}}" alt="" class="img-thumbnail"></div>
                                    <div class="media-text">
                                        <div class="lead-text">{{ auth()->user()->username}}</div><span class="sub-text">Repair Parts Seller</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown-content dropdown-content-x-lg py-3 border-bottom border-light">
                                <ul class="link-list">
                                    <li><a href="profile.html"><em class="icon ni ni-user"></em> <span>My
                                                Profile</span></a></li>
                                    <li><a href="user-manage/user-cards.html"><em class="icon ni ni-contact"></em>
                                            <span>My Contacts</span></a></li>
                                    <li><a href="profile-edit.html"><em class="icon ni ni-setting-alt"></em>
                                            <span>Account Settings</span></a></li>
                                </ul>
                            </div>
                            <div class="dropdown-content dropdown-content-x-lg py-3">
                                <ul class="link-list">
                                    <li><a href="{{ route('logout') }}"><em class="icon ni ni-signout"></em> <span>Log
                                                Out</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
