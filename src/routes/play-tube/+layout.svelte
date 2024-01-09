<script>
  import NavBar from "$lib/components/NavBar.svelte";
  import { postJSONDATA, getJSONDATA } from "$lib/services/ajax-services";
  import { onMount } from "svelte";

  export let data;
  let allVideos = data.allVideos;
  let isAuthenticated = data.userData.isAuthenticated;
  let navigationData = [];

  const handleSignout = async () => {
    try {
      let response = await getJSONDATA("/api/handleSignout");
      if (response.status === "success") {
        location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllItemCategory = async () => {
    try {
      let response = await getJSONDATA("/api/getNavigationData");
      navigationData = await response.data;
    } catch (error) {
      console.log(error);
    }
  };

  onMount(() => {
    getAllItemCategory();
  });
</script>

<div class="">
  <NavBar
    {allVideos}
    {handleSignout}
    {isAuthenticated}
    menuList={navigationData}
  />

  <slot />
</div>
