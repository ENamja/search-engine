"use server";

import { headers } from "next/headers";

interface getSearchResultsProps {
  query: string;
  length: number;
}

export async function getSearchResults({
  query,
  length,
}: getSearchResultsProps) {
  const headersList = headers();
  const host = headersList.get("host");

  try {
    const res = await fetch(
      `http://${host}/api?query=${query}&length=${length}`
    );
    if (res.ok) {
      const json_obj = await res.json();
      const data = json_obj.data;
      let links = Array<Array<string>>();
      const keys = Object.keys(data).length;
      for (let i = 0; i < keys; i++) {
        links.push(data[i]);
      }
      return links;
    }
    throw new Error(`${res.status} ${res.statusText}`);
  } catch (error) {
    throw new Error("Failed to fetch");
  }
}
