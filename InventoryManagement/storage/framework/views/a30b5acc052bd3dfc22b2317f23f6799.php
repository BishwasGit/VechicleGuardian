<?php $__env->startSection('content'); ?>
    <div class="nk-app-root">
        <div class="nk-main">
            <?php echo $__env->make('repairpartseller.includes.sidebar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <div class="nk-wrap">
                <?php echo $__env->make('repairpartseller.includes.nav', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                <div class="nk-content">
                    <div class="container-fluid">
                        <div class="nk-content-inner">
                          <div class="nk-content-body">
                            <div class="nk-block-head">
                                <div class="nk-block-head-between flex-wrap gap g-2">
                                    <div class="nk-block-head-content">
                                        <h2 class="nk-block-title">New Sale</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-block">
                                <div class="nk-block-head">
                                    <h5 class="title">Add New Sale</h5>
                                    <hr>
                                </div>
                                <div class="nk-block">
                                    <div class="card p-4">
                                    <form action="<?php echo e(route('repairpartseller.sales.store')); ?>" method="POST" id="new-sale-form">
                                        <?php echo csrf_field(); ?>
                                        <div class="row g-4">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="item_id">Select Item</label>
                                                    <select class="form-control" id="item_id" name="item_id">
                                                        <!-- Populate with inventory items -->
                                                        <option value="">Select Item</option>
                                                        <?php $__currentLoopData = $data; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                            <option value="<?php echo e($item->item_id); ?>" data-quantity="<?php echo e($item->item_quantity); ?>" data-price="<?php echo e($item->item_price); ?>"><?php echo e($item->item_name); ?></option>
                                                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label mt-3" for="sold_to">Sold To (optional)</label>
                                                    <input type="text" class="form-control" id="sold_to" name="sold_to" min="1">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="current_quantity">Current Quantity</label>
                                                    <input type="text" class="form-control" id="current_quantity" name="current_quantity" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label mt-3" for="quantity_sold">Quantity to be sold</label>
                                                    <input type="number" class="form-control" id="quantity_sold" name="quantity_sold" min="1" required>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="price_per_unit">Price Per unit</label>
                                                    <input type="text" class="form-control" id="price_per_unit" name="price_per_unit" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label mt-3" for="total_price">Total Price</label>
                                                    <input type="number" class="form-control" id="total_price" name="total_price" readonly>
                                                </div>
                                            </div>
                                            <!-- Add more fields for customer info, payment details, etc. as needed -->
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-3">Add Sale</button>
                                    </form>
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
<?php $__env->stopSection(); ?>
<?php $__env->startPush('js'); ?>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        $(document).ready(function() {
            // Event listener for item select change
            $('#item_id').change(function() {
                const selectedOption = $(this).find(':selected');
                const currentQuantity = selectedOption.data('quantity');
                const pricePerUnit = selectedOption.data('price');
                $('#current_quantity').val(currentQuantity);
                $('#price_per_unit').val(pricePerUnit);
                $('#quantity_sold').attr('max', currentQuantity);
                calculateTotalPrice();
            });
            <?php if(session('success')): ?>
            // Display SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: '<?php echo e(session('success')); ?>',
            });
         <?php endif; ?>
            $('#new-sale-form').submit(function(event) {
            const currentQuantity = parseInt($('#current_quantity').val());
            const quantitySold = parseInt($('#quantity_sold').val());
            if (quantitySold > currentQuantity) {
                event.preventDefault(); // Prevent form submission
                // Display SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Quantity to be sold cannot exceed current quantity!',
                });
            }
        });

            // Event listener for quantity sold input change
            $('#quantity_sold').on('input', function() {
                const currentQuantity = parseInt($('#current_quantity').val());
                const quantitySold = parseInt($(this).val());
                if (quantitySold > currentQuantity) {
                    $(this).get(0).setCustomValidity('Quantity to be sold cannot exceed current quantity');
                } else {
                    $(this).get(0).setCustomValidity('');
                    calculateTotalPrice();
                }
            });

            // Function to calculate total price
            function calculateTotalPrice() {
                const quantitySold = parseInt($('#quantity_sold').val());
                const pricePerUnit = parseFloat($('#price_per_unit').val());
                const totalPrice = quantitySold * pricePerUnit;
                $('#total_price').val(totalPrice.toFixed(2));
            }
        });
    </script>
<?php $__env->stopPush(); ?>

<?php echo $__env->make('repairpartseller.layouts.layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\VG\VechicleGuardian\InventoryManagement\resources\views/repairpartseller/sales/create.blade.php ENDPATH**/ ?>