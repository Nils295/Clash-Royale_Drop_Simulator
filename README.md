# Clash-Royale_Drop_Simulator
# Magische Kiste — einfache Web-Demo

Dies ist eine minimale statische Website, die eine Kiste in der Mitte anzeigt. Klickst du die Kiste an, öffnet sich der Deckel und zufällige Gegenstände kommen heraus. Die Gegenstände kannst du später einfach austauschen.

Dateien:
- `index.html` — HTML-Basis
- `styles.css` — Styling / Animationen
- `script.js` — Logik: Kiste öffnen, Gegenstände spawnen

Anpassen der Gegenstände:
- Öffne `script.js`.
- Ersetze das Array `ITEMS` durch deine Wunsch-Namen (oder Objekte mit weiteren Daten, wenn du Icons, Tags oder Häufigkeiten hinzufügen willst).

Lokal testen:
1. Repository klonen / Dateien in einen Ordner legen.
2. Öffne `index.html` im Browser. (Für lokale Module/Fetch-Requests könnte ein kleiner HTTP-Server nötig sein; für diese reine Demo ist das nicht notwendig.)
   - Alternativ: `npx http-server .` oder `python -m http.server 8000`

Deployment:
- Du kannst die Seite einfach mit GitHub Pages hosten:
  - Neues Repository erstellen, Dateien pushen, und GitHub Pages in den Repo-Einstellungen aktivieren (Branch: `main`, Ordner: `/root`).

Weiterentwicklungsideen:
- Gegenstände als Bilder/Icons darstellen (statt nur Text).
- Seltene / häufige Gegenstände (Gewichtungen beim Zufallsziehen).
- Soundeffekte beim Öffnen.
- Konfiguration per JSON-Datei laden.
- Speichern/Loggen, welche Gegenstände bereits erschienen sind.

Wenn du möchtest, erstelle ich:
- eine Version mit Icons statt Text,
- eine Gewichtung (Seltenheit),
- oder ich pushe das ganze direkt in ein Neues GitHub-Repository und richte Pages ein (dazu bräuchte ich deinen OK, diesen Schritt zu machen).

Viel Spaß — sag mir, welche Gegenstände du später einfügen willst, oder welche Erweiterungen du möchtest.
