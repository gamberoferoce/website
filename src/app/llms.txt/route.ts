import { buildLlmsTxt, llmsTextHeaders } from "@/lib/llms-txt";

export function GET() {
  return new Response(buildLlmsTxt(), { headers: llmsTextHeaders });
}
