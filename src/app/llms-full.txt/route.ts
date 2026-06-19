import { buildLlmsFullTxt, llmsTextHeaders } from "@/lib/llms-txt";

export function GET() {
  return new Response(buildLlmsFullTxt(), { headers: llmsTextHeaders });
}
