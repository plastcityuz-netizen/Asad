'use client';

import { DENSITIES, THICKNESSES, type Density, type Thickness } from '@/lib/data';

export function DensityPicker({
  value,
  onChange,
  name,
}: {
  value: Density;
  onChange: (d: Density) => void;
  name: string;
}) {
  return (
    <fieldset>
      <legend className="label">ZICHLIGI / PLOTNOST</legend>
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Variantlar">
        {DENSITIES.map((d) => (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={value === d}
            aria-label={`Zichlik ${d} kg/m³`}
            onClick={() => onChange(d)}
            className={`chip flex-1 basis-[74px] ${value === d ? 'chip-active' : ''}`}
            data-testid={`${name}-density-${d}`}
          >
            {d} kg/m³
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ThicknessPicker({
  value,
  onChange,
  name,
}: {
  value: Thickness;
  onChange: (t: Thickness) => void;
  name: string;
}) {
  return (
    <fieldset>
      <legend className="label">QALINLIGI</legend>
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Variantlar">
        {THICKNESSES.map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={value === t}
            aria-label={`Qalinlik ${t} santimetr`}
            onClick={() => onChange(t)}
            className={`chip flex-1 basis-[62px] ${value === t ? 'chip-active' : ''}`}
            data-testid={`${name}-thickness-${t}`}
          >
            {t} cm
          </button>
        ))}
      </div>
    </fieldset>
  );
}
