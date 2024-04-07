<div class="card card-gutter-md">
    <div class="card-body">
        <div class="bio-block">
            <h4 class="bio-block-title mb-4">Generate CRUD</h4>
            <form method="post" action="{{ route('generate_crud') }}">
                @csrf
                <div class="row g-3">
                    <div class="col-lg-12">
                        <div class="form-group"> <label class="form-label" for="table">Single
                                select
                                input</label>
                            <div class="form-control-wrap"> <select class="form-select"
                                    data-search="true" data-sort="false" name="table">
                                    <option value="">Select tables</option>
                                    @foreach ($tables as $table)
                                        <option
                                            value="{{ $table->{'Tables_in_' . env('DB_DATABASE')} }}">
                                            {{ $table->{'Tables_in_' . env('DB_DATABASE')} }}
                                        </option>
                                    @endforeach
                                </select> </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group"><label for="directory"
                                class="form-label">Directory
                                Name</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" id="directory"
                                    placeholder="Directory Name" name="directory">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                    <button type="submit" class="btn btn-success">Generate CRUD</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
