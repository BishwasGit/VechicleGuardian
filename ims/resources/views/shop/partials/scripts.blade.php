<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="{{ asset('assets/js/bundle.js') }}"></script>
<script src="{{ asset('assets/js/scripts.js') }}"></script>
<script src="{{ asset('assets/js/charts/ecommerce-chart.js') }}"></script>
<script>
          @if(session('success'))
            // Display SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: '{{ session('success') }}',
            });
         @endif
</script>
<script>
    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();

        // Add leading zero if single digit
        hours = ('0' + hours).slice(-2);
        minutes = ('0' + minutes).slice(-2);
        seconds = ('0' + seconds).slice(-2);

        // Display the time in HH:MM:SS format
        document.getElementById('clock').innerHTML = hours + ':' + minutes + ':' + seconds;

        // Update the clock every second
        setTimeout(updateClock, 1000);
    }

    // Initial call to updateClock to start the clock
    updateClock();
</script>
