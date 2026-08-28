"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

type FrenchDatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

const monthFormatter = new Intl.DateTimeFormat("fr-CA", { month: "long", year: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat("fr-CA", { day: "numeric", month: "long", year: "numeric" });
const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

function parseFrenchDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;
  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatFrenchDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

function sameDay(a: Date | null, b: Date) {
  return Boolean(a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate());
}

export function FrenchDatePicker({ value, onChange, invalid, describedBy }: FrenchDatePickerProps) {
  const selectedDate = useMemo(() => parseFrenchDate(value), [value]);
  const today = useMemo(() => startOfDay(new Date()), []);
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date((selectedDate ?? today).getFullYear(), (selectedDate ?? today).getMonth(), 1),
  );
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const days = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      const day = index - firstWeekday + 1;
      return day > 0 && day <= daysInMonth ? new Date(year, month, day) : null;
    });
  }, [visibleMonth]);

  const toggleCalendar = () => {
    if (!open) {
      const anchor = selectedDate ?? today;
      setVisibleMonth(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
    }
    setOpen((current) => !current);
  };

  return (
    <div className="french-date-picker" ref={rootRef}>
      <button
        aria-describedby={describedBy}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-invalid={invalid || undefined}
        className={`date-picker-trigger${value ? " has-value" : ""}`}
        onClick={toggleCalendar}
        type="button"
      >
        <Icon name="calendar" size={22} />
        <span><small>Date souhaitée</small>{selectedDate ? fullDateFormatter.format(selectedDate) : "Choisir une date"}</span>
        <i aria-hidden="true" />
      </button>

      {open && (
        <div className="date-picker-panel" role="dialog" aria-label="Choisir une date de début">
          <div className="date-picker-month">
            <button aria-label="Mois précédent" onClick={() => setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))} type="button"><Icon name="arrow" size={18} /></button>
            <strong>{monthFormatter.format(visibleMonth)}</strong>
            <button aria-label="Mois suivant" onClick={() => setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))} type="button"><Icon name="arrow" size={18} /></button>
          </div>
          <div className="date-picker-weekdays" aria-hidden="true">
            {weekdays.map((weekday) => <span key={weekday}>{weekday}</span>)}
          </div>
          <div className="date-picker-days" role="grid">
            {days.map((date, index) => date ? (
              <button
                aria-current={sameDay(today, date) ? "date" : undefined}
                aria-label={fullDateFormatter.format(date)}
                aria-pressed={sameDay(selectedDate, date)}
                className={`${sameDay(selectedDate, date) ? "is-selected" : ""}${sameDay(today, date) ? " is-today" : ""}`}
                disabled={date < today}
                key={date.toISOString()}
                onClick={() => { onChange(formatFrenchDate(date)); setOpen(false); }}
                role="gridcell"
                type="button"
              >{date.getDate()}</button>
            ) : <span aria-hidden="true" key={`empty-${index}`} />)}
          </div>
          <div className="date-picker-footer">
            <button onClick={() => { onChange(""); setOpen(false); }} type="button">Je ne sais pas encore</button>
            <span>Dates passées indisponibles</span>
          </div>
        </div>
      )}
    </div>
  );
}
