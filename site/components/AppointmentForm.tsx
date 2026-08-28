"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { company, services } from "@/data/site";

type Values = {
  name: string;
  phone: string;
  email: string;
  project: string;
  date: string;
  message: string;
  website: string;
};

type Status = "idle" | "submitting" | "success";

const EMPTY: Values = {
  name: "",
  phone: "",
  email: "",
  project: "",
  date: "",
  message: "",
  website: "",
};

const STEP_COUNT = 5;

function isValidFrenchDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;
  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.getFullYear() === Number(year) && date.getMonth() === Number(month) - 1 && date.getDate() === Number(day);
}

function formatFrenchDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join("/");
}

function errorsForStep(values: Values, step: number) {
  const errors: Partial<Record<keyof Values, string>> = {};

  if (step === 0 && !values.project) errors.project = "Choisissez le type de projet qui vous ressemble le plus.";
  if (step === 1 && values.message.trim().length < 10) errors.message = "Décrivez votre projet en quelques mots.";
  if (step === 2 && values.name.trim().length < 2) errors.name = "Indiquez votre nom.";
  if (step === 3 && values.phone.replace(/\D/g, "").length < 10) errors.phone = "Indiquez un téléphone à 10 chiffres.";
  if (step === 3 && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = "Indiquez un courriel valide.";
  if (step === 4 && values.date && !isValidFrenchDate(values.date)) errors.date = "Utilisez le format JJ / MM / AAAA.";

  return errors;
}

function buildMailto(values: Values) {
  const body = [
    `Nom : ${values.name}`,
    `Téléphone : ${values.phone}`,
    `Courriel : ${values.email}`,
    `Type de projet : ${values.project}`,
    values.date ? `Date souhaitée : ${values.date}` : null,
    "",
    "Description du projet :",
    values.message,
  ].filter(Boolean).join("\n");

  return `mailto:${company.email}?subject=${encodeURIComponent(`Demande de soumission — ${values.project} — ${values.name}`)}&body=${encodeURIComponent(body)}`;
}

export function AppointmentForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const panelRef = useRef<HTMLDivElement>(null);

  const progress = ((step + 1) / STEP_COUNT) * 100;
  const fallbackMailto = useMemo(() => buildMailto(values), [values]);

  useEffect(() => {
    const target = panelRef.current?.querySelector<HTMLElement>(
      "input:not([type='hidden']), textarea, button.project-choice",
    );
    target?.focus();
  }, [step]);

  const set = (key: keyof Values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const next = () => {
    const found = errorsForStep(values, step);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStep((current) => Math.min(current + 1, STEP_COUNT - 1));
  };

  const back = () => {
    setSubmitError(null);
    setStep((current) => Math.max(current - 1, 0));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (step < STEP_COUNT - 1) {
      next();
      return;
    }

    const allErrors = [0, 1, 2, 3, 4].reduce(
      (current, currentStep) => ({ ...current, ...errorsForStep(values, currentStep) }),
      {} as Partial<Record<keyof Values, string>>,
    );

    if (Object.keys(allErrors).length) {
      setErrors(allErrors);
      const firstInvalidStep = [0, 1, 2, 3, 4].find((item) => Object.keys(errorsForStep(values, item)).length);
      setStep(firstInvalidStep ?? 0);
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const result = await response.json().catch(() => null) as { message?: string } | null;

      if (!response.ok) throw new Error(result?.message || "L’envoi a échoué. Réessayez dans un instant.");
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setSubmitError(error instanceof Error ? error.message : "L’envoi a échoué. Réessayez dans un instant.");
    }
  };

  if (status === "success") {
    return (
      <div className="typeform-shell form-sent" role="status">
        <span className="success-icon"><Icon name="check" size={30} /></span>
        <p className="form-kicker">Demande envoyée</p>
        <h2 className="content-title">Merci {values.name.split(" ")[0]} !</h2>
        <p>Votre projet est maintenant entre de bonnes mains. Un joli courriel de confirmation vient de vous être envoyé, et notre équipe vous répondra sous 24 à 48 heures ouvrables.</p>
        <div className="button-row">
          <a className="button button-red" href={company.phoneHref}><Icon name="phone" size={17} /> {company.phone}</a>
          <button
            className="button button-outline-dark"
            onClick={() => {
              setValues(EMPTY);
              setStep(0);
              setStatus("idle");
              startedAt.current = Date.now();
            }}
            type="button"
          >
            Nouvelle demande
          </button>
        </div>
      </div>
    );
  }

  const error = (key: keyof Values) => errors[key] ? <small className="field-error" id={`${key}-error`}>{errors[key]}</small> : null;
  const field = (key: keyof Values) => ({
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    "aria-invalid": errors[key] ? ("true" as const) : undefined,
    onChange: set(key),
    value: values[key],
  });

  return (
    <form
      className={`appointment-form typeform-shell ${step === STEP_COUNT - 1 ? "is-review-step" : ""}`}
      noValidate
      onKeyDown={(event) => {
        if (event.key === "Enter" && step < STEP_COUNT - 1 && event.target instanceof HTMLInputElement) {
          event.preventDefault();
          next();
        }
      }}
      onSubmit={onSubmit}
    >
      <div className="form-progress-header">
        <div>
          <span>Votre projet</span>
          <strong>{step + 1} / {STEP_COUNT}</strong>
        </div>
        <div className="form-progress" aria-label={`Étape ${step + 1} sur ${STEP_COUNT}`}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="form-step" key={step} ref={panelRef}>
        {step === 0 && (
          <fieldset>
            <legend><span className="question-number">01</span> Quel projet avez-vous en tête ?</legend>
            <p className="question-help">Choisissez l’option la plus proche. Nous préciserons les détails ensemble.</p>
            <div className="project-choice-grid">
              {[...services, { slug: "autre", title: "Autre projet", icon: "building" }].map((service) => (
                <button
                  aria-pressed={values.project === service.title}
                  className={`project-choice ${values.project === service.title ? "selected" : ""}`}
                  key={service.slug}
                  onClick={() => {
                    setValues((current) => ({ ...current, project: service.title }));
                    setErrors((current) => ({ ...current, project: undefined }));
                  }}
                  type="button"
                >
                  <Icon name={service.icon} size={21} />
                  <span>{service.title}</span>
                  <i><Icon name="check" size={13} /></i>
                </button>
              ))}
            </div>
            {error("project")}
          </fieldset>
        )}

        {step === 1 && (
          <label className="type-question">
            <span className="question-title"><span className="question-number">02</span> Racontez-nous votre projet</span>
            <span className="question-help">Dimensions, travaux souhaités, état actuel… dites-nous ce qui compte pour vous.</span>
            <textarea autoFocus maxLength={1500} placeholder="Ex. Nous souhaitons agrandir la maison et refaire la cuisine…" rows={7} {...field("message")} />
            <span className="character-count">{values.message.length} / 1500</span>
            {error("message")}
          </label>
        )}

        {step === 2 && (
          <label className="type-question">
            <span className="question-title"><span className="question-number">03</span> Comment devons-nous vous appeler ?</span>
            <span className="question-help">Votre nom nous suffit pour commencer.</span>
            <input autoComplete="name" autoFocus placeholder="Jean Tremblay" type="text" {...field("name")} />
            {error("name")}
          </label>
        )}

        {step === 3 && (
          <fieldset>
            <legend><span className="question-number">04</span> Où pouvons-nous vous répondre ?</legend>
            <p className="question-help">Nous utiliserons ces coordonnées uniquement pour votre demande.</p>
            <div className="type-contact-grid">
              <label>
                <span>Téléphone</span>
                <input autoComplete="tel" autoFocus inputMode="tel" placeholder="418 000-0000" type="tel" {...field("phone")} />
                {error("phone")}
              </label>
              <label>
                <span>Courriel</span>
                <input autoComplete="email" placeholder="vous@exemple.com" type="email" {...field("email")} />
                {error("email")}
              </label>
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <div className="type-question form-review">
            <span className="question-title"><span className="question-number">05</span> Quand souhaitez-vous commencer ?</span>
            <span className="question-help">Cette date est indicative et peut rester vide.</span>
            <div className="form-date-field">
              <Icon name="calendar" size={22} />
              <input
                aria-describedby={errors.date ? "date-error" : undefined}
                aria-invalid={errors.date ? "true" : undefined}
                autoComplete="off"
                inputMode="numeric"
                maxLength={10}
                onChange={(event) => {
                  setValues((current) => ({ ...current, date: formatFrenchDate(event.target.value) }));
                  setErrors((current) => ({ ...current, date: undefined }));
                }}
                placeholder="JJ / MM / AAAA"
                type="text"
                value={values.date}
              />
            </div>
            {error("date")}
            <div className="review-card">
              <div><span>Projet</span><strong>{values.project}</strong></div>
              <div><span>Contact</span><strong>{values.name}<small>{values.email}</small></strong></div>
              <button onClick={() => setStep(0)} type="button">Modifier</button>
            </div>
            {submitError && (
              <div className="submit-error" role="alert">
                <strong>Impossible d’envoyer pour le moment.</strong>
                <span>{submitError}</span>
                <a href={fallbackMailto}>Envoyer plutôt par courriel</a>
              </div>
            )}
          </div>
        )}
      </div>

      <label className="form-honeypot" aria-hidden="true">
        Site web
        <input autoComplete="off" tabIndex={-1} {...field("website")} />
      </label>

      <div className="form-navigation">
        {step > 0 ? <button className="form-back" onClick={back} type="button"><Icon name="arrow" size={17} /> Retour</button> : <span />}
        <button className="button button-red form-next" disabled={status === "submitting"} type="submit">
          {step === STEP_COUNT - 1 ? (status === "submitting" ? "Envoi en cours…" : "Envoyer ma demande") : "Continuer"}
          {step < STEP_COUNT - 1 && <Icon name="arrow" size={17} />}
        </button>
      </div>
      <p className="keyboard-hint">Appuyez sur <kbd>Entrée ↵</kbd> pour {step === STEP_COUNT - 1 ? "envoyer" : "continuer"}</p>
    </form>
  );
}
