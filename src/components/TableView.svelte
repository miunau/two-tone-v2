<script>
    import Pagination from "./Pagination.svelte";
    import {dataSetsStore} from "../stores/dataSetsStore.js";

    let pages = { pageCurrent: 1 , pageCount: 1, pageBreak: 4  };
</script>

    {#each $dataSetsStore as metadataObject, index (metadataObject.data_id)}
        {#await metadataObject.importDataFrom() }
            <p>loading... {metadataObject.title}</p>
            {:then structuredData}
            <table class="table">
                <thead>{metadataObject.title.toUpperCase()}</thead>
                    {#each structuredData["fields"] as column}
                        <th>
                            <abbr class="has-background-success is-size-5 p-1" title={column.name}>
                                {column.name.trim()}
                            </abbr>
                            <span class="has-text-info is-size-8">
                                {column.type}
                            </span>
                        </th>
                    {/each}
                <tbody>

            <!-- key assigned from the first entry in the row or error code if null-->
                {#each structuredData["rows"] as row (row[0] || '-1')}
                        {#each row as entry, currentRow}
                            {#if currentRow <= pages.pageBreak}
                            <tr>
                                <!--  key assigned from the first current index-->
                                {#each entry as cell, i ('cell'+i)}
                                    <td class="is-size-8">{cell}</td>
                                {/each}
                            </tr>
                                {:else}
                                    ...
                                {/if}
                        {/each}
                {/each}
            </tbody>
            </table>
        {:catch error}
            <p>Something went wrong: {error.message}</p>
        {/await}
    {/each}
<!-- <Pagination pageCurrent="1" pageCount="1" pageBreak="3" />-->

