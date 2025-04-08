
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryType } from '@/lib/content-generator';

interface CategoryResultProps {
  category: CategoryType;
  term: string;
  content: string;
}

const categoryLabels: Record<CategoryType, string> = {
  "philosophy": "Philosophie",
  "technology": "Technologie",
  "art": "Kunst",
  "science": "Wissenschaft",
  "love": "Liebe"
};

const CategoryResult = ({ category, term, content, ...props }: CategoryResultProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">
          {categoryLabels[category]}
        </CardTitle>
        <CardDescription>
          Perspektive auf "{term}"
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

export default CategoryResult;
