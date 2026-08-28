export type ContactEmailData = {
  submissionId: string;
  name: string;
  phone: string;
  email: string;
  project: string;
  date: string;
  message: string;
};

const SITE_URL = "https://constructioninnovatech.com";
const PHONE = "418 808-3760";
const PHONE_HREF = "tel:+14188083760";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const emailShell = ({
  preheader,
  content,
}: {
  preheader: string;
  content: string;
}) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <title>Construction Innovatech</title>
    <style>
      @media only screen and (max-width: 660px) {
        .email-wrap { padding: 0 !important; }
        .email-card { border-left: 0 !important; border-right: 0 !important; }
        .email-pad { padding-left: 24px !important; padding-right: 24px !important; }
        .email-title { font-size: 34px !important; line-height: 38px !important; }
        .email-action { display: block !important; margin: 0 0 10px !important; text-align: center !important; }
        .email-two-col { display: block !important; width: 100% !important; }
      }
    </style>
  </head>
  <body style="background:#f3f4f6;color:#101114;font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;">
    <div style="display:none;font-size:1px;color:#f3f4f6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f4f6;border-collapse:collapse;">
      <tr>
        <td class="email-wrap" align="center" style="padding:34px 18px;">
          <table class="email-card" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border:1px solid #e1e3e7;border-collapse:collapse;max-width:640px;width:100%;">
            <tr><td style="background:#f20d16;font-size:0;height:5px;line-height:5px;">&nbsp;</td></tr>
            <tr>
              <td class="email-pad" style="border-bottom:1px solid #eceef1;padding:25px 38px 23px;">
                <a href="${SITE_URL}" style="display:inline-block;text-decoration:none;">
                  <img src="${SITE_URL}/img/logo-noir.png" width="190" alt="Construction Innovatech" style="border:0;display:block;height:auto;max-width:190px;width:100%;">
                </a>
              </td>
            </tr>
            ${content}
            <tr>
              <td class="email-pad" style="background:#101114;padding:28px 38px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;line-height:20px;padding-bottom:6px;">Construction Innovatech</td>
                  </tr>
                  <tr>
                    <td style="color:#aeb2b9;font-size:12px;line-height:19px;">6232, 1ère avenue, Québec (QC) G1H 2Z8<br><a href="${PHONE_HREF}" style="color:#ffffff;text-decoration:none;">${PHONE}</a> &nbsp;·&nbsp; <a href="${SITE_URL}" style="color:#ffffff;text-decoration:none;">constructioninnovatech.com</a></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const detailRow = (label: string, value: string, last = false) => `
  <tr>
    <td style="border-bottom:${last ? "0" : "1px solid #e8eaed"};color:#727986;font-size:11px;font-weight:700;letter-spacing:.08em;padding:14px 0;text-transform:uppercase;vertical-align:top;width:36%;">${escapeHtml(label)}</td>
    <td style="border-bottom:${last ? "0" : "1px solid #e8eaed"};color:#101114;font-size:14px;font-weight:700;line-height:21px;padding:14px 0;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;

export function internalContactEmailHtml(data: ContactEmailData) {
  const firstName = escapeHtml(data.name.split(/\s+/)[0] || data.name);
  const safeEmail = escapeHtml(data.email);
  const phoneHref = `tel:${data.phone.replace(/\D/g, "")}`;

  return emailShell({
    preheader: `Nouvelle demande de ${data.name} pour un projet de ${data.project}.`,
    content: `
      <tr>
        <td class="email-pad" style="padding:42px 38px 35px;">
          <p style="color:#f20d16;font-size:11px;font-weight:800;letter-spacing:.16em;margin:0 0 15px;text-transform:uppercase;">Nouvelle demande · Réf. ${escapeHtml(data.submissionId)}</p>
          <h1 class="email-title" style="color:#101114;font-size:42px;letter-spacing:-1.2px;line-height:46px;margin:0 0 15px;">Un nouveau projet<br>vient d’arriver.</h1>
          <p style="color:#656c77;font-size:16px;line-height:25px;margin:0;">${firstName} souhaite parler à l’équipe d’un projet de <strong style="color:#101114;">${escapeHtml(data.project)}</strong>.</p>
        </td>
      </tr>
      <tr>
        <td class="email-pad" style="padding:0 38px 34px;">
          <a class="email-action" href="mailto:${safeEmail}" style="background:#f20d16;color:#ffffff;display:inline-block;font-size:13px;font-weight:800;margin:0 8px 0 0;padding:15px 20px;text-decoration:none;">Répondre à ${firstName}</a>
          <a class="email-action" href="${phoneHref}" style="border:1px solid #101114;color:#101114;display:inline-block;font-size:13px;font-weight:800;padding:14px 20px;text-decoration:none;">Appeler ${escapeHtml(data.phone)}</a>
        </td>
      </tr>
      <tr>
        <td class="email-pad" style="padding:0 38px 36px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f7f8;border-collapse:collapse;padding:0 22px;">
            ${detailRow("Client", data.name)}
            ${detailRow("Téléphone", data.phone)}
            ${detailRow("Courriel", data.email)}
            ${detailRow("Type de projet", data.project)}
            ${detailRow("Début souhaité", data.date || "À déterminer", true)}
          </table>
        </td>
      </tr>
      <tr>
        <td class="email-pad" style="padding:0 38px 42px;">
          <p style="color:#727986;font-size:11px;font-weight:800;letter-spacing:.12em;margin:0 0 10px;text-transform:uppercase;">Le projet, dans ses mots</p>
          <div style="border-left:3px solid #f20d16;color:#292d33;font-size:15px;line-height:24px;padding:4px 0 4px 19px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
        </td>
      </tr>`,
  });
}

export function customerConfirmationEmailHtml(data: ContactEmailData) {
  const firstName = escapeHtml(data.name.split(/\s+/)[0] || data.name);

  return emailShell({
    preheader: `Bonjour ${data.name}, votre demande a bien été reçue. Notre équipe vous répondra sous 24 à 48 h.`,
    content: `
      <tr>
        <td class="email-pad" style="padding:42px 38px 22px;">
          <p style="color:#f20d16;font-size:11px;font-weight:800;letter-spacing:.16em;margin:0 0 15px;text-transform:uppercase;">Demande bien reçue</p>
          <h1 class="email-title" style="color:#101114;font-size:42px;letter-spacing:-1.2px;line-height:46px;margin:0 0 17px;">Bonjour ${firstName},<br>votre projet est entre de bonnes mains.</h1>
          <p style="color:#656c77;font-size:16px;line-height:26px;margin:0;">Merci de nous avoir partagé votre vision. Un membre de Construction Innovatech étudiera votre demande et vous contactera généralement dans les <strong style="color:#101114;">24 à 48 heures ouvrables</strong>.</p>
        </td>
      </tr>
      <tr>
        <td class="email-pad" style="padding:12px 38px 34px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td style="border-top:1px solid #e4e6e9;padding:18px 0;vertical-align:top;width:46px;"><span style="background:#f20d16;color:#ffffff;display:inline-block;font-size:12px;font-weight:800;height:28px;line-height:28px;text-align:center;width:28px;">01</span></td>
              <td style="border-top:1px solid #e4e6e9;padding:18px 0;"><strong style="color:#101114;display:block;font-size:14px;margin-bottom:4px;">Nous analysons votre demande</strong><span style="color:#727986;font-size:13px;line-height:20px;">Type de travaux, besoins et échéancier souhaité.</span></td>
            </tr>
            <tr>
              <td style="border-top:1px solid #e4e6e9;padding:18px 0;vertical-align:top;"><span style="background:#f20d16;color:#ffffff;display:inline-block;font-size:12px;font-weight:800;height:28px;line-height:28px;text-align:center;width:28px;">02</span></td>
              <td style="border-top:1px solid #e4e6e9;padding:18px 0;"><strong style="color:#101114;display:block;font-size:14px;margin-bottom:4px;">Nous vous appelons</strong><span style="color:#727986;font-size:13px;line-height:20px;">Une conversation simple pour préciser votre vision.</span></td>
            </tr>
            <tr>
              <td style="border-bottom:1px solid #e4e6e9;border-top:1px solid #e4e6e9;padding:18px 0;vertical-align:top;"><span style="background:#f20d16;color:#ffffff;display:inline-block;font-size:12px;font-weight:800;height:28px;line-height:28px;text-align:center;width:28px;">03</span></td>
              <td style="border-bottom:1px solid #e4e6e9;border-top:1px solid #e4e6e9;padding:18px 0;"><strong style="color:#101114;display:block;font-size:14px;margin-bottom:4px;">Nous préparons la suite</strong><span style="color:#727986;font-size:13px;line-height:20px;">Visite, conseils et estimation selon votre projet.</span></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="email-pad" style="padding:0 38px 34px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f7f8;border-collapse:collapse;padding:0 22px;">
            ${detailRow("Votre projet", data.project)}
            ${detailRow("Début souhaité", data.date || "À déterminer", true)}
          </table>
          <p style="color:#969ca5;font-size:11px;line-height:18px;margin:11px 0 0;">Référence de votre demande : ${escapeHtml(data.submissionId)}</p>
        </td>
      </tr>
      <tr>
        <td class="email-pad" style="padding:0 38px 42px;">
          <p style="color:#656c77;font-size:14px;line-height:22px;margin:0 0 17px;">Une question urgente ou un détail à ajouter ? Appelez-nous directement.</p>
          <a class="email-action" href="${PHONE_HREF}" style="background:#f20d16;color:#ffffff;display:inline-block;font-size:13px;font-weight:800;padding:15px 20px;text-decoration:none;">Parler à notre équipe · ${PHONE}</a>
        </td>
      </tr>`,
  });
}

export function internalContactEmailText(data: ContactEmailData) {
  return [
    "NOUVELLE DEMANDE — CONSTRUCTION INNOVATECH",
    `Référence : ${data.submissionId}`,
    "",
    `Nom : ${data.name}`,
    `Téléphone : ${data.phone}`,
    `Courriel : ${data.email}`,
    `Type de projet : ${data.project}`,
    `Date souhaitée : ${data.date || "À déterminer"}`,
    "",
    "Description du projet :",
    data.message,
  ].join("\n");
}

export function customerConfirmationEmailText(data: ContactEmailData) {
  const firstName = data.name.split(/\s+/)[0] || data.name;
  return [
    `Bonjour ${firstName},`,
    "",
    "Votre demande a bien été reçue par Construction Innovatech.",
    "Notre équipe étudiera votre projet et vous contactera généralement dans les 24 à 48 heures ouvrables.",
    "",
    `Projet : ${data.project}`,
    `Début souhaité : ${data.date || "À déterminer"}`,
    `Référence : ${data.submissionId}`,
    "",
    `Une question urgente ? Appelez-nous au ${PHONE}.`,
    "",
    "Construction Innovatech",
    "6232, 1ère avenue, Québec (QC) G1H 2Z8",
    SITE_URL,
  ].join("\n");
}
