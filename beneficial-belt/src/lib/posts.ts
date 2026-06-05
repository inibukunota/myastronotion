import { notion, databaseId } from "./notion";

export async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title:
      page.properties.Title.title?.[0]?.plain_text || "",
    slug:
      page.properties.Slug.rich_text?.[0]?.plain_text || "",
    description:
      page.properties["Meta Description"]?.rich_text?.[0]?.plain_text || "",
    publishedDate:
      page.properties["Published Date"]?.date?.start || "",
  }));
}
