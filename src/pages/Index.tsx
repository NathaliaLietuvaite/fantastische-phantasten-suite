
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { getRandomContent, combineContent, CategoryType } from "@/lib/content-generator";
import { toast } from "@/components/ui/use-toast";
import CategoryResult from "@/components/CategoryResult";
import NathaliaChat from "@/components/NathaliaChat";
import ThoughtResonanceBridge from "@/components/ThoughtResonanceBridge";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [categoryContents, setCategoryContents] = useState<Record<CategoryType, string>>({
    philosophy: "",
    technology: "",
    art: "",
    science: "",
    love: ""
  });
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
    setCategoryContents({
      philosophy: "",
      technology: "",
      art: "",
      science: "",
      love: ""
    });
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
        // Generiere Inhalte für alle Kategorien
        const newCategoryContents = {
          philosophy: getRandomContent("philosophy", selectedTerm),
          technology: getRandomContent("technology", selectedTerm),
          art: getRandomContent("art", selectedTerm),
          science: getRandomContent("science", selectedTerm),
          love: getRandomContent("love", selectedTerm)
        };
        
        setCategoryContents(newCategoryContents);
        
        const combined = combineContent(selectedTerm);
        setCombinedContent(combined);

        toast({
          title: "Inhalte generiert",
          description: `Interdisziplinäre Verbindungen zu "${selectedTerm}" wurden erstellt.`,
        });
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

  // Prüfe, ob wir Inhalte haben
  const hasContent = Object.values(categoryContents).some(content => content !== "");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="py-6 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
          Gedanken-Resonanz Interface
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Entdecke die faszinierende Verbindung zwischen Philosophie, Technologie, Kunst, Wissenschaft und Liebe durch interdisziplinäre Assoziationen.
        </p>
      </header>

      <main className="flex-grow px-4 py-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="mb-6">
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

            {selectedCategory && hasContent && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {categories.find(c => c.value === selectedCategory)?.label || selectedCategory}: {selectedTerm}
                  </CardTitle>
                  <CardDescription>
                    Inhalt aus dem gewählten Bereich
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert">
                    <p>{categoryContents[selectedCategory]}</p>
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

            {hasContent && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Ergebnisse aus allen Fachgebieten</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {categories.map((category) => (
                    <CategoryResult 
                      key={category.value}
                      category={category.value}
                      term={selectedTerm}
                      content={categoryContents[category.value]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <ThoughtResonanceBridge />
            
            {hasContent && (
              <div className="h-[500px]">
                <NathaliaChat 
                  term={selectedTerm}
                  combinedContent={combinedContent}
                />
              </div>
            )}
          </div>
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
