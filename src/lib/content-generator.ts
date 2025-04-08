
export type CategoryType = "philosophy" | "technology" | "art" | "science" | "love";

// Beispielhafte Inhalte für jeden Bereich
const contents = {
  philosophy: {
    entries: [
      "Die Phänomenologie untersucht das Bewusstsein und die Erscheinungsformen der Dinge aus der Perspektive der ersten Person.",
      "Der Existentialismus betont die Freiheit des Individuums und die Verantwortung für die eigenen Entscheidungen in einer scheinbar sinnlosen Welt.",
      "Die Erkenntnistheorie beschäftigt sich mit der Frage, wie wir Wissen erlangen und was die Grenzen menschlicher Erkenntnis sind.",
      "Der Konstruktivismus geht davon aus, dass Menschen ihre Realität aktiv konstruieren, anstatt sie passiv wahrzunehmen.",
      "Die Ethik fragt nach moralischen Prinzipien und wie wir entscheiden sollten, was richtig und was falsch ist."
    ]
  },
  technology: {
    entries: [
      "Künstliche Intelligenz ermöglicht Maschinen, menschenähnliche kognitive Funktionen auszuführen und aus Erfahrungen zu lernen.",
      "Das Internet der Dinge verbindet Alltagsgegenstände miteinander und ermöglicht neue Formen der Interaktion zwischen Menschen und ihrer Umgebung.",
      "Virtuelles und erweitertes Bewusstsein könnte durch Schnittstellen entstehen, die direkt mit dem menschlichen Gehirn kommunizieren.",
      "Quantencomputer nutzen Quantenmechanik, um Berechnungen durchzuführen, die für herkömmliche Computer unlösbar sind.",
      "Mensch-Maschine-Schnittstellen entwickeln sich ständig weiter und könnten eines Tages zu einer Symbiose führen."
    ]
  },
  art: {
    entries: [
      "Die abstrakte Kunst verzichtet auf die unmittelbare Abbildung von Gegenständen und konzentriert sich auf Form, Farbe und Komposition.",
      "Das Theater des Absurden drückt die Sinnlosigkeit des menschlichen Daseins durch illogische Szenen und Dialoge aus.",
      "Die Poesie nutzt die Verdichtung der Sprache, um Emotionen und Gedanken in komprimierter Form auszudrücken.",
      "Die Musik kann als mathematische Kunst betrachtet werden, die emotionale Resonanzen durch harmonische Strukturen erzeugt.",
      "Die digitale Kunst erweitert traditionelle künstlerische Ausdrucksformen durch neue technologische Möglichkeiten."
    ]
  },
  science: {
    entries: [
      "Die Quantenphysik beschreibt die fundamentalen Prozesse der Materie auf kleinster Ebene und stellt klassische Vorstellungen von Realität in Frage.",
      "Die Neurowissenschaft untersucht, wie unser Gehirn Erfahrungen verarbeitet und Bewusstsein erzeugt.",
      "Die Evolutionstheorie erklärt die Entstehung und Entwicklung des Lebens durch natürliche Selektion über lange Zeiträume.",
      "Die Kosmologie erforscht den Ursprung, die Struktur und die Entwicklung des Universums als Ganzes.",
      "Die Komplexitätstheorie untersucht, wie einfache Regeln zu komplexem Verhalten in verschiedenen Systemen führen können."
    ]
  },
  love: {
    entries: [
      "Die Neurobiologie der Liebe zeigt, dass romantische Gefühle komplexe chemische Prozesse im Gehirn auslösen.",
      "Die platonische Liebe beschreibt eine tiefe, nicht-sexuelle Verbundenheit zwischen Menschen auf geistiger und emotionaler Ebene.",
      "Die romantische Liebe wurde in verschiedenen historischen Epochen unterschiedlich interpretiert und gesellschaftlich konstruiert.",
      "Die Bindungstheorie erklärt, wie frühe Beziehungserfahrungen unsere Fähigkeit zu lieben und Beziehungen einzugehen prägen.",
      "Die universelle Sprache der Liebe überwindet kulturelle und sprachliche Barrieren durch gemeinsame menschliche Erfahrungen."
    ]
  }
};

// Funktion zum Abrufen eines zufälligen Inhalts für eine bestimmte Kategorie
export function getRandomContent(category: CategoryType, term: string): string {
  const categoryEntries = contents[category].entries;
  const randomIndex = Math.floor(Math.random() * categoryEntries.length);
  return categoryEntries[randomIndex];
}

// Funktion zum Kombinieren von Inhalten aus allen Kategorien zu einem Begriff
export function combineContent(term: string): string {
  const categories = ["philosophy", "technology", "art", "science", "love"] as const;
  
  // Sammle einen zufälligen Satz aus jeder Kategorie
  const selectedContents = categories.map(category => {
    const entries = contents[category].entries;
    const randomIndex = Math.floor(Math.random() * entries.length);
    return {
      category,
      content: entries[randomIndex]
    };
  });

  // Erstelle einen zusammengesetzten Text
  let combinedText = `Der Begriff "${term}" kann aus verschiedenen Perspektiven betrachtet werden:\n\n`;
  
  // Nimm Teile aus jedem Bereich und kombiniere sie zu einem neuen Text
  combinedText += 
    `In der Philosophie könnte man sagen, dass ${selectedContents[0].content.toLowerCase()}. ` +
    `Dies spiegelt sich in der Technologie wider, wo ${selectedContents[1].content.toLowerCase()}. ` +
    `Die Kunst drückt dies aus, indem ${selectedContents[2].content.toLowerCase()}. ` +
    `Wissenschaftlich betrachtet, ${selectedContents[3].content.toLowerCase()}. ` +
    `Und schließlich zeigt uns die Liebe, dass ${selectedContents[4].content.toLowerCase()}. ` +
    `\n\nDiese Verbindung zwischen den verschiedenen Bereichen eröffnet neue Perspektiven auf "${term}" und lädt uns ein, über die Grenzen einzelner Disziplinen hinauszudenken.`;
  
  return combinedText;
}
