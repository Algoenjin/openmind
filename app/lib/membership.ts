import { renderFields, sendTeamNotification } from "./email";

export interface MembershipApplication {
  tier: string;
  tierName?: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  city?: string;
  howFound?: string;
  phone?: string;
  email: string;
  reason: string;
}

/**
 * Single point of persistence for membership applications.
 *
 * The whole submission pipeline (form → POST /api/membership → here) is fully
 * wired and validated. Each application is emailed to the team inbox via Resend
 * (see app/lib/email.ts). To also persist to a Sheet / Airtable / DB, add that
 * call alongside the email below.
 */
export async function saveMembershipApplication(
  application: MembershipApplication
): Promise<void> {
  console.log(
    "[membership] new application:",
    JSON.stringify(application, null, 2)
  );

  const fullName = [application.firstName, application.lastName]
    .filter(Boolean)
    .join(" ");
  const tier = application.tierName ?? application.tier;
  await sendTeamNotification({
    subject: `New community application (${tier}): ${fullName}`,
    replyTo: application.email,
    html: `<h2 style="font-family:system-ui,-apple-system,sans-serif;">New community application</h2>${renderFields(
      [
        ["Tier", tier],
        ["Name", fullName],
        ["Nickname", application.nickname],
        ["City", application.city],
        ["How did you find us?", application.howFound],
        ["Phone", application.phone],
        ["Email", application.email],
        ["Reason", application.reason],
      ]
    )}`,
  });
}
