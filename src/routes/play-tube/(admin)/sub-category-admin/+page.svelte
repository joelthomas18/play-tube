<script>
  import { onMount } from "svelte";
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  import { afterNavigate, goto } from "$app/navigation";
  export let data;
  let loading = true;
  let allSubCategory = [];
  const getAllSubCategory = async () => {
    try {
      let response = await getJSONDATA("/api/getAllSubCategory");
      allSubCategory = await response.data;
      loading = false;
    } catch (errror) {
      console.log(errror);
    }
  };

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/play-tube/home");
    } else {
      getAllSubCategory();
    }
  });
</script>

<div class="flex flex-col justify-center items-center h-[400px]">
  <h1 class="text-3xl">Edit Sub-category</h1>
  <p class="mb-4 font-mono">Click on the sub-categories to edit</p>
  {#if allSubCategory}{#each allSubCategory as subCategory (subCategory._id)}
      <a
        href="/play-tube/sub-category-admin/edit-sub-category/{subCategory._id}"
        ><h1 class="text-2xl font-medium hover:text-red-300">
          {subCategory.subCategoryDisplayName}
        </h1></a
      >
    {/each}
  {/if}
  {#if loading}
    Loading
  {/if}
</div>
