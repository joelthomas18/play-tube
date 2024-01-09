<script>
  import { afterNavigate, goto } from "$app/navigation";
  import { getJSONDATA } from "$lib/services/ajax-services";
  export let data;

  let loading = true;
  let allItemCategory = [];

  const getAllItemCategory = async () => {
    try {
      let response = await getJSONDATA("/api/getAllItemCategory");
      allItemCategory = await response.data;
      loading = false;
    } catch (error) {
      console.log(error);
    }
  };
  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/");
    } else {
      getAllItemCategory();
    }
  });
</script>

<div class="flex flex-col justify-center items-center h-[400px]">
  <h1 class="text-3xl">Edit Item-category</h1>
  <p class="mb-4 font-mono">Click on the item-categories to edit</p>
  {#if allItemCategory}{#each allItemCategory as itemCategory (itemCategory._id)}
      <a
        href="/play-tube/item-category-admin/edit-item-category/{itemCategory._id}"
        ><h1 class="text-2xl font-medium hover:text-red-300">
          {itemCategory.itemCategoryDisplayName}
        </h1></a
      >
    {/each}
  {/if}
  {#if loading}
    Loading
  {/if}
</div>
