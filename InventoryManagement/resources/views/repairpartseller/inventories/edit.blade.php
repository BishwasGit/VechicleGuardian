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
                            <!-- Body contents here-->
                            <div class="nk-block-head">
                                <div class="nk-block-head-between flex-wrap gap g-2">
                                    <div class="nk-block-head-content">
                                        <h2 class="nk-block-title">Add Product</h2>
                                        <nav>
                                            <ol class="breadcrumb breadcrumb-arrow mb-0">
                                                <li class="breadcrumb-item"><a href="#">inventories</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add inventories</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-block">
                                <form method="POST" action="{{ route('repairpartseller.inventories.inventories.update', ['id'=>$inventories->item_id]) }}" enctype="multipart/form-data">
                                    @csrf
                                    @method('PUT')
                                    <div class="row g-gs">
                                        <div class="col-xxl-9">
                                            <div class="gap gy-4">
                                                <div class="gap-col">
                                                    <div class="card card-gutter-md">
                                                        <div class="card-body">
                                                            <div class="row g-gs">
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="item_name"
                                                                            class="form-label">Item_name</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="item_name" name="item_name"
                                                                                placeholder="Item_name"
                                                                                value="{{ $inventories->item_name }}">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="item_quantity"
                                                                            class="form-label">Item_quantity</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="item_quantity" name="item_quantity"
                                                                                placeholder="Item_quantity"
                                                                                value="{{ $inventories->item_quantity }}"
                                                                                >
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <div class="form-group">
                                                                        <label for="item_price" class="form-label">Price
                                                                            Per Unit</label>
                                                                        <div class="form-control-wrap">
                                                                            <input type="text" class="form-control"
                                                                                id="item_price" name="item_price"
                                                                                placeholder="Item_price"
                                                                                value="{{ $inventories->item_price }}">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-12">
                                                                    <div class="form-group"><label
                                                                            class="form-label">Description</label>
                                                                        <div class="form-control-wrap">
                                                                            <div class="ql-toolbar ql-snow"><span
                                                                                    class="ql-formats"><button
                                                                                        type="button" class="ql-bold"><svg
                                                                                            viewBox="0 0 18 18">
                                                                                            <path class="ql-stroke"
                                                                                                d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z">
                                                                                            </path>
                                                                                            <path class="ql-stroke"
                                                                                                d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z">
                                                                                            </path>
                                                                                        </svg></button><button
                                                                                        type="button"
                                                                                        class="ql-italic"><svg
                                                                                            viewBox="0 0 18 18">
                                                                                            <line class="ql-stroke"
                                                                                                x1="7"
                                                                                                x2="13"
                                                                                                y1="4"
                                                                                                y2="4"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="5"
                                                                                                x2="11"
                                                                                                y1="14"
                                                                                                y2="14"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="8"
                                                                                                x2="10"
                                                                                                y1="14"
                                                                                                y2="4"></line>
                                                                                        </svg></button><button
                                                                                        type="button"
                                                                                        class="ql-underline"><svg
                                                                                            viewBox="0 0 18 18">
                                                                                            <path class="ql-stroke"
                                                                                                d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3">
                                                                                            </path>
                                                                                            <rect class="ql-fill"
                                                                                                height="1"
                                                                                                rx="0.5"
                                                                                                ry="0.5"
                                                                                                width="12" x="3" y="15">
                                                                                            </rect>
                                                                                        </svg></button></span><span
                                                                                    class="ql-formats"><button
                                                                                        type="button"
                                                                                        class="ql-blockquote"><svg
                                                                                            viewBox="0 0 18 18">
                                                                                            <rect class="ql-fill ql-stroke"
                                                                                                height="3"
                                                                                                width="3" x="4" y="5">
                                                                                            </rect>
                                                                                            <rect class="ql-fill ql-stroke"
                                                                                                height="3"
                                                                                                width="3" x="11" y="5">
                                                                                            </rect>
                                                                                            <path
                                                                                                class="ql-even ql-fill ql-stroke"
                                                                                                d="M7,8c0,4.031-3,5-3,5">
                                                                                            </path>
                                                                                            <path
                                                                                                class="ql-even ql-fill ql-stroke"
                                                                                                d="M14,8c0,4.031-3,5-3,5">
                                                                                            </path>
                                                                                        </svg></button><button
                                                                                        type="button" class="ql-list"
                                                                                        value="bullet"><svg
                                                                                            viewBox="0 0 18 18">
                                                                                            <line class="ql-stroke"
                                                                                                x1="6"
                                                                                                x2="15"
                                                                                                y1="4"
                                                                                                y2="4"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="6"
                                                                                                x2="15"
                                                                                                y1="9"
                                                                                                y2="9"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="6"
                                                                                                x2="15"
                                                                                                y1="14"
                                                                                                y2="14"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="3"
                                                                                                x2="3"
                                                                                                y1="4"
                                                                                                y2="4"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="3"
                                                                                                x2="3"
                                                                                                y1="9"
                                                                                                y2="9"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="3"
                                                                                                x2="3"
                                                                                                y1="14"
                                                                                                y2="14"></line>
                                                                                        </svg></button></span><span
                                                                                    class="ql-formats"><button
                                                                                        type="button" class="ql-header"
                                                                                        value="1"><svg
                                                                                            viewBox="0 0 18 18">
                                                                                            <path class="ql-fill"
                                                                                                d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z">
                                                                                            </path>
                                                                                        </svg></button><button
                                                                                        type="button" class="ql-header"
                                                                                        value="2"><svg
                                                                                            viewBox="0 0 18 18">
                                                                                            <path class="ql-fill"
                                                                                                d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z">
                                                                                            </path>
                                                                                        </svg></button><span
                                                                                        class="ql-header ql-picker"><span
                                                                                            class="ql-picker-label"
                                                                                            tabindex="0" role="button"
                                                                                            aria-expanded="false"
                                                                                            aria-controls="ql-picker-options-0"><svg
                                                                                                viewBox="0 0 18 18">
                                                                                                <polygon class="ql-stroke"
                                                                                                    points="7 11 9 13 11 11 7 11">
                                                                                                </polygon>
                                                                                                <polygon class="ql-stroke"
                                                                                                    points="7 7 9 5 11 7 7 7">
                                                                                                </polygon>
                                                                                            </svg></span><span
                                                                                            class="ql-picker-options"
                                                                                            aria-hidden="true"
                                                                                            tabindex="-1"
                                                                                            id="ql-picker-options-0"><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"
                                                                                                data-value="3"></span><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"
                                                                                                data-value="4"></span><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"
                                                                                                data-value="5"></span><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"
                                                                                                data-value="6"></span><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"></span></span></span><select
                                                                                        class="ql-header"
                                                                                        style="display: none;">
                                                                                        <option value="3"></option>
                                                                                        <option value="4"></option>
                                                                                        <option value="5"></option>
                                                                                        <option value="6"></option>
                                                                                        <option selected="selected">
                                                                                        </option>
                                                                                    </select></span><span
                                                                                    class="ql-formats"><span
                                                                                        class="ql-align ql-picker ql-icon-picker"><span
                                                                                            class="ql-picker-label"
                                                                                            tabindex="0" role="button"
                                                                                            aria-expanded="false"
                                                                                            aria-controls="ql-picker-options-1"><svg
                                                                                                viewBox="0 0 18 18">
                                                                                                <line class="ql-stroke"
                                                                                                    x1="3"
                                                                                                    x2="15"
                                                                                                    y1="9"
                                                                                                    y2="9"></line>
                                                                                                <line class="ql-stroke"
                                                                                                    x1="3"
                                                                                                    x2="13"
                                                                                                    y1="14"
                                                                                                    y2="14"></line>
                                                                                                <line class="ql-stroke"
                                                                                                    x1="3"
                                                                                                    x2="9"
                                                                                                    y1="4"
                                                                                                    y2="4"></line>
                                                                                            </svg></span><span
                                                                                            class="ql-picker-options"
                                                                                            aria-hidden="true"
                                                                                            tabindex="-1"
                                                                                            id="ql-picker-options-1"><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"><svg
                                                                                                    viewBox="0 0 18 18">
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="3"
                                                                                                        x2="15"
                                                                                                        y1="9"
                                                                                                        y2="9">
                                                                                                    </line>
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="3"
                                                                                                        x2="13"
                                                                                                        y1="14"
                                                                                                        y2="14">
                                                                                                    </line>
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="3"
                                                                                                        x2="9"
                                                                                                        y1="4"
                                                                                                        y2="4">
                                                                                                    </line>
                                                                                                </svg></span><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"
                                                                                                data-value="center"><svg
                                                                                                    viewBox="0 0 18 18">
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="15"
                                                                                                        x2="3"
                                                                                                        y1="9"
                                                                                                        y2="9">
                                                                                                    </line>
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="14"
                                                                                                        x2="4"
                                                                                                        y1="14"
                                                                                                        y2="14">
                                                                                                    </line>
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="12"
                                                                                                        x2="6"
                                                                                                        y1="4"
                                                                                                        y2="4">
                                                                                                    </line>
                                                                                                </svg></span><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"
                                                                                                data-value="right"><svg
                                                                                                    viewBox="0 0 18 18">
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="15"
                                                                                                        x2="3"
                                                                                                        y1="9"
                                                                                                        y2="9">
                                                                                                    </line>
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="15"
                                                                                                        x2="5"
                                                                                                        y1="14"
                                                                                                        y2="14">
                                                                                                    </line>
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="15"
                                                                                                        x2="9"
                                                                                                        y1="4"
                                                                                                        y2="4">
                                                                                                    </line>
                                                                                                </svg></span><span
                                                                                                tabindex="0"
                                                                                                role="button"
                                                                                                class="ql-picker-item"
                                                                                                data-value="justify"><svg
                                                                                                    viewBox="0 0 18 18">
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="15"
                                                                                                        x2="3"
                                                                                                        y1="9"
                                                                                                        y2="9">
                                                                                                    </line>
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="15"
                                                                                                        x2="3"
                                                                                                        y1="14"
                                                                                                        y2="14">
                                                                                                    </line>
                                                                                                    <line class="ql-stroke"
                                                                                                        x1="15"
                                                                                                        x2="3"
                                                                                                        y1="4"
                                                                                                        y2="4">
                                                                                                    </line>
                                                                                                </svg></span></span></span><select
                                                                                        class="ql-align"
                                                                                        style="display: none;">
                                                                                        <option selected="selected">
                                                                                        </option>
                                                                                        <option value="center"></option>
                                                                                        <option value="right"></option>
                                                                                        <option value="justify"></option>
                                                                                    </select></span><span
                                                                                    class="ql-formats"><button
                                                                                        type="button"
                                                                                        class="ql-clean"><svg
                                                                                            class=""
                                                                                            viewBox="0 0 18 18">
                                                                                            <line class="ql-stroke"
                                                                                                x1="5"
                                                                                                x2="13"
                                                                                                y1="3"
                                                                                                y2="3"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="6"
                                                                                                x2="9.35"
                                                                                                y1="12"
                                                                                                y2="3"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="11"
                                                                                                x2="15"
                                                                                                y1="11"
                                                                                                y2="15"></line>
                                                                                            <line class="ql-stroke"
                                                                                                x1="15"
                                                                                                x2="11"
                                                                                                y1="11"
                                                                                                y2="15"></line>
                                                                                            <rect class="ql-fill"
                                                                                                height="1"
                                                                                                rx="0.5"
                                                                                                ry="0.5"
                                                                                                width="7" x="2"
                                                                                                y="14"></rect>
                                                                                        </svg></button></span></div>
                                                                            <div class="js-quill ql-container ql-snow"
                                                                                data-toolbar="minimal"
                                                                                data-placeholder="Write category description here...">
                                                                                <div class="ql-editor" data-gramm="false"
                                                                                    contenteditable="true"
                                                                                    data-placeholder="Write category description here...">
                                                                                    <p>{{ $inventories->item_description }}</p>
                                                                                </div>
                                                                                <div class="ql-clipboard"
                                                                                    contenteditable="true" tabindex="-1">
                                                                                </div>
                                                                                <div class="ql-tooltip ql-hidden"><a
                                                                                        class="ql-preview"
                                                                                        rel="noopener noreferrer"
                                                                                        target="_blank"
                                                                                        href="about:blank"></a><input
                                                                                        name="item_description"
                                                                                        type="text"
                                                                                        data-formula="e=mc^2"
                                                                                        data-link="https://quilljs.com"
                                                                                        data-video="Embed URL"><a
                                                                                        class="ql-action"></a><a
                                                                                        class="ql-remove"></a></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-12">
                                                                    <div class="form-group">
                                                                        <label for="formFile" class="form-label">Item Image</label>
                                                                        <div class="form-control-wrap">
                                                                            <!-- Display the previously stored image -->
                                                                            <img src="<?php echo $inventories->item_image; ?>" alt="Item Image" width="150">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label for="new_item_image" class="form-label">Upload New Image</label>
                                                                        <input class="form-control" type="file" id="new_item_image" name="new_item_image">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <div class="form-control-wrap">
                                                                        <button type="submit"
                                                                            class="btn btn-primary mt-3"
                                                                            name="submit">Submit</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
@endsection
