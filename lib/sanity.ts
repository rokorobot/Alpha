import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { apiVersion, dataset, projectId } from "../sanity/env";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false for real-time updates during development
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
