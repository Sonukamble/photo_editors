import { CreateStudio } from "@/components/create/CreateStudio";

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{
    vibe?: string | string[];
    style?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const vibeParam = Array.isArray(params.vibe) ? params.vibe[0] : params.vibe;
  const styleParam = Array.isArray(params.style)
    ? params.style[0]
    : params.style;

  return <CreateStudio vibe={vibeParam} initialStyle={styleParam} />;
}
