import { site } from '@/content/site';
import { bringList } from '@/content/preparation';

const pad = (n: number) => String(n).padStart(2, '0');

/** Экранирование текста по RFC 5545. */
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Строки не длиннее 75 октетов: переносим по символам с ведущим пробелом. */
function fold(line: string): string {
  const enc = new TextEncoder();
  let out = '';
  let cur = '';
  let len = 0;
  for (const ch of line) {
    const l = enc.encode(ch).length;
    if (len + l > 74) {
      out += cur + '\r\n ';
      cur = '';
      len = 1;
    }
    cur += ch;
    len += l;
  }
  return out + cur;
}

export type IcsInput = {
  /** ГГГГ-ММ-ДД */
  dateIso: string;
  /** ЧЧ:ММ по Москве */
  time: string;
  /** «к кардиологу Аргишти Гагиковичу Варданяну» */
  who: string;
  uid?: string;
};

/** Событие календаря: 30 минут по московскому времени, время ориентировочное. */
export function buildIcs({ dateIso, time, who, uid }: IcsInput): string {
  const [y, m, d] = dateIso.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const start = `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
  const endMin = hh * 60 + mm + 30;
  const end = `${y}${pad(m)}${pad(d)}T${pad(Math.floor(endMin / 60) % 24)}${pad(endMin % 60)}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const desc = [
    `Запись ${who}. Время ориентировочное: администратор подтвердит.`,
    `Что взять с собой: ${bringList.join('; ')}.`,
    `Телефоны: ${site.phones.map((p) => p.display).join(', ')}.`,
  ].join('\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Правильное лечение//Концепт сайта//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Moscow',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0300',
    'TZOFFSETTO:+0300',
    'TZNAME:MSK',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid ?? `${start}-${Math.random().toString(36).slice(2, 10)}`}@pravlech`,
    `DTSTAMP:${stamp}Z`,
    `DTSTART;TZID=Europe/Moscow:${start}`,
    `DTEND;TZID=Europe/Moscow:${end}`,
    `SUMMARY:${esc(`Приём (ориентировочно): ${who}`)}`,
    `LOCATION:${esc(`${site.address.zip}, ${site.address.street}`)}`,
    `DESCRIPTION:${esc(desc)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc('Завтра приём в клинике «Правильное лечение»')}`,
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

export function downloadIcs(content: string, filename = 'priyom-pravilnoe-lechenie.ics'): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Текст для родных: кому, когда, куда, как найти. */
export function buildShareText({ dayLabel, time, who }: { dayLabel: string; time: string; who: string }): string {
  return [
    `Запись ${who}: ${dayLabel}, ${time} (время ориентировочное, администратор подтвердит).`,
    `Адрес: ${site.address.zip}, ${site.address.street}.`,
    `Карта: ${site.address.mapsUrl}`,
    `Телефон клиники: ${site.phones[0].display}.`,
  ].join('\n');
}
