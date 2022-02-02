import {writable} from "svelte/store";
import dataSetsIndex from "../dataSets/dataSetsIndex.js";

export const dataSetsStore = writable([]);

let destructedDataSets = () => {

    const dataSets = dataSetsIndex.map( ( dataset, index  ) =>
        {
            return {
                position: index,
                data_id: dataset.id,
                title: dataset.metadata.title,
                source:  dataset.metadata.source,
                importDataFrom: dataset.attachments.data
            }
        }
    )

    dataSetsStore.set(dataSets);
};

destructedDataSets();
