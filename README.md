# FactCheckerExtension

**"Clippy" Fact Checker**
"Ein KI-Browserextension zur Faktenprüfung (mittels Google Gemini*). Markiere Text, füge Text bzw einen Screenshot von Text für Clippy ein und er prüft online, ob der Text die Wahrheit entspricht."

Funktionen:
- Text im Browser markieren und über das Kontextmenü (Rechtsklick) die „Truth Checking“-Funktion von Clippy aufrufen.
- Clippy jederzeit aufrufen und direkt auf seine Funktionen zugreifen. Texte aus der Zwischenablage oder sogar Bilder einfügen: Er extrahiert den Text aus dem Bild und überprüft ihn auf Fakten (hier können Sie ihm auch eigene Fragen stellen).

Architektur
- JavaScript-Erweiterungs-Shell für die Browser-Integration
- Clippy-Seitenleisten-UI auf Basis von Angular
- Backend mit Node.js: Gemini-API-Schlüssel, Prompt-Verarbeitung, JSON, Datenverarbeitung und Caching
- Textextraktion aus Bildern mittels Python und RapidOCR

KI-Verarbeitung
- Gemini* führt eine Vorverarbeitung der Eingabe durch:
- > Prüfung, ob es sich bei der Eingabe um einen Fakt, eine Meinung oder einen Witz handelt; Nicht-Fakten werden verworfen.
- > Normalisierung der Fakten zu präzisen Behauptungen – Recherche zu diesen Behauptungen.

Anderer KI-API Services können natürlich verwendet werden. Ein Gratis Version könnte zum Testen verwendet werden. 
Token Preise sind im Bild angegeben:
$/1 000 000 tokens
**EINGABE** - 0.75$ für Text
**AUSGABE** - 4.50$ für Text
**Google Suche** - 5000 kostenlose Suchanfragen pro Monat. 14$ pro 1000 weitere Anfragen.