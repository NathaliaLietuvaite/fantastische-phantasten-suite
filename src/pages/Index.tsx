
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { getRandomContent, combineContent, CategoryType } from "@/lib/content-generator";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [categoryContent, setCategoryContent] = useState<string>("");
  const [combinedContent, setCombinedContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const categories: { value: CategoryType; label: string }[] = [
    { value: "philosophy", label: "Philosophie" },
    { value: "technology", label: "Technologie" },
    { value: "art", label: "Kunst" },
    { value: "science", label: "Wissenschaft" },
    { value: "love", label: "Liebe" }
  ];

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value as CategoryType);
    setSelectedTerm("");
    setCategoryContent("");
    setCombinedContent("");
  };

  const handleTermSelect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTerm.trim()) {
      toast({
        title: "Bitte einen Begriff eingeben",
        description: "Um fortzufahren, geben Sie bitte einen Begriff ein.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulieren einer Datenbankabfrage mit setTimeout
    setTimeout(() => {
      try {
        if (selectedCategory) {
          const content = getRandomContent(selectedCategory, selectedTerm);
          setCategoryContent(content);
          
          const combined = combineContent(selectedTerm);
          setCombinedContent(combined);
        }
      } catch (error) {
        toast({
          title: "Fehler beim Laden der Inhalte",
          description: "Bitte versuchen Sie es später erneut.",
          variant: "destructive"
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
          Gedanken-Resonanz Interface
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Entdecke die faszinierende Verbindung zwischen Philosophie, Technologie, Kunst, Wissenschaft und Liebe durch zufällige Assoziationen.
        </p>
      </header>

      <main className="flex-grow px-4 py-6 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Wähle einen Bereich und einen Begriff</CardTitle>
              <CardDescription>
                Wähle einen der fünf Bereiche und gib einen Begriff ein, zu dem du Verbindungen entdecken möchtest.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTermSelect} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bereich auswählen:</label>
                  <RadioGroup 
                    value={selectedCategory || ""} 
                    onValueChange={handleCategorySelect}
                    className="flex flex-wrap gap-4"
                  >
                    {categories.map((category) => (
                      <div key={category.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={category.value} id={category.value} />
                        <label htmlFor={category.value} className="cursor-pointer">{category.label}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <label htmlFor="term" className="text-sm font-medium">Begriff eingeben:</label>
                  <div className="flex gap-2">
                    <input
                      id="term"
                      value={selectedTerm}
                      onChange={(e) => setSelectedTerm(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder={selectedCategory ? `Begriff aus ${categories.find(c => c.value === selectedCategory)?.label || selectedCategory} eingeben` : "Zuerst einen Bereich wählen"}
                      disabled={!selectedCategory}
                    />
                    <Button type="submit" disabled={!selectedCategory || isLoading}>
                      {isLoading ? "Lädt..." : "Generieren"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {categoryContent && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {categories.find(c => c.value === selectedCategory)?.label || selectedCategory}: {selectedTerm}
                </CardTitle>
                <CardDescription>
                  Zufälliger Inhalt aus dem gewählten Bereich
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert">
                  <p>{categoryContent}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {combinedContent && (
            <Card>
              <CardHeader>
                <CardTitle>Interdisziplinäre Verbindung</CardTitle>
                <CardDescription>
                  Eine Verbindung aller fünf Bereiche zum Begriff "{selectedTerm}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert">
                  <p>{combinedContent}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toast({
                      title: "Feedback gespeichert",
                      description: "Vielen Dank für dein Feedback zur Verbindung!",
                    });
                  }}
                >
                  Feedback geben
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <footer className="py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Inspiriert von der Studie über Nobelpreisträger und ihre künstlerischen Neigungen.</p>
        <p className="mt-1">Entwickelt für "Nathalia, die Wissenschafts-Elfe" — Verbindung von Wissen und Kreativität.</p>
      </footer>
    </div>
  );
};

export default Index;
