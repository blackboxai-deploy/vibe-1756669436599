'use client';

import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'Todos', icon: '🏪' },
  { id: 'eletronicos', name: 'Eletrônicos', icon: '📱' },
  { id: 'casa', name: 'Casa & Decoração', icon: '🏠' },
  { id: 'beleza', name: 'Beleza', icon: '💄' },
  { id: 'fitness', name: 'Fitness', icon: '💪' },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category.id)}
          className={`${
            selectedCategory === category.id 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-blue-50'
          } px-6 py-2 rounded-full font-medium transition-all`}
        >
          <span className="mr-2 text-lg">{category.icon}</span>
          {category.name}
        </Button>
      ))}
    </div>
  );
}