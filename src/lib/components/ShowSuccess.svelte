<script>
  import { ajaxSuccess } from "$lib/store/app.store";
  setTimeout(() => {
    $ajaxSuccess.isSuccess = false;
  }, 1000);
</script>

{#if $ajaxSuccess.isSuccess}
  <div class="container-fluid">
    <div class="row bg-success">
      {$ajaxSuccess.message}
    </div>
  </div>
{/if}
