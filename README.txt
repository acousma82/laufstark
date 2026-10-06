LAUFSTARK - selbst gehostete Trainings-App (PWA)

GitHub-Repository: https://github.com/acousma82/laufstark
GitHub-Pages-Adresse nach erfolgreichem Deployment: https://acousma82.github.io/laufstark/
Kein Backend, keine Datenbank, keine npm-Abhängigkeiten, kein Build nötig.
HTML + CSS + JavaScript. Alle Laufzeitdateien liegen in diesem Verzeichnis.

DEPLOYMENT
1. Das gesamte Verzeichnis auf einen statischen HTTPS-Webserver kopieren.
   Beispiel-Ziel: https://deine-domain.de/laufstark/
2. Den abschließenden Slash verwenden; /laufstark soll auf /laufstark/ umleiten.
3. index.html als Verzeichnisindex ausliefern.
4. sw.js als JavaScript ausliefern (text/javascript oder application/javascript).
   manifest.webmanifest: application/manifest+json oder application/json.
5. Kein Rewrite nötig. Bei fehlenden Dateien einen echten 404 zurückgeben.
   Kein HTML-Fallback für fehlende JavaScript-Dateien.
6. Empfohlen: Cache-Control: no-cache für HTML, JS und das Manifest.
   Der Service Worker verwaltet den Offline-Cache selbst.

Nginx, Apache, Caddy oder normaler Webspace funktionieren. Root und Unterpfad
sind möglich. Die relativen Pfade müssen zusammenbleiben. Die App besitzt
keine eingebaute Anmeldung. Die Dateien sind für jeden mit Serverzugriff
lesbar. Trainingsprotokolle werden nicht an den Server übertragen.

GITHUB PAGES
- Dateien inklusive .nojekyll in den Root eines Repositories oder nach docs/.
- Settings > Pages: passenden Branch und Ordner als Quelle auswählen.
- Anschließend die dort angezeigte HTTPS-Adresse öffnen.
- Keine persönlichen Sicherungsdateien in das Repository aufnehmen.

LOKAL TESTEN
Im entpackten Verzeichnis:
  python3 -m http.server 8080
Dann am Computer:
  http://localhost:8080/
Eine HTTP-LAN-IP auf dem iPhone ist kein Ersatz für HTTPS; darüber wird der
Service Worker nicht aktiviert. Für den iPhone-Test echtes HTTPS verwenden.

AUF DEM IPHONE
1. HTTPS-Adresse in Safari öffnen.
2. Teilen > Zum Home-Bildschirm; falls vorhanden: Als Web-App öffnen aktivieren.
3. Neues Laufstark-Symbol öffnen und auf "Offline bereit" warten.
4. Danach funktionieren Plan, Eingaben und Pausenuhr auch offline.
   Videos bleiben externe Links und benötigen Internet.

DATEN
- Speicherung unter localStorage-Schlüssel laufstark-v1.
- Kein Account, kein Geräteabgleich, kein Server-Upload der Trainingsdaten.
- Unter Verlauf: Sicherung herunterladen / Sicherung einlesen.
- Browser und installierte Web-App können getrennte Datenspeicher nutzen.
- Beim Domainwechsel Sicherung exportieren und am neuen Ort importieren.
- Browserdaten löschen oder App entfernen kann Einträge und Offline-Cache löschen.
- Die Pausenuhr garantiert bei gesperrtem Bildschirm keinen Alarm.

UPDATES
- Bei Änderungen an App-Dateien auch die Versionskennung in sw.js ändern.
- Alle Dateien gemeinsam deployen, vorzugsweise atomar.
- Neues Release einmal online aufrufen, dann alle App-Fenster schließen
  und erneut öffnen. Neue Worker warten bewusst auf diesen Neustart.
- Verlauf bleibt erhalten; Updates löschen ausschließlich alte App-Caches.

NATIVE IOS-APP
Die PWA benötigt keine Apple-Developer-Mitgliedschaft und keine Signierung.
Eine native App oder ein WKWebView-Wrapper wäre ein separates Xcode-Projekt.
Bei einem Wrapper müssen insbesondere Import/Export und persistenter Speicher
für iOS angepasst werden; die HTML-Datei allein ist keine installierbare IPA.

QUELLEN
Apple: https://support.apple.com/de-de/guide/iphone/iphea86e5236/ios
PWA/HTTPS: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable

KONKRETER WEG ÜBER GITHUB PAGES
1. Auf GitHub ein neues Repository namens laufstark anlegen.
   Mit GitHub Free muss dieses Repository für Pages öffentlich sein.
2. Die Dateien aus diesem Ordner in den Repository-Root hochladen, sodass
   index.html direkt im Root liegt, nicht erst in einem weiteren Unterordner.
   Alternativ im entpackten Ordner per Git initialisieren und pushen:
     git init -b main
     git add .
     git commit -m "Add Laufstark training PWA"
   Für dieses Projekt lautet die Remote-URL:
   https://github.com/acousma82/laufstark.git
3. Settings > Pages > Build and deployment:
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   Save
4. Deployment abwarten und die unter Pages angezeigte Adresse öffnen.
   Übliches Format: https://acousma82.github.io/laufstark/
5. Auf dem iPhone in Safari öffnen und zum Home-Bildschirm hinzufügen.

VERIFIKATION DIESER VERSION
- Unterpfad /laufstark/ lokal geprüft.
- Service Worker installierte alle acht Laufzeitdateien.
- Webserver beendet: anschließender Reload und Übungswechsel funktionierten.
- Ein direkter Test auf einem physischen iPhone steht aus.
