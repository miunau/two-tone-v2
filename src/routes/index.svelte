<script>
    import {dataSources} from "../stores/dataSources.js";
    console.log($dataSources);
</script>

<svelte:head>
    <title>Welcome</title>
</svelte:head>

<section class="has-background-grey-light p-6">
    <h1 class="title">
        Data Sets
    </h1>

{#each $dataSources as metadataObject }
    <div >
        {metadataObject.id} ▶︎ {metadataObject.title}
    </div>
    <div >
        <a href={metadataObject.source} target="_blank">source</a>
    </div>
{/each}

</section>


<style>

</style>
