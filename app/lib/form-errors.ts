// Shared helpers for surfacing form-submission errors. The API routes already
// return specific messages (`{ ok: false, error, detail? }`); these read them
// so forms can show *why* a submit failed and flag *which* field, instead of a
// blanket "Something went wrong".

export const GENERIC_ERROR = "Something went wrong. Please try again.";
export const NETWORK_ERROR =
  "Couldn't reach the server. Check your connection and try again.";

export interface ParsedApiError {
  /** User-facing reason for the failure. */
  message: string;
  /** Field names the server flagged as missing (from "Missing required fields: …"). */
  missingFields: string[];
  /** True when the server reported an invalid email address. */
  invalidEmail: boolean;
}

/** Read a failed submit Response and extract a useful message plus field hints. */
export async function parseApiError(res: Response): Promise<ParsedApiError> {
  const data = (await res.json().catch(() => null)) as
    | { error?: string; detail?: string }
    | null;

  const serverError = data?.error?.trim() ?? "";
  let message = serverError || GENERIC_ERROR;
  // `detail` is only sent by the API in development — append it for diagnosis.
  if (data?.detail) message = `${message} (${data.detail})`;

  const missing = /^Missing required fields:\s*(.+)/i.exec(serverError);
  const missingFields = missing
    ? missing[1]
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  const invalidEmail = /invalid email/i.test(serverError);

  return { message, missingFields, invalidEmail };
}
