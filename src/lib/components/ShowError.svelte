<script>
  import { ajaxError } from "$lib/store/app.store";
  setTimeout(() => {
    $ajaxError.isError = false;
  }, 1000);
</script>

{#if $ajaxError.isError}
  <div class="container-fluid">
    <div class="row bg-danger">
      {$ajaxError.message}
    </div>
  </div>
{/if}
