import DataSets from "../dataSets/dataSets.js";
import {writable} from "svelte/store";

export const dataSources = writable([]);

const importDataSet = async(showSource) => {

    const dataSets = DataSets.map( ( dataset, index  ) =>
        {
            return {
                id: index,
                title: dataset.metadata.title,
                source:  dataset.metadata.source
            }
        }
    )

    dataSources.set(dataSets);
};

importDataSet();
