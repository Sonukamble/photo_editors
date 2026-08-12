import { CreateStudio } from "@/components/create/CreateStudio";

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ style?: string | string[] }>;
}) {
  const params = await searchParams;
  const styleParam = params.style;
  const initialStyle = Array.isArray(styleParam) ? styleParam[0] : styleParam;

  return <CreateStudio initialStyle={initialStyle} />;
}
