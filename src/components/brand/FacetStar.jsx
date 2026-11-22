/**
 * Étoile tracée au trait, façon dessin technique : un contour extérieur
 * et une étoile intérieure, pleine (active) ou vide.
 * Géométrie calculée (rapport des rayons du pentagramme).
 */
const CX = 50;
const CY = 52;
const OUTER = 47;   // contour extérieur
const INNER = 37;   // étoile intérieure
const RATIO = 0.382; // rayon intérieur / rayon extérieur d'une étoile régulière

const pt = (radius, k) => {
  const a = ((-90 + k * 36) * Math.PI) / 180;
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)];
};
const starPoints = (R) =>
  Array.from({ length: 10 }, (_, k) => pt(k % 2 === 0 ? R : R * RATIO, k));
const fmt = (pts) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

const OUTLINE = fmt(starPoints(OUTER));
const INNER_STAR = fmt(starPoints(INNER));

export default function FacetStar({ active = false, className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="miter" strokeMiterlimit="10">
        <polygon points={OUTLINE} vectorEffect="non-scaling-stroke" />
        <polygon points={INNER_STAR} vectorEffect="non-scaling-stroke" fill={active ? 'currentColor' : 'none'} />
      </g>
    </svg>
  );
}
