'use client';

import { useState } from 'react';

interface FiltersPanelProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  material: string[];
  priceRange: [number, number] | null;
  availability: string[];
  style: string[];
}

export default function FiltersPanel({ onFilterChange }: FiltersPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    material: [],
    priceRange: null,
    availability: [],
    style: [],
  });

  const materials = ['Teak', 'Walnut', 'Oak', 'Metal', 'Fabric'];
  const styles = ['Modern', 'Traditional', 'Scandinavian', 'Industrial'];

  const handleMaterialToggle = (material: string) => {
    setFilters((prev) => ({
      ...prev,
      material: prev.material.includes(material)
        ? prev.material.filter((m) => m !== material)
        : [...prev.material, material],
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-card">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      {/* Material */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Material</h4>
        <div className="space-y-2">
          {materials.map((material) => (
            <label key={material} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.material.includes(material)}
                onChange={() => handleMaterialToggle(material)}
                className="mr-2"
              />
              <span className="text-sm">{material}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Ready to Ship</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Made to Order</span>
          </label>
        </div>
      </div>

      {/* Style */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Style</h4>
        <div className="space-y-2">
          {styles.map((style) => (
            <label key={style} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">{style}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-neutral-200 text-neutral-800 py-2 rounded-md hover:bg-neutral-300 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}

