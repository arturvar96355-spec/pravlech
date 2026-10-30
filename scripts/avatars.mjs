// Рисует аватары врачей (SVG). Реальных людей не изображает.
import { mkdirSync, writeFileSync } from 'node:fs';

const people = [
  ['lavrov-igor-sergeevich', 'm', '#E9C6A8', '#3B2F2A', 'short', true],
  ['morozova-elena-viktorovna', 'f', '#F1D2B8', '#7A4A2E', 'bob'],
  ['gromov-andrey-nikolaevich', 'm', '#DDB48E', '#6B6B6B', 'short', true],
  ['belova-tatyana-andreevna', 'f', '#F3D9C4', '#D6A86A', 'long'],
  ['irina', 'f', '#EBCBB0', '#4A3328', 'bun'],
  ['rudenko-alina-olegovna', 'f', '#E7C2A2', '#2E2420', 'long'],
  ['zorina-marina-leonidovna', 'f', '#F0D0B6', '#9A5B3A', 'bob'],
  ['tikhonova-ksenia-pavlovna', 'f', '#E3BE9C', '#5A3A26', 'bun'],
  ['mirova-darya-sergeevna', 'f', '#F4DAC6', '#8C5A3C', 'long'],
  ['koltsova-viktoriya-andreevna', 'f', '#EAC8AA', '#C9A35F', 'bob'],
];
const bg = ['#DCEBE3', '#E6F0EA', '#F6E2D3', '#E3EDE8'];

function hair(kind, c) {
  if (kind === 'long') return `<path d="M62 118c-6-46 20-72 58-72s64 26 58 72l4 78c-10 6-20 6-28 0l-6-60H92l-6 60c-8 6-18 6-28 0z" fill="${c}"/>`;
  if (kind === 'bob') return `<path d="M64 120c-4-44 18-70 56-70s60 26 56 70l-2 30c-8 4-16 2-22-4V100H88v46c-6 6-14 8-22 4z" fill="${c}"/>`;
  if (kind === 'bun') return `<circle cx="120" cy="44" r="20" fill="${c}"/><path d="M72 104c0-32 20-52 48-52s48 20 48 52c-14-18-30-26-48-26s-34 8-48 26z" fill="${c}"/>`;
  return `<path d="M72 100c0-34 20-50 48-50s48 16 48 50c-10-14-24-20-48-20s-38 6-48 20z" fill="${c}"/>`;
}

mkdirSync('public/img/doctors', { recursive: true });
people.forEach(([slug, g, skin, hairC, style, beard], i) => {
  const coat = '#FFFFFF';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Аватар врача (иллюстрация)">
<rect width="240" height="240" fill="${bg[i % bg.length]}"/>
${style === 'long' || style === 'bob' ? hair(style, hairC) : ''}
<path d="M30 240c4-52 40-72 90-72s86 20 90 72z" fill="${coat}" stroke="#C9D8D0" stroke-width="3"/>
<path d="M98 170l22 36 22-36" fill="none" stroke="#2F7A63" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M104 160h32v20c-4 8-28 8-32 0z" fill="${skin}"/>
<ellipse cx="120" cy="118" rx="38" ry="46" fill="${skin}"/>
${style === 'bun' || style === 'short' ? hair(style, hairC) : ''}
${style === 'long' || style === 'bob' ? `<path d="M82 108c4-24 20-34 38-34s34 10 38 34c-10-10-24-14-38-14s-28 4-38 14z" fill="${hairC}"/>` : ''}
<circle cx="106" cy="120" r="3.2" fill="#2B3532"/><circle cx="134" cy="120" r="3.2" fill="#2B3532"/>
<path d="M108 138c8 7 16 7 24 0" fill="none" stroke="#9A5B4A" stroke-width="3.5" stroke-linecap="round"/>
${beard ? `<path d="M86 128c2 26 18 38 34 38s32-12 34-38c-6 12-18 16-34 16s-28-4-34-16z" fill="${hairC}" opacity=".85"/><path d="M108 138c8 6 16 6 24 0" fill="none" stroke="#9A5B4A" stroke-width="3.5" stroke-linecap="round"/>` : ''}
<path d="M70 190c-6 14-4 28 10 34M170 190c6 14 4 28-10 34" fill="none" stroke="#2F7A63" stroke-width="4" stroke-linecap="round"/>
<circle cx="62" cy="226" r="7" fill="none" stroke="#2F7A63" stroke-width="4"/>
</svg>
`;
  writeFileSync(`public/img/doctors/${slug}.svg`, svg);
});
console.log('ok', people.length);
