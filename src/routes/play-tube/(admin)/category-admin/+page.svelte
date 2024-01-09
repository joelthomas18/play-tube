<script>
  import { afterNavigate, goto } from "$app/navigation";
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  export let data;
  let loading = true;
  let allCategory = [];
  const getAllCategory = async () => {
    try {
      let response = await getJSONDATA("/api/getAllCategory");
      allCategory = await response.data;
      loading = false;
    } catch (errror) {
      console.log(errror);
    }
  };
  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/");
    } else {
      getAllCategory();
    }
  });
</script>

<div class="flex flex-col justify-center items-center h-[400px]">
  <h1 class="text-3xl">Edit category</h1>
  <p class="mb-4 font-mono">Click on the categories to edit</p>
  {#each allCategory as category (category._id)}
    <a href="/play-tube/category-admin/edit-category/{category._id}"
      ><h1 class="text-2xl font-medium hover:text-red-300">
        {category.categoryDisplayName}
      </h1></a
    >
  {/each}
  {#if loading}
    Loading
  {/if}
</div>
