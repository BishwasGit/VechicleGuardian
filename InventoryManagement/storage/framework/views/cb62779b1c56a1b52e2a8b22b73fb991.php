<?php $__env->startSection('content'); ?>
    <div class="nk-app-root">
        <div class="nk-main">
            <?php echo $__env->make('repairpartseller.includes.sidebar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <div class="nk-wrap">
                <?php echo $__env->make('repairpartseller.includes.nav', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                <div class="nk-content">
                    <div class="container-fluid">
                        <div class="nk-content-inner">
                            <!-- Body contents here-->
                            <?php echo $__env->make('repairpartseller.crud.form', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('repairpartseller.layouts.layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\VG\VechicleGuardian\InventoryManagement\resources\views/repairpartseller/crud/index.blade.php ENDPATH**/ ?>