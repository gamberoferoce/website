import { put } from "@vercel/blob";

export type ContactSubmission = {
  name: string;
  email: string;
  projectIdea: string;
};

export async function saveContactSubmission(submission: ContactSubmission) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { ok: false as const, error: "missing_config" };
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const pathname = `contacts/${createdAt.slice(0, 10)}/${id}.json`;

  try {
    await put(
      pathname,
      JSON.stringify({
        id,
        name: submission.name,
        email: submission.email,
        project_idea: submission.projectIdea,
        created_at: createdAt,
      }),
      {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
      },
    );

    return { ok: true as const, id };
  } catch (error) {
    console.error("Contact submission save failed:", error);
    return { ok: false as const, error: "save_failed" };
  }
}
