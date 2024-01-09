<script>
  import { ajaxError, ajaxSuccess } from "$lib/store/app.store";
  import ShowError from "$lib/components/ShowError.svelte";
  import ShowSuccess from "$lib/components/ShowSuccess.svelte";
  export let handleSignout;
  export let isAuthenticated;
  export let menuList;
  console.log(menuList);

  let path = "";
  let test = "hidden";

  let showMenu = false;
  let selectedCategory = "";
  let isMenuSelected = false;
  if (isAuthenticated) {
    path = "/play-tube/home";
  } else {
    path = "/";
  }
  const handleMenu = () => {
    test = test === "hidden" ? "block" : "hidden";
    test2 = test2 === false ? true : false;
  };

  const handleSubMenu = () => {
    showMenu = showMenu === true ? false : true;
  };

  const handleMouseOver = (code) => {
    showMenu = true;
    selectedCategory = code;
  };

  const handleMenuSelection = () => {
    isMenuSelected = true;
  };
  console.log(menuList);
</script>

<nav class="bg-gray-700 sticky top-0">
  <div class="container py-2 mx-auto px-4">
    <div class="flex md:justify-between">
      <a
        href={path}
        class="hidden text-white md:block inline-flex py-2 text-xl font-bold uppercase tracking-wider mt-2"
        >Home</a
      >

      <div class="w-full md:flex justify-center mt-1 {test}">
        {#if menuList && menuList.categories && menuList.categories.length > 0}
          <a href="/play-tube/home"
            ><button class=" md:hidden hover:text-white text-2xl">Home</button
            ></a
          >
          {#each menuList.categories as category}
            <ul
              class=" flex flex-col md:flex-row md:w-auto space-y-2 md:space-y-0 mt-2 md:mt-0"
            >
              <li class="relative">
                <a
                  href="/play-tube/show-category-videos/{menuList[category]
                    ._id}"
                  class="flex py-2 px-4 md:text-2xl outline-none focus:outline-none rounded-md hover:bg-white"
                  on:click={() => {
                    handleMouseOver(category);

                    handleSubMenu;
                  }}>{menuList[category].categoryDisplayName}</a
                >

                {#if selectedCategory === category && showMenu}
                  <div
                    on:click={handleMenuSelection}
                    on:mouseleave={() => {
                      showMenu = false;
                    }}
                    class="md:absolute bg-blue-400 rounded-md p-2"
                  >
                    {#each menuList[category].subCategories as subCategory}
                      <ul
                        on:click={() => {
                          showMenu = false;
                        }}
                        class="space-y-2 md:w-48 text-center"
                      >
                        <li>
                          <a
                            href="/play-tube/show-subcategory-videos/{menuList[
                              category
                            ][subCategory]._id}"
                            class="flex p-2 font-medium text-gray-600 rounded-md hover:bg-black hover:text-white text-2xl"
                            >{menuList[category][subCategory]
                              .subCategoryName}</a
                          >
                        </li>

                        {#each menuList[category][subCategory].itemCategories as itemCategory}
                          <li>
                            <a
                              href="/play-tube/show-item-category-videos/{menuList[
                                category
                              ][subCategory][itemCategory]._id}"
                              class="flex p-2 font-medium text-gray-600 rounded-md hover:bg-black hover:text-white"
                            >
                              {menuList[category][subCategory][itemCategory]
                                .itemCategoryName}</a
                            >
                          </li>
                        {/each}
                      </ul>
                    {/each}
                  </div>
                {/if}
              </li>
            </ul>
          {/each}

          <button
            on:click={handleSignout}
            class="hover:text-white text-2xl md:hidden">Signout</button
          >
        {/if}
      </div>

      {#if isAuthenticated && menuList && menuList.categories && menuList.categories.length > 0}
        <button
          class="md:hidden inline-flex items-center ml-auto justify-center h-10 w-10"
          on:click={handleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <button on:click={handleSignout} class="btn hidden md:block"
          >Signout</button
        >
      {:else if isAuthenticated}
        <a href="/play-tube/home"
          ><button
            class=" md:hidden font-bold uppercase tracking-wider text-white mt-3"
            >Home</button
          ></a
        >
        <button
          on:click={handleSignout}
          class=" py-2 font-bold uppercase tracking-wider text-white ml-auto"
          >Signout</button
        >
      {:else if !isAuthenticated}
        <a href="/play-tube/register" class="mt-2 ml-auto btn text-white"
          >Register/signin</a
        >
      {/if}
    </div>
    <div class="text-white text start sm:text-xl mt- ml-2">
      {#if $ajaxError.isError}
        <ShowError></ShowError>
      {/if}
      {#if $ajaxSuccess.isSuccess}
        <ShowSuccess></ShowSuccess>
      {/if}
    </div>
  </div>
</nav>
