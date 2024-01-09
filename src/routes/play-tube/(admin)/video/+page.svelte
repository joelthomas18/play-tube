<script>
  import { afterNavigate, goto } from "$app/navigation";
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  import { onMount } from "svelte";
  let allCategory = [];
  let allSubCategory = [];
  let allItemCategory = [];
  let searchTags = [];
  export let data;
  let videoData = {
    category: "",
    subCategory: "",
    itemCategory: "",
    title: "",
    description: "",
    videoUrl: "",
    tags: "",
    searchTags: [],
  };

  const getAllCategory = async () => {
    try {
      let response = await getJSONDATA("/api/getAllCategory");
      allCategory = await response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const onCategorySelection = async () => {
    allItemCategory = [];
    let selected = videoData.category;
    try {
      let response = await getJSONDATA("/api/onCategorySelection", {
        category: selected,
      });
      allSubCategory = response.data;
      console.log(allSubCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubCategorySelection = async () => {
    let selected = videoData.subCategory;

    try {
      let response = await getJSONDATA("/api/onSubCategorySelection", {
        subCategory: selected,
      });
      allItemCategory = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createVideo = async () => {
    try {
      let response = await postJSONDATA("/api/createVideo", videoData, true);
      if (response.status === "success") {
        videoData = {};
        videoData.searchTags = [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onTagChange = () => {
    videoData.tags = videoData.tags.replace(" ", "-");
    if (videoData.tags.split(",")[1]) {
      videoData.searchTags = [
        ...videoData.searchTags,
        videoData.tags.split(",")[0],
      ];
      videoData.tags = "";
    }
  };

  const removeTag = (tagindex) => {
    videoData.searchTags.splice(tagindex, 1);
    videoData.searchTags = videoData.searchTags;
  };

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/play-tube/home");
    } else {
      getAllCategory();
    }
  });
</script>

<svelte:head></svelte:head>

<div class="mx-auto flex items-center justify-center">
  <div class="w-full max-w-sm">
    <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for=" Category-name"
        >
          Category-display-name
        </label>

        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={videoData.category}
          on:change={onCategorySelection}
        >
          <option value="" selected disabled hidden
            >Please choose category</option
          >
          {#each allCategory as category (category._id)}
            <option value={category._id}>{category.categoryDisplayName}</option>
          {/each}
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for=" Sub-category-display-name"
        >
          Sub-category-display-name
        </label>

        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={videoData.subCategory}
          on:change={onSubCategorySelection}
          >{#each allSubCategory as subCategory (subCategory._id)}
            <option value="" selected disabled hidden
              >Please choose sub-category</option
            >

            <option value={subCategory._id}
              >{subCategory.subCategoryDisplayName}</option
            >
          {/each}
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for=" Item-category-display-name"
        >
          Item-category-display-name
        </label>

        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={videoData.itemCategory}
        >
          {#each allItemCategory as itemCategory (itemCategory._id)}
            <option value="" selected disabled hidden
              >Please choose item-category</option
            >

            <option value={itemCategory._id}
              >{itemCategory.itemCategoryDisplayName}</option
            >
          {/each}
        </select>
      </div>
      <div class="">
        <label class="block text-gray-700 text-sm font-bold" for="title">
          Title
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter a title"
          required
          bind:value={videoData.title}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="">
        <label class="block text-gray-700 text-sm font-bold" for="description">
          Description
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter a description"
          required
          bind:value={videoData.description}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="">
        <label class="block text-gray-700 text-sm font-bold" for="url">
          Video url
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter video url"
          required
          bind:value={videoData.videoUrl}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold" for="searchtags">
          Searchtags
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter searchtags"
          on:keyup={onTagChange}
          bind:value={videoData.tags}
        />
        <div
          class="text-white text-center flex flex-wrap p-1 gap-1 items-center"
        >
          {#each videoData.searchTags as tag, tagindex}
            <small
              class=" md:text-3xlborder-1 bg-black text-white p-1 rounded-md"
              >{tag}
              <span
                on:click={() => {
                  removeTag(tagindex);
                }}
                class="cursor-pointer text-xl text-center text-red-700">x</span
              ></small
            >
          {/each}
        </div>
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-evenly">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          on:click={createVideo}
        >
          Create
        </button>
        <div class="flex flex-col gap-2">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/play-tube/edit-section"
          >
            Go back
          </a>
        </div>
      </div>
    </form>
  </div>
</div>
