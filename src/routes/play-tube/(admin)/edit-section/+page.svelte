<script>
  import { afterNavigate, goto } from "$app/navigation";
  export let data;

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/");
    }
  });
</script>

<div class="flex flex-col gap-14 justify-center items-center mt-10 h-[400px]">
  <div class="flex flex-col gap-4 md:flex-row">
    <a href="/play-tube/category"
      ><button class="btn-edit">add category</button></a
    >

    <a href="/play-tube/sub-category"
      ><button class="btn-edit">add sub-category</button></a
    >

    <a href="/play-tube/item-category"
      ><button class="btn-edit">add item-category</button></a
    >
    <a href="/play-tube/video"><button class="btn-edit">add video</button></a>
  </div>

  <div class="flex flex-col gap-4 md:flex-row">
    <a href="/play-tube/category-admin">
      <button class="btn-edit"> Edit category</button></a
    >
    <a href="/play-tube/sub-category-admin">
      <button class="btn-edit"> Edit sub-category</button></a
    >

    <a href="/play-tube/item-category-admin">
      <button class="btn-edit"> Edit item-category</button></a
    >
  </div>
</div>
