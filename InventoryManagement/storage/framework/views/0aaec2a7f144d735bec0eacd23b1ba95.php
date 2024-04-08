<div class="card card-gutter-md">
    <div class="card-body">
        <div class="bio-block">
            <h4 class="bio-block-title mb-4">Generate CRUD</h4>
            <form method="post" action="<?php echo e(route('generate_crud')); ?>">
                <?php echo csrf_field(); ?>
                <div class="row g-3">
                    <div class="col-lg-12">
                        <div class="form-group"> <label class="form-label" for="table">Single
                                select
                                input</label>
                            <div class="form-control-wrap"> <select class="form-select"
                                    data-search="true" data-sort="false" name="table">
                                    <option value="">Select tables</option>
                                    <?php $__currentLoopData = $tables; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $table): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <option
                                            value="<?php echo e($table->{'Tables_in_' . env('DB_DATABASE')}); ?>">
                                            <?php echo e($table->{'Tables_in_' . env('DB_DATABASE')}); ?>

                                        </option>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
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
<?php /**PATH D:\VG\VechicleGuardian\InventoryManagement\resources\views/repairpartseller/crud/form.blade.php ENDPATH**/ ?>