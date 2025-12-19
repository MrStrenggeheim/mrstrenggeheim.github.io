---
title: Technik & Recht
subtitle: "A practical introduction to denoising diffusion probabilistic models and their application in medical imaging."
type: blog
tags: [IT]
thumbnail: /assets/thumbnails/placeholder.png
author: Florian Hunecke
date: 2021-08-02
---

<!-- ---
title: "Technik & Recht"
author: "Florian Hunecke"
date: 2021-08-02
output:
  html:
    standalone: true
    # output: test.html -> unnesseccary bec task 
    include-in-header:
      - C:\\Users\\Florian\\AppData\\Roaming\\pandoc\\reference.html
    toc: true 
    toc-depth: 2
    number-sections: true
  latex:
    standalone: true
    # output: test.pdf
    include-in-header:
      - C:\\Users\\Florian\\AppData\\Roaming\\pandoc\\reference.html
    toc: true
--- -->

# Einleitung

# Grundlagen zivilrechtlicher Haftung

## Grundsätzliches

### Schuld
> Auf der Prüfungsstufe der **Schuld** wird gefragt, ob dem Täter die Tat persönlich vorgeworfen werden kann.

Die Schuld ist bspw. ausgeschlossen (und Täter damit nicht strafbar), wenn der Täter noch Kind ist oder zur Zeit der Tat infolge extremen Alkoholkonsums kein Unrechtsbewusstsein hat.


### Schuldverhältnis
> Unter einem **Schuldverhältnis** (SchV) versteht man ein Rechtsverhältnis zwischen mindestens zwei Personen, nach dem eine Person (_Gläubiger_) von einer anderen person (_Schuldner_) (mindestens) eine Leistung verlangen kann.

#### Unterschied
- **vertragliches** Schuldverständnis:
    Ein zwischen den Parteien geschlossener Vertrag stellt die Grundlage der Haftung dar
- **gesetzliches** Schuldverständnis
    Haftung ergibt sich unabhängig von einer Sonderverbindung kraft Gesetzes

### Leistungsstörungen
Regelfall: ordnungsgemäße Erfüllung des Schuldverhältnisses $\rightarrow$ Verhältnis erlischt.



> Nichterfüllung der Leistung $\rightarrow$ Pflichtverletzung (PfV)

[§ 280 BGB](https://www.gesetze-im-internet.de/bgb/__280.html) ist zentrale Anspruchsgrundlage für Schadensersatz bei PfV im Rahmen von vertraglichen SchV. 
Verletzt der Schuldner eine Pflicht aus einem SchV und hat er dies zu vertreten, so muss er dem Gläubiger den entstandenen Schaden ersetzen.

### Verantwortlichkeit des Schuldners
> Schadensersatzanspruch wg. PfV nach [§ 280 BGB](https://www.gesetze-im-internet.de/bgb/__280.html) setzt u.a. voraus, dass der Schuldner sein Handeln zu vertreten hat. 

$\rightarrow$ **Verschuldensprinzip** als Grundprinzip zivilrechtlicher Haftung.

Zu vertreten hat der Schuldner Vorsatz und Fahrlässigkeit, wenn eine strengere oder mildere Hafrung weder bestimmt noch anderweitig (z.B aus einer Garantie) zu entnehmen ist, [§ 276 BGB](https://www.gesetze-im-internet.de/bgb/__276.html).

Nach [§ 280 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__280.html) wird das Vertretenmüssen des Schuldners vermutet, d.h. er muss Umstände beweisen, aus denen sich Nichtvertretenmüssen ergibt.

### Vorsatz
> **Vorsatz** ist das _Wissen_ und _Wollen_ des _rechtswidrigen Erfolgs_.

Möglichkeit eines Schadens bei Handlung wird erkannt und billigend in Kauf genommen oder sogar angestrebt.
Solche Verhaltensweisen eher im kriminellen Kontext erwartet. Unter normalem unternehmerischen Tuns eher Haftung wegen fahrlässiger Schadensverursachung.

### Fahrlässigkeit
> **Fahrlässig** handelt, wer die im Verkehr erforderliche _Sorgfalt_ außer Acht lässt ([§ 276 Abs. 2 BGB](https://www.gesetze-im-internet.de/bgb/__276.html)). 

Fahrlässig handelt somit:

- wer den rechtswidrigen Erfolg (Schaden) zwar _voraussieht_, aber hofft, er werde nicht eintreten (sog. bewusste Fahrlässigkeit, _luxuria_)
- wer den Erfolg nicht voraussieht, ihn aber bei Anwendung der _verkehrsüblichen Sorgfalt_ hätte voraussehen können (unbewusste Fahrlässigkeit, _negligentia_)


Voraussetzung: Gefahr wäre bei gebotener Sorgfalt vorhersehbar und deren Verwirklichung vermeidbar gewesen


### Vorhersehbarkeit der Gefahr und Vermeidbarkeit ihrer Verwirklichung

> Die **Vorhersehbarkeit** besteht im tatächlichen und rechtlichen Sinne:
> 
> - In tatsächlicher Hinsicht hätte der Verkehrsteilnehmer ohne nennenswerte gesonderte Anstrengungen die Gefahr erkennen können
> - in rechtlicher Hinsicht wird im Grundsatz das Wissen um die jeweils einschlägigen Rechtsnormen vorausgesetzt.

Die **Vermeidungspflicht** richtet sich nach Umständen es Einzelfalles und endet erst dann, wenn der Betreffende zu sorgfältigem Handeln _nicht fähig_ ist oder es ihm _nicht zuzumuten_ ist.

#### Vorhersehbarkeit bei außergewöhnlichen Umständen
Problematisch wird Haftung für Schäden, die von Maschinen verursacht werden, wenn die Maschine zuerst problemlos funktioniert hat, es jedoch durch eine unglückliche Verkettung von außergewöhnlichen Umständen zu einem Schaden kommt.


#### Beispiel
> Industrieroboter funktioniert jahrelang problemlos. Während Fabrikführung nähert sich Kind der Maschine, wird vom Roboterarm erfasst und verletzt.

Mit derartigen Fällen konnte weder Hersteller noch Benutzer der Maschine rechnen. Der Schaden war nicht vorhersehbar, weshalb keine Fahrlässigkeit vorzuwerfen ist. Möglich erscheint aber eine Haftung der für die Führung zuständigen Person, sofern diese sorgfalswidrig handelte.


### Besondere Anforderungen an die Fahrlässigkeit

- **Grobe Fahrlässigkeit**: 
    Verletzung der erforderlichen Sorgfalt in besonders hohem Maße ( einfachste, jedem einleuchtende Überlegungen nicht angestellt)
- **Verstoß gegen die Sorgfalt**, 
    die der Schuldner in eigenen Angelegenheiten anzuwenden pflegt (_diligentia quam in suis_): $\rightarrow$ Befreiung des Schuldners von der Haftung wegen leichter Fahrlässigkeit

### Verschuldensfähigkeit
Ein schuldhaftes Handlen setzt zudem voraus, dass der Handelnde verschuldensfähig (_deliktsfähig_) ist.

> **Nicht verschuldungsfähig** sind _Kinder unter sieben Jahren_ und Personen, die in einem _Zustand der Bewusstlosigkeit_ oder in einem die freie Willensbestimmung ausschließenden _Zustand krankhafter Störung_ der Geistestätigkeit gehandelt haben, [§ 828 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__828.html).
> 
> **Beschränkt verschuldensfähig** sind Kinder und Jugendliche _zwischen dem 7. und dem 18. Lebensjahr_, die bei Begehung der Pflichtverletzung zur Erkenntnis der Verantwortlichkeit die erforderliche einsicht hatten (_Einsichtsfähigkeit_), [§ 828 Abs. 2 BGB](https://www.gesetze-im-internet.de/bgb/__828.html).

#### Haftung für fremdes Verschulden
Dem Schuldner wird nicht nur eigenes, sondern auch das Verschulden der **Hilfspersonen** (sog. _Erfüllungsgehilfen_) deren sich der Schuldner zur Erfüllung seiner Verbindlichkeiten bedient (z.B. Angestellte), und seiner **gesetzlichen Vertreter** zugerechnet, [§ 278 BGB](https://www.gesetze-im-internet.de/bgb/__278.html).

#### Haftung ohne Verschulden
> In ausdrücklich geregelten Fällen haftet der Schuldner auch _ohne Verschulden_ allein für einen eingetretenen rechtswidrigen Erfolg (z.B. Haftung des Frachtführers, Übernahme einer Garantie).

Eine Haftung ohne Verschulden bringen ferner die verschiedenen Fälle der **Gefährdungshaftung**.

### Arten von Pflichten
Die Pflichten aus einem Schuldverhältnis ergeben sich aus vertraglichen Vereinbarungen und aus Gesetz.
Das Schuldrecht unterscheidet zwei Arten von Pflichten:

- den **leistungsbezogen**, die sich auf die ordnungsgemäße Erfüllung und die Absicherung der vertraglichen oder gesetzlichen Ansprüche beziehen, und
- den **nicht leistungsbezogenen** Pflichten (Schutz der Rechtsgüter und Interessen der Vertragspartner außerhalb der Leistungsbeziehungen).

Die vertraglichen **Hauptpflichten** sind immer _leistungsbezogen_ (z.B. schuldet der Käufer beim Kaufvertrag die Zahlung des Kaufpreises).

Je nach Grund der Pflichtverletzung wird zwischen _Unmöglichkeit_, _Verzug_ und _Schlechtleistung_ der vertraglichen Hauptpflicht unterschieden.

**Nebenpflichten** können sowohl 

- leistungsbezogen (z.B. Aufklärung über die Bedienung des Kaufgegenstandes) als auch
- nicht leistungsbezogen (z.B. Verpflichtung des Verkäufers, das Eigentum des Käufers sorgfältig zu behandeln) sein.


### Schadensersatz
#### Schadensersatz statt und neben der Leistung
Unterschiedliche Rechtsfolgen je nach Art der Pflichtverletzung:

- Verletzung von **Nebenleistungspflichten**: 
    Schadensersatz kann _neben_ dem Erfüllungsanspruch geltend gemacht werden (_Schadensersatz neben der Leistung_)
- Verletzung von **Hauptleistungspflichten**: 
    Schadensersatz _anstelle_ der Erfüllung (_Schadensersatz statt der Leistung_)
- Alternativ: Ersatz _vergeblicher Aufwendungen_ (z.B. Notarkosten) kann geltend gemacht werden

#### Schadensersatz wegen Schlechterfüllung
> Eine **Schlechtleistung** liegt vor, wenn die Leistung (teilweise) nicht der vereinbarten Qualität entspricht.


### Kaufrechtliche Gewährleistung
[§ 437 BGB](https://www.gesetze-im-internet.de/bgb/__437.html) (als zentrale Vorschrift des kaufrechtlichen Mängelrechts) fasst Rechte des Käufers zuammen: 

> Nacherfüllung, Rücktritt, Minderung, Schadensersatz und Aufwendungsersatz.

Die Gewährleistung ist unabhängig davon, ob den Verkäufer ein Verschulden trifft oder nicht.

Der Endverbraucher einer mangelhaften Maschine kann somit Mängelrechte gegenüber dem Verkäufer geltend machen, wenn sich dieser - wie es dem Normalfall entsprechen dürfte - zur Lieferung einer sicheren Maschine Verpflichtet hat.

Für die Ansprüche müssen zunächst immer ein _Kaufvertrag_ ([§ 433 BGB](https://www.gesetze-im-internet.de/bgb/__433.html)) und ein _Mangel_ (§§ 434, 435) vorliegen.


### Mangel
> Ein Mangel ist dann gegeben, wenn die **Ist**-Beschaffenheit der _Sache_ (jeder körperliche Gegenstand, [§ 90 BGB](https://www.gesetze-im-internet.de/bgb/__90.html)) von ihrer **Soll**-Beschaffenheit abweicht.

Die Sache muss also im Zeitpunkt ihrer Übergabe die _vereinbarte Beschaffenheit_ oder wenn nicht vereinbart die gewöhnlich vorausgesetzte Eigenschaft aufweisen.

Eigenschaften Ergeben sich aus Beschreibungen, Prospekten oder Mustern ergeben.


### Unerlaubte Handlung
> Als **unerlaubte Handlung** - auch _Deliktsrecht_ genannt - wird der widerrechtliche Eingriff in ein vom Gesetz geschütztes Rechtsgut bezeichnet, durch den ein Schaden eingetreten ist.
> Geschädigte hat Schadensersatzanspruch wenn einer der Tatbestände von §§ 823 ff. BGB erfüllt.

Dabei gilt Grundsatz, dass nur rechtswidrige und schuldhafte Verletzungen der im Gesetz bezeichneten Rechte und Rechtsgüter eine Haftung begründen kann.

$\rightarrow$ Verschuldensprinzip aufgegeben $\rightarrow$ Gefährdungshaftung


### Verschuldenshaftung
Wichtigste Tatbestände:

- der an der Spitze des Deliktrechts stehende [§ 823 BGB](https://www.gesetze-im-internet.de/bgb/__823.html), welcher als Anknüpfspunkt
    1. die Verletzung eines **besonderen Rechtsguts** voraussetzt (Leben, Körper, Gesundheit, ...) voraussetzt, oder
    2. die Verletzung eines **Schutzgesetzes** (jede Rechtsnorm) voraussetzt.
- die vorsätzliche _sittenwidrige Schädigung_ ([§ 826 BGB](https://www.gesetze-im-internet.de/bgb/__826.html))


### Anwendugnsfall des [§ 823 BGB](https://www.gesetze-im-internet.de/bgb/__823.html)
Nach [§ 823 BGB](https://www.gesetze-im-internet.de/bgb/__823.html) kann jeder in Haftung genommen werden, der vorsätzlich oder fahrlässig eine Ursache gesetzt hat, dass ein Schaden aufgetreten ist.

#### Beispiel
Hätte der Hersteller die Maschine nicht produziert $\rightarrow$ kein Schaden $\rightarrow$ kann zu Schadensersatz verpflichtet sein, falls er es voraussehen konnte oder in Kauf gebommen hat, dass Einsatz Schaden bewirken würde. Selbes gilt für den Programmierer. Sogar der Verkäufer kann im Verhältnis zum Endverbraucher zusätzlich zu einer Haftung aus Vertragsverhältnis ([§ 437 BGB](https://www.gesetze-im-internet.de/bgb/__437.html)) nach [§ 823 BGB](https://www.gesetze-im-internet.de/bgb/__823.html) haften.

### Grundschema der verschuldensabhängigen Deliktstatbestände
>Die verschuldensabhängigen Delikttatbestände haben ein gemeinsames Grundschema, nach dem ihr Vorliegen geprüft wird: 
> 
> Tatbestand, Rechtswidrigkeit, Verschulden, Schaden.

- Der **Tatbestand** setzt voraus:
    1. Handlung (jedes vom Willen beherrschbare menschliche Verhalten, also Tun oder Unterlassen)
    2. Rechtsgutsverletzung (Leben, Körper, Gesundheit, Freiheit, sonstiges Recht)
    3. Haftungsbegründete Kausalität (Zusammenhang zwischen Handlung und Rechtsgutsverletzung)
- Die [**Rechtswidrigkeit**](#rechtswidrigkeit) setzt voraus, dass die Tat im Widerspruch zur Rechtsordnung steht.
- Im Rahmen des **Verschuldens** ([Vorsatz](#vorsatz), [Fahrlässigkeit](#fahrlässigkeit)) geht es um die individuelle Zurechnung der Tat.

### Fallbeispiel
> A kauft bei B eine mangelhafte Maschine, die aufgrund ihrer Mangelhaftigkeit den A am Arm verletzt.

Frage: Steht dem A ein verschuldensabhängiger Schadensersatzanspruch aus [§ 823 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__823.html) zu? 

- Tatbestand: 
  - Handlung: Verkauf von B
  - Rechtsgrundverletzung: Verletzung von A
  - Haftungsbegründete Kausalität: ohne Verkauf keine RG-Verletzung
- Rechtswidrigkeit: 
  - Tat steht nicht im Widerspruch zur Rechtsordnung
- Zurechnung der Tat: keine weil Mangelhaftigkeit nicht erkannt


### Eigentumsverletzung [§ 823 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__823.html)
> Eigentumsverletzung können auch Schäden am fehlerhaften Produkt selbst sein. Zu ersetzen sind nur Schäden, die nicht "**stoffgleich**" mit dem Mangelunwert des fehlerhaften Einzelteils sind. 

Als nicht stoffgleich und damit ersatzfähig können z.B. Schäden angesehen werden, die aufgrund eines Softwarefehlers entstehen.

Wird also durch einen Softwarefehler ein Schaden an einem automatisiert parkenden Fahrzeug selbst verursacht, können Schadensersatzansprüche des Fahrzeugeigentümers gegen den Hersteller aus deliktischer Produzentenhaftung ([§ 823 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__823.html)) bestehen.

### Produzentenhaftung
> Befasst sich mit **Haftung des Herstellers** für Folgeschäden aus Benutzung seines _fehlerhaften Produkts_.

(Betrifft z.B. Verhältnis zw. Hersteller und Benutzer eines autonom. Geräts oder geschädigtem Dritten)

Die Produzentenhaftung stellt einen Fall der Verschuldenshaftung gem. [§ 823 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__823.html) dar und ist von der verschuldensunabhängigen Gefährungshaftung nach dem Produkthaftungsgesetz abzugrenzen.

### Verkehrssicherungspflichten
Bei der Produzentenhaftung stellt das _Inverkehrbringen_ eines fehlerhaften Produkts den Haftungsgrund dar.

Es existieren folgende Arten von Produktfehlern:

- Konstruktions-,
- Fabrikations-,
- Instruktions-,
- Produktbeobachtungsfehler.

Durch das Inverkehrbringen trotz eines solchen Fehlers liegt eine Verletzung von sog. **Verkehrssicherungspflichten** vor.

$\Rightarrow$ Betrieb so organisieren, dass genannte Fehler möglichst ausgeschaltet oder durch Kontrollen entdeckt.

> **Konstruktionspflicht**: Produkt muss so konstruiert sein, dass der durchschnittliche Benutzer gefahrlos verwenden kann

> **Fabrikationspflicht**: Organisation des Ablaufs der Fertigung durch moderne Prüfverfahren und Qualitätssicherungssysteme

> **Instruktionspflicht**: notwendige Hinweise und Warnungen

> **Produktbeobachtungspflicht**: Zubehör auf Gefahren bei Verwendung mit Produkt untersuchen

Hersteller haftet nur, wenn ihn ein Verschulden trifft (welches jedoch vermutet wird).


### Gefährdungshaftung
> Moderne Gesellschaft macht neben Verschuldenshaftung weitere Haftungstypen notwendig. Durch zunehmende Technisierung steigt Zahl der Verhaltensweisen, welche potentiell gefährlich sind, aufgrund ihrer Nützlichkeit aber nicht verboten werden sollen.

Derartige Risiken regelmäßig mit **Gefährdungshaftung** belegt, bei welcher unabhängig von einem etwaigen Verschulden für eine erlaubte Gefahr gehaftet wird.

$\Rightarrow$ Schadensersatzpflicht, die kein Verschulden voraussetzt, da Ersatzpflichtiger bei erlaubten Tätigkeiten unvermeidlich gewisse Gefährdung der Umgebung herbeiführt (Halten eines Tieres, Führung eines Flugzeugs).

Welche Verhaltensweisen mit einer Gefährdungshaftung belegt werden, ist Entscheidung des Gesetzgebers. Aus Rechtssicherheitsgründen gilt das sog. **Enumerationsprinzip**.

Wer weiß, in welchen Bereichen er womöglich verschuldensunabhängig haften muss, kann entscheiden, ob er dort tätig werden möchte und sich ggfs. durch Versicherungen schützen.


#### Beispiel: Straßenverkehr
Der _Halter_ eines Fahrzeugs tut nichts Verbotenes, sein Fahrzeug stellt aber eine _potentielle Bedrohung_ für geschützte Rechtsgüter dar. 

Der Halter eines PKW **haftet** daher gem. § 7 Abs. 1 StVG **verschuldensunabhängig**, wenn es bei dessen Betrieb zu Schaden kommt.

Nach ausgleichender Gerechtigkeit muss der, der eine Gefahrenquelle schafft, unterhält oder nutzt für damit verbundenen Schaden aufkommen.

#### Begrenzung der Gefährdungshaftung
Damit ausgleichende Gerechtigkeit nicht ins Gegenteil verkehrt, bedarf es Begrenzung der Gefährdungshaftung (je nach Gesetz unterschiedlich ausgestaltet):

- die Betriebsgefahr muss sich beispielsweise im Schaden realisieren (innerer Zusammenhang zwischen Schaden und Gefahrenquelle)
- Haftungsausschluss bei höherer Gewalt (betriebsfremdes, unvorhersehbares und unabwendbares Ereignis)
- Haftungsbegrenzung auf Personen- und Körperschaden
- gewisse Höchstbeträge.


### Haftung nach dem Produkthaftungsgesetz
> Das **ProdHaftG** regelt eine _verschuldensunabhängige_ Haftung für Körper-, Gesundheits- und Sachschäden, die infolge eines _fehlerhaften (Teil-)Produkts_ hervorgerufen wurden.

Im Falle der Sachbeschädigung gilt dies nur gegenüber einem privaten Verbraucher und soweit eine andere Sache als das fehlerhafte Produkt beschädigt wird, § 1 Abs. 1 ProdHaftG.

#### Fehlerhaftigkeit des Produkts
> Ein Produkt ist **fehlerhaft**, wenn es nicht die berechtigterweise von einem _durchschnittlichen_ Benutzer zu erwartende _Sicherheit_ bietet.

#### Begriff des Herstellers
Als Hersteller gilt nach § 4 ProdHaftG

- derjenige, der das End- oder Teilprodukt produziert
- derjenige, der seinen Namen oder seine Marke auf dem Produkt anbringt
- derjenige, der das Produkt in den euroräischen Wirtschaftsraum einführt (Importeur)
- der Händler, wenn die vorher genannten Hersteller nicht feststellbar sind.


#### Haftungsausschluss 
>Die Ersatzpflicht des Herstellers ist jedoch **ausgeschlossen**, wenn er nachträglich exkulpieren kann. 

$\Rightarrow$ Nachweis, dass sein Produkt dem aktuellen Stand der Technik entsprach und er seine sonstigen Pflichten bei Konstruktion, Produktion und Instruktion des Nutzers nicht vernachlässigt hat. 

Besondere Bedeutung kommt besitzt eine angemessene Dokumentation aller relevanten Abläufe. Können im Falle eines Verfahrens Nachgewiesen werden.


#### Haftungsdetails
- Der **Haftungshöchstbetrag** für Personenschäden (Heilungskosten, Erwerbsausfall, usw.) beträgt _85 Mio Euro_ (§ 10 ProdHaftG) 
- Die **Selbstbeteiligung** des Geschädigten bei Sachschäden beträgt _500 Euro_ (§ 11 ProdHaftG)
- Der **Schadensersatzanspruch** verjährt in _3 Jahren_ ab Kenntnis (oder fahrlässiger Ungkenntnis) des Geschädigten von Fehler, Schaden und Ersatzverpflichteten
- Der **Ersatzanspruch** erlischt innerhalb von _10 Jahren_ nachdem das Produkt in den Verkehr gebracht worden ist

####   Zweck des ProdHaftG
> **Vermeidung von Wettbewerbsverfälschungen** durch unterschiedliche Haftungsregeln in europäischen Mitgliederstaaten.

Ziel: den _freien Warenverkehr_ auf europäischer Ebene fördern und den Verbraucherschutz bei Produktfehlern stärken



## Herausforderungen durch die Autonomik

Im Zivilrecht viele Fragen, deren Beantwortung Auswirkung auf rechtliche Bewertung (teil-) autonomer Systeme haben.

Insbesondere Fragen der erforderlichen Sorgfaltsmaßstäbe sind kaum gesetzlich ausgestaltet, welhalb _Grauzonen_ existieren.

In diesen Fällen für Hersteller/Entwickler wichtig, sich über mögliche Gefahren und haftungsauslösende Konstellationen zu _informieren_ und dies zu _dokumentieren_. 

Im Falle einer Haftung kann er so nachweisen, sich schon im Vorfeld möglicher Schadensfälle mit den Gefahren und deren Verhütung _auseinandergesetzt_ zu haben.

### Fahrlässigkeit
Fahrlässigkeitsmaßstäbe des Zivilrechts nicht auf flexible, lernende Geräte ausgerichtet. Welche "Handlungen" eines Geräts auf Benutzer, Hersteller oder Entwickler zurückvollzogen werden können muss in langem Prozess geklärt werden.

Schutz der Produzenten vor solchen Haftungsfällen: umfassende Dokumentation des Entwicklungs- und Herstellungsprozesses.

Ermöglicht Nachweis, alle vernünftigerweise zu prüfenden Gefahrenszenarien untersucht zu haben.

### Produkthaftung
Probleme: Z.B. der **Produktbegriff** des § 2 ProdHaftG setzt grundsätzlich eine _Sache_ voraus, also nach [§ 90 BGB](https://www.gesetze-im-internet.de/bgb/__90.html) einen _körperlichen_ Gegenstand. 

$\Rightarrow$ Können _nicht-körperliche_ Arbeitsergebnisse "**Produkte**" i.S.d. Produkthaftungsrechts sein?

Zudem Einschränkungen des _Fehlerbegriffes_ bei _Software_ diskutieren. Auch Fehlerkategorien der Produkt- und Produzentenhaftung müssen untersucht werden, ob auf automatisierte Systeme anwendbar.

### Haftung der Maschine selbst
> Bisherige Rechtslage: Maschine kann (wegen durch sie verursachte Schäden) nicht in Anspruch genommen werden. Ihr _fehlt_ die **Haftungsvoraussetzung** "_Qalität als Person_" und somit die **Schuldfähigkeit**. 

Haftungsfähig ist im Recht vor allem der natürliche Mensch. 
Allerddings aus praktischen Bedürfnissen im BGB auch Kollektive als sog. "juristische Personen" anerkannt.

Dies zeigt: Personenbegriff ist nicht statisc, sondern kann unter Umständen auch erweitert werden.

Außerdem: das deutsche Zivilrecht kennt bislang keinen Vertragsschluss durch autonome Geräte oder Softwareagenten. Es ist davon auszugehen, dass dies mit zunehmendem Automatisierungsgrad (z.B. Bestellung durch Kühlschrank) weiter an Bedeutung gewinnt.




## Relevante Urteile

::: definition
BGH (1968):

\(1) Wird Person durch fehlerhaftes Produkt beschädigt, so muss Hersteller beweisen, dass ihn kein Verschulden trifft. \
\(2) Bei Nichterbringung eines Beweises haftet Hersteller nach Deliktsgrundsätzen (§§ 823 ff.).
:::

::: definition
BGH (2006):

Eine auf Datenträger verkörperte Software ist als bewegliche Sache anzusehen $\rightarrow$ je nach vereinbarten Überlassungsform Miet- oder Kaufrecht anwendbar.
:::

::: definition
BGH (1999):

Aufklärung aller Abnehmer über Verwendung des Produkts und damit verbundene Gefahren, sowie Maßnahmen zu deren Verhinderung. \
Bsp: Papierreißwolf: Gefahr nicht direkt erkennbar. \
Demgegenüber ist Einhaltung der Unfallverhütungsvorschriften unerheblich, weil vor erkennbaren Gefahren immer gewarnt werden muss.
:::

::: definition
BGH (1988):

Heranziehung von DIN-Normen zur Feststellung von Inhalt und Umfang der die Beklagte treffenden Verkehrssicherungspflichten ist unbedenklich. \
DIN-Normen eig nur Empfehlungen, spiegeln aber Stand der geltenden Regeln der Technik wieder.
:::

::: definition
BGH (2009), Airbag-Fall:

\(1) Für Produktsicherheit hat Hersteller bereits bei Konteption des Produkts Maßnahmen zu treffen, die zur Vermeidung einer Gefahr objektiv erfordelich und zumutbar sind. \
\(2) Erforderlich sind Sicherungsmaßnahmen, die beim Inverkehrbringen nach neuestem Stand der Technik konstruktiv möglich sind. \
\(3) Sind Risiken nicht zu vermeiden $\rightarrow$ Abwägungen von Art, Umfang, Wahrscheinlichkeit der Risiken und Nutzen des Produkts, ob überhaup
t in Verkehr gebracht werden darf. \
\(4) Frage der Zumutbarkeit einer Sicherungsmaßnahme nach objektiven Maßstäben nur unter Berücksichtigung sämtlicher Umstände des Einzelfalls beurteilen.
:::


::: definition
OLG (Karlsruhe, 1977):

Produktbeobachtugspflicht im Fall des Zerplatzens einer gefüllten Flasche: \
Pflicht zur Produktbeobachtung besteht nur, wenn begründeter Anlass vorliegt. Wenn z.B. auszuschließen ist, dass Produkt Konstruktionsfehler aufweist. \
Bei Neukonstruktionen muss Hersteller Bewährung der Produkte beobachten und dafür sorgen schnellstmöglich über etwaige Konstruktionsgehler hindeutende Unfälle informiert zu werden.
:::

::: definition
BGH (1968), Honda-Fall: 

\(1) Die in BRD ansässige Vertriebsgesellschaft eines ausländischen Herstellers obliegt regelmäßig eine Produktbeobachtungspflicht bezüglich der von ihr vertriebenen Produkte. \
\(2) Hersteller und Vertriebsgesellschaft auch Pflicht zur Produktbeobachtung bez. Gefahren, die aus Kombination des Produkts mit anderen Herstellern entstehen können.
:::

::: definition
BGH (1983), Gaszug-Fall:

\(1) Käufer auch dann Schadensersatzansprüche aus Eigentumsverletzung (§§ 823 ff. BGB), wenn die Sache nach Erwerb durch fehlerhaften Einzelteils beschädigt wird. \
\(2) allerdings kein Raum für deliktische Schadensansprüche, wenn sich der Schaden mit dem Unwert, welcher der Sache aufgrund Mangelhaftigkeit anhaftet, deckt.
:::

::: definition
OLG (Schleswig, 2007), Geschirrspül-Fall: 

\(1) Bei Geschirrspülmaschine berechtigte Erwartungshaltung, dass Defekte nicht in Folge eines Zusammenwirkens von in der Maschine befindlichem Wasser und stromführenden Bauteilen zu erheblichen Gefahren für Gesundheit und Eigentum führen. Unabhängig von technischen Noremen. \
\(2) Bestehen bei z.B. Ausfall aller Thermostatschalter keine Vorkehrungen gegen das unkontrollierte weitere Aufheizen, liegt ein Konstruktionsfehler vor. Sachgemäße Konstruktion hätte Fehlerschtromschalter vorsehen können.
:::

::: definition
OLG (Düsseldorf, 1998), Feuerlöschanlage-Fall: 

\(1) Für Schadensansprüche eines Unfalls infolge einer Fehlerhaften Feuerlöschanlage, die von deutschem Hersteller in Verkehr gebracht wurde, kann der Versicherer deutsches Produkthaftpflichtrecht wählen. (Obwohl Unfall, Einbau und Versicherer nicht in Deutschland). \
\(2) Geschädigte trägt Beweislast. Eine Beweislastumkehr auf Grund besonderer Pflicht zur Statussicherung beim Verlassen des Herstellers entsprchend Entscheid zu Explosion von Flaschen kommt nicht in Betracht.
:::


## Fallbeispiele

### Fall 1

### Fall 2



# Grundlagen strafrechtlicher Verantwortlichkeit


## Grundsätzliches

### Überblick

Strafrecht ist im Wesentlichen im Strafgesetzbuch (StGB) geregelt. Zwei Teile:

- **Allgemeiner** Teil: Vorschriften über allgemeine Voraussetzungen der Strafbarkeit (Fragen des Vorsatzes, Versuchts, etc.)
- **Besonderer** Teil: einzelne Strafnormen (z.B. Totschlag, Körperverletzung, Sachbeschädigung)

Der Tatbestand eines Strafgesetzes enthält die abstrakte (vertypte) Beschreibung einer Verhaltensweise, die vom Gesetzgeber als Unrecht angesehen wird und daher mit einer Strage belegt wurde. (Bsp.: Zerstörung einer Sache, Sachbeschädigung)

Bei Entscheidung über strafrechtliche zu sanktionierende Verhaltensweisen an **Sozialmoral** orientiert.


### Voraussetzungen der Strafbarkeit

> Ein Verhalten ist dann strafbar, wenn es den gesetzlichen **Tatbestand** einer Strafvorschrift erfüllt, **rechtswidrig** und **schuldhaft** ist.

Zu prüfen sind:

::: important
- Tatbestandsmäßigkeit
- Rechtswidrigkeit
- Schuld
:::


als Voraussetzungen der Strafbarkeit.

### Vier Formen strafbarer Handlungen

::: important
1. vollendetes vorsätzliches Begehungsdelikt
2. versuchtes vorsätzliches Begehungsdelikt
3. (echtes oder unechtes) Unterlassungsdelikt
4. fahrlässiges Delikt.
:::

Die Voraussetzungen dieser Straftypen unterscheiden sich erheblich. Auch ihr Prüfungsaufbau (Prüfung der Voraussetzungen für Strafbarkeit des Täters) weicht voneinander ab.

### Vollendetes Vorsatzdelikt

#### Prüfungsaufbau des Vorsatzdelikts
1. Tatbestandsmäßigkeit
   - objektiv
   - subjektiv
2. Rechtswidrigkeit
3. Schuld

Der Täter kann nur bestraft werden, wenn sein Verhalten **tatbestandsmäßig**, **rechtswidrig** und **schuldhaft** ist.

#### Tatbestand
> Den **objektiven** Tatbestand erfüllt, wer die in der Strafvorschriften beschriebenen Tatbestandsmerkmale verwirklicht, also z.B. eine Sache beschädigt ([§ 303 StGB](https://www.gesetze-im-internet.de/stgb/__303.html)).

Kompliziert zu beweisen sind Fragen der **Kausalität**, also ob eine bestimmte Handlung zu bestimmten Erfolg geführt hat.

Ein Kausalzusammenhang ist nach der _conditio-sine-qua-non_-Formel gegeben, wenn die Handlung des Täters nicht hinweggedacht werden kann, ohne dass der Erfolg in seiner konkreten Gestalt entfiele.

> Der **subjektive** Tatbestand bezieht sich auf die inneren Vorgänge beim Täter. Er umfasst den Vorsatz zur Verwirklichung aller objektiven Tatbestandsmerkmale. 

Vorsatz bedeutet, der Täter muss wissen, dass er den objektiven Tatbestand erfüllt und er muss dies auch wollen oder zumindest billigend in Kauf nehmen.

Kein Vorsatz $\rightarrow$ nur **fahrlässige** Tatbegehung betrachtbar

$\Rightarrow$ Für Strafbarkeit wegen Totschlags ([§ 212 StGB](https://www.gesetze-im-internet.de/stgb/__212.html)) reicht Tötung eines Menschen nicht aus. Der Täter muss dabei auch vorsätzlich gehandelt haben.

#### Rechtswidrigkeit
Auf der Prüfungsstufe der _Rechtswidrigkeit_ wird untersucht, ob sich der Täter auf einen sog. **Rechtfertigungsgrund** (z.B. Notwehr) berufen kann. Unter Notwehr versteht man die Verteidigung, die nötig ist, um einen rechtswidrigen Angriff von sich oder einem anderen abzuwenden.

Rechtfertigungsgründe _schließen_ die Rechtswidrigkeit _aus_, sodass sich der Täter nicht strafbar macht.

##### Erlaubtes Risiko
Im technischen Bereich sog. "**erlaubte Risiko**" als Rechtfertigungsgrund:

Auch wenn im Massenverkehr bestimmte Schäden mit hoher Wahrscheinlichkeit eintreten werden (z.B. Sachschaden) kann das ursächliche Verhalten (z.B. die Autoherstellung) dennoch gerechtfertigt sein.

Das ist der Fall wenn die Massenanfertigung _wichtige soziale Zwecke_ erfüllt und das mit ihr verbundene Risiko allgemein akeptiert ist.

> Ziel: Die _Schaffung von Risiken_, die sich bei Verwendung _neuer Techniken_ ergeben aber gleichzeitig aufgrund der _positiven Wirkung_ der Technik **sozialethisch akzeptiert** sind, von dem Verdikt strafrechtlichen Unrechts _befreien_.

Dasselbe gilt für Schäden, die sich aus solchen Risiken ergeben.

::: definition
Hauptanwendungsbereich:

Beim **Fahrlässigkeitsdelikt** kann der Gedanke des "erlaubten Risikos" ohne größere Probleme im Rahmen der Bestimmung sorgfalsgemäßen Verhaltens berücksichtigt werden. Hersteller, Entwickler und Anwender (beispielsweise autonomer Fahrzeuge) werden sich auf Rechtfertigungsgrund des _erlaubten Risikos_ stützen können.
:::

#### Schuld
Auf der Prüfungsstufe der _Schuld_ wird gefragt, ob dem Täter die Tat **persönlich** vorgeworfen werden kann.

Z.B. ausgeschlossen, wenn Täter Kind ist oder er zur Zeit der Tat kein Unrechtsbewusstsein hat (z.B. Alkoholkonsum).


### Versuchtes Vorsatzdelikt
> **Versuchtes Vorsatzdelikt** (_Versuch_): Täter handelt mit dem Vorsatz, ein bestimmtes Delikt zu begehen, kann diesen Vorsatz aber nicht oder nicht vollständig in die Tat umsetzen.

Es liegt also der subjektive Tatbestand (hier _Tatenschluss_ genannt) vollständig vor, während der objektive Tatbestand nur teilweise gegeben ist.

Ein Versuch ist nur **strafbar**, wenn es sich bei der versuchten Tat um ein **Verbrechen** handelt, also um eine Tat, die mit mindestens einem Jahr Freiheitsstrafe geahndet wird ([§ 12 StGB](https://www.gesetze-im-internet.de/stgb/__12.html)).

Ein Versuch ist **nicht strafbar**, wenn es sich um ein **Vergehen**, also eine rechtswidrige Tat, die mit einer Freiheitsstrafe unter einem Jahr oder mit Geldstrafe bedroht wird, handelt. Außer es ist im Gesetz **ausdrücklich angeordnet**. 

#### Prüfungsaufbau des Versuchs
1. Vorprüfung, ob die Tat nicht vollendet und der Versuch strafbar ist
2. Vorliegen eines Tatenschlusses
3. Unmittelbares Ansetzen zur Tatbestandsverwirklichung
4. Rechtswidrigkeit
5. Schuld


### Fahrlässige Tatbegehung
> In Betracht bei: Täter handelt nicht vorsätzlich sondern aus **Unachtsamkeit** $\rightarrow$ verstößt gegen Sorgfaltspflichten

Nur **strafbar**, wenn ausdrücklich bestimmt, z.B. fahrlässige Tötung (§ 222) oder fahrlässige Körperverletzung ([§ 229 StGB](https://www.gesetze-im-internet.de/stgb/__229.html)).

Bsp.: Bei Gewehrreinigung löst sich Schuss der Person tötet. Reiniger nicht wegen vorsätzlicher sondern wegen fahrlässiger Tötung strafbar.

#### Prüfungsaufbau der Fahrlässigen Tatbegehung
1. Tatbestand
   1. Eintritt des tatbeständlichen Erfolgs
   2. Für den Erfolgseintritt kausale Handlung des Täters
   3. Objektive Sorgfaltspflichtverletzung
   4. Objektive Vorhersehbarkeit des vermeidbaren Erfolgs
   5. Objektive Zurechnung des Erfolgs
2. Rechtswidrigkeit
3. Schuld (subjektive Sorgfaltspflichtverletzung und Vorhersehbarkeit)

Im objektiven Tatbestand wird geprüft, ob der tatbestandsmäßige Erfolg dem Täter **zugerechnet** werden kann. Das ist zu bejahen, wenn der Erfolg bei Anwendung der gebotenen Sorgfalt _vermieden worden wäre_, sog. **Pflichtwidrigkeitszusammenhang** (rechtmäßiges Alternativverhalten).

### Fahrlässigkeit
Auch im Strafrecht das Außer-Acht-Lassen der im Verkehr erforderlichen **Sorgfalt**. 
Setzt _objektive Sorgfaltspflichtverletzung_ und _objektive Vorhersehbarkeit_ des Erfolgseintritts voraus.

Auf Ebene des _gesetzlichen Tatbestands_ muss eine Verletzung der erforderlichen Sorgfalt vorliegen. Hierfür wichtig, wie sich ein sorgfältiger, _besonnener_ _Durchschnittsmensch_ in der konkreten Situation des Täters verhalten hätte ("_objektiv_"). Außerdem prüfen, ob für solchen Durchschnittsmenschen der eingetretene tatbestandsmäßige Erfolg nach allgemeienr Lebenserfahrung als ungewöhnliche Folge nicht _erwartet werden konnte_.

Auf Schuldebene wird _individuelle_ Sorgfaltspflicht und Vorhersehbarkeit gefordert. 
Dies bedeutet, dass der Täter nach seinen individuellen Fähigkeiten, Kräften, Erfahrungen und Kenntnissen in der Lage gewesen sein muss, die jeweilige Sorgfaltspflicht zu erkennen und zu erfüllen und den eingetretenen tatbestandsmäßigen Erfolg vorherzusehen. 

Der Vorwurf, strafrechtlich relevantes Unrecht begangen zu haben, bestimmt sich im Wesentlichen anhand der zum zivilrechtlichen Sorgfaltsmaßstab genannten Kriterien. 


### Unterlassungsdelikt
Unterscheidung:

- Echtes UDs: bestehen im Unterlassen einer vom Gesetz ausdrücklich geforderten Tätigkeit, z.B. Unterlassen von Hilfeleistungen ([§ 323 c StGB](https://www.gesetze-im-internet.de/stgb/__323.html))
- Unechte UDs: sind nicht eigens geregelt, sondern knüpfen über [§ 13 StGB](https://www.gesetze-im-internet.de/stgb/__13.html) jeweils an ein Begehungsdelikt (z.B. § 212, [§ 223 StGB](https://www.gesetze-im-internet.de/stgb/__223.html)) an.

Bsp.: Lässt A den B verhungern, unterlässt er keine vom Gesetz geforderte Tätigkeit, sondern führt den Taterfolg des Totschlags (§ 212 StBG) durch Unterlassen herbei (Tötung durch Unterlassen, §§ 212, 13 StGB). 

#### Unechtes Unterlassungsdelikt
Unterschiede zum Begehungsdelikt:

- Objektiv
  1. Eintritt des tatbestandsmäßigen Erfolgs
  1. Nichtvornahme der erforderlichen Rettungshandlung (Unterlassen)
  1. Möglichkeit und Zumutbarkeit der Rettungshandlung
  1. Kausalität des Unterlassens der Rettungshandlung für den Erfolg
  5. Garantenstellung des Täters, [§ 13 StGB](https://www.gesetze-im-internet.de/stgb/__13.html)
  6. Entsprechungsklausel (das Unterlassen muss einem Tun entsprechen)
- Subjektiv
  - Der Unterlassungstäter muss mit Wissen und Wollen (vorsätzlich) in Bezug auf den objektiven Tatbestand handeln und u.a. die faktischen Umstände kennen, aus denen sich seine Pflicht zum Tätigwerden ergibt.

### Abgrenzung Tun - Unterlassen
Schwierig, da viele Verhaltensweisen als beides gedeutet werden können.

Bsp.: Arbeitgeber gibt nicht desinfizierte Ziegenhaare an Mitarbeiter weiter, welche dann an Milzbrand erkranken.

Hier könnte die Handlung des Arbeitgebers als Tun (Weitergabe) ode als Unterlassen (Nichtdesinfektion) gesehen werden.

Bei der Abgrenzung ist auf den Schwerpunkt des strafrechtlich relevanten Verhaltens abzustellen.

In dem berühmten "Ziegenhaarfall" wurde ein aktives Tun angenommen.


### Garantenstellung
Täter eines **unechten** Unterlassungsdelikts (z.B. §§ 212, 13 StBG) kann nur eine Person sein, die zum Schutz des betreffenden Rechtsguts besonders verpflichtet ist. Erforderlich ist also eine **Garantstellung** des Täters. (z.B. Ehepartner, Eltern, ...)

Täter eiens **echten** Unterlassungsdelikts (z.B. [§ 323 c StGB](https://www.gesetze-im-internet.de/stgb/__323.html)) kann dagegen jedermann sein, unabhängig von einer besonderen Pflichtstellung.

Bsp.: Wenn A das Unfallopfer B am Straßenrand liegen lässt und B daraufhin stirbt, so erfüllt dies den Tatbestand einer unterlassenen Hilfeleistung ([§ 323 c StGB](https://www.gesetze-im-internet.de/stgb/__323.html)).

Eine - deutlich härter bestrafte - Tötung durch Unterlassung (§§ 212, 13 StGB) kann nur dann vorliegen, wenn A zur Rettung des B in besonderer Weise verpflichtet gewesen wäre (Garantenstellung).

Zweiteilung der Garantenstellung:

- **Beschützergaranten**: verantwortlich für Wohl und Wehe bestimmter Personen. Sie sind (z.B. aus Gesetz, Vertrag, enger Verbundenheit) verpflichtet, von außen kommende Gefahren abzuwehren.

Bsp.: Bergführer, der Tour übernommen hat, ist vertraglich für Sicherheit der Teilnehmer verantwortlich.

- **Überwachungsgaranten**: sind für bestimmte Gefahrenquellen verantwortlich. Sind verpflichtet, hiervon ausgehende Gefahren zu kontrollieren. 

Bsp.: Betreiber einer Anlage (z.B. Atomkraftwerk) ist verpflichtet, andere vor den Gefahren der Anlage zu bewahren.


### Täterschaft und Teilnahme
**Strafbar** ist derjenige, der die Tat als **unmittelbarer** (selbst) oder **mittelbarer** (durch einen anderen) Täter oder als Mittäter begeht.

**Strafbar** ist auch derjenige, der an einer _vorsätzlichen rechtswidrigen_ Tat eines anderen **teilnimmt**.

Formen der Teilnahme sind **Anstiftung** und **Beihilfe**.


#### Anstiftung
> Nach § 26 StBG ist Anstifter, wer vorsätzlich einen anderen zu dessen vorsätzlich begangener Tat bestimmt. Der Anstifter wird gleich dem Täter bestraft.

#### Beihilfe
> Gehilfe ist nach [§ 27 StGB](https://www.gesetze-im-internet.de/stgb/__27.html) der jenige, der einem anderen zu dessen vorsätzlich begangener rechtwidriger Tat Hilfe geleistet hat . Die Strafe des Gehilfen richtet sich nach der Strafe des Täters, wird jedoch gemildert.



## Relevante Straftatbestände

### Straftaten gegen die körperliche Unversehrtheit
- Körperverletzungsdelikte sind Geregelt in den §§ 223 ff. StBG
- schützen _körperliche Unversehrtheit_ des Menschen
- **Grundtatbestand**: (Ausgangsform des jeweiligen Deliktstyps, welcher die Mindestvoraussetzung der Strafbarkeit festlegt) \
  einfache Körperverletzung, [§ 223 StGB](https://www.gesetze-im-internet.de/stgb/__223.html)
- Darauf bauen Qualifikationstatbestände auf, z.B. gefährliche oder schwere Körperverletzung (§§ 224, 226 StGB)

#### Vorsätzliche Körperverletzung
> Nach § 223 Abs. 1 StGB wegen vorsätzlicher Körperverletzung strafbar, wer eine andere Person _körperlich misshandelt_ oder an der _Gesundheit shädigt_.

Als Strafe Freiheitsstrafe bis zu 5 Jahren oder Geldstrafe.

#### Körperliche Misshandlung, Gesundheitsschädigung
Nach [§ 223 StGB](https://www.gesetze-im-internet.de/stgb/__223.html) verlangt.

> **Körperliche Misshandlung**: jede üble und unangemessene Behandlung, durch die das körperliche Wohlbefinden eines Menschen mehr als nur unerheblich beeinträchtigt wird

Darunter fallen nicht nur Substanzschäden (z.B. Messerstiche), sondern auch bloße Schmerzzufügung (z.B. Ohrfeige) und auch das Hervorrufen körperlicher Verunstaltungen (z.B. Hautausschläge).

> **Gesundheitsschädigung**: umfasst Hervorrufen oder Steigern eines krankhaften Zustands (z.B. durch Zufügen einer schweren Verwundung oder Infektion mit Krankheitserregern)

#### Gefährliche Körperverletzung
Nach [§ 224 StGB](https://www.gesetze-im-internet.de/stgb/__224.html): erfasst Körperverletzungen, deren _Begehungsweise besonders gefährlich_ ist, z.B.

- Beibringung von Gift oder anderen gesundheitsschädlichen Stoffen
- Verwendung einer Waffe oder eines gefährlichen Werkzeugs
- mittels einer lebensgefährlichen Behandlung

#### Schwere Körperverletzung
Nach [§ 226 StGB](https://www.gesetze-im-internet.de/stgb/__226.html): stellt nicht auf Begehungsweise, sondern vielmehr auf _Schwere des Taterfolgs_ ab, z.B.:

- Verlust des Seh-, Gehör- und Sprechvermögens
- Verlust oder Unbrauchbarkeit eines wichtigen Körpergliedes
- Entstehung sowie Hervorrufen von Lähmung oder Behinderung

Strafrahmen: von 1 bis 10 Jahren Freiheitsstrafe.

§ 226 Abs. 1 StGB ist ein sog. **erfolgsqualifiziertes Delikt** $\rightarrow$ eine Handlung, die von anderem Tatbestand (dem Grundtatbestand) erfasst wird, wird allein wegen eines druch diese Handlung herbeigeführten Erfolges härter bestraft.

Allerdings tritt die Bestrafung gemäß [§ 18 StGB](https://www.gesetze-im-internet.de/stgb/__18.html) nur dann ein, wenn dem Täter hinsichtlich der schweren Folge _wenigstens Fahrlässigkeit_ vorgeworfen werden kann.

#### Körperverletzung mit Todesfolge
Nach [§ 227 StGB](https://www.gesetze-im-internet.de/stgb/__227.html): Hierfür muss der Tod durch eine vorsätzlich begangene Körperverletzung verursacht worden sein. 

Hinsichtlich des Todeseintritts gilt auch hier [§ 18 StGB](https://www.gesetze-im-internet.de/stgb/__18.html), d.h. mind. Fahrlässigkeit des Täters.

#### Fahrlässige Körperverletzung
Nach § 229: Derjenige, der durch Fahrlässigkeit eine Körperverletzung einer anderen Person verursacht wird mit bis zu 3 Jahren Freiheitsstrafe oder Geldstrafe bestraft.


### Straftaten gegen das Leben

#### Tötungsdelikt
> Eine Straftat, die gegen das menschliche Leben - Rechtsgut von bes. hohem Rang - gerichtet ist. 

Menschsein im strafrechtlichen Sinne beginnt nach herrschender Meinung mit Beginn der Eröffnugnswehen und endet mit dem Hirntod.

Verletzung menschl. Lebens kann u.U. gerechtfertigt sein, (Notwehr). Daher unzutreffend von einer "Unverfügbarkeit" des menschlichen Lebens zu sprechen.

Es gilt der **Grundsatz des absoluten Lebensschutzes**. $\rightarrow$ Alle Formen des geborenen menschlichen Lebens sind gleichermaßen geschützt.

Kriterien wie Gesundheit, Lebenserwartung, etc. spielen keine Rolle.

**Grundtatbestand**: (einfacher) Totschlag, [§ 212 StGB](https://www.gesetze-im-internet.de/stgb/__212.html).

Totschläger ist, wer einen anderen Menschen tötet. Auf Welche weise die Tat durchgeführt wird, spielt keine Rolle.

#### Mord

Nach [§ 211 StGB](https://www.gesetze-im-internet.de/stgb/__211.html) ist Mörder, wer:

- aus Mordlust, zur Befriedigung des Geschlechtstriebs, aus Habgier oder sonst aus niederen Beweggründen,
- heimtückisch oder grausam oder mit gemeingefährlichen Mitteln oder
- um eine andere Straftat zu ermöglichen oder zu verdecken

einen Menschen tötet.

Der Mord ist somit im Vergleich zum Totschlag durch ein _größeres Unrecht_ charakterisiert.

#### Fahrlässige Tötung
Nach [§ 222 StGB](https://www.gesetze-im-internet.de/stgb/__222.html): Verursachung des Tods eines Menschen durch _Fahrlässigkeit_

Strafe: bis zu 5 Jahre Freiheitsstrafe oder Geldstrafe


### Straftaten gegen den persönlichen Lebens- und Geheimbereich
Schutz der Privatsphäre im Strafrecht immer wichtigere Rolle. Neue Rechtsprechung des BVerfG: _Recht auf informationelle Selbstbestimmung_.

Danach kann jeder Mensch selbst entscheiden, ob und innerhaltb welcher Grenzen er persönliche Informationen offenbaren will.

Straftatbestände zum Schutz der Privatsphäre überwiegend in §§ 201-206 StGB.

#### Ausspähen von Daten
Durch schnelle EDV, 1986 Einführung **Ausspähen von Daten** ([§ 202 a StGB](https://www.gesetze-im-internet.de/stgb/__202.html)) als neuer Straftatbestand.

Daten hier: elektronisch, magnetisch oder sonst nicht unmittelbar wahrnehmbar gespeicherte oder übermittelte Daten.

Nach [§ 202 a StGB](https://www.gesetze-im-internet.de/stgb/__202.html) macht sich strafbar, wer unbefungt sich oder einem anderen Zugang zu Daten, die nicht für ihn bestimmt und die gegen unberechtigten Zugang besonders gesichert sind, unter Überwindung der Zugangssicherung verschafft.

#### Abfangen von Daten
Nach [§ 202 b StGB](https://www.gesetze-im-internet.de/stgb/__202.html): strafbar wegen **Abfangens von Daten**, wer sich oder einem anderen unbefugt unter Anwendung von technischen Mitteln nicht für ihn bestimmte Daten aus einer nichtöffentlichen Datenübermittlung oder aus der elektromagnetishen Abstrahlung einer Datenverarbeitungsanlage verschafft.

#### Vorbereiten des Ausspähens und Abfangens von Daten
Nach [§ 202 c StGB](https://www.gesetze-im-internet.de/stgb/__202.html): Auch wer das Ausspähen oder Abfangen von Daten vorbereitet, indem er:

- Passwörter oder sonstige Sicherungscodes oder
- Computerprogramme, deren Zweck die Begehung einer solchen Tat ist,

herstellt, sich oder einem anderen verschafft, kauft, einem anderen überlässt, verbreitet, oder sonst zugänglich macht, wird nach [§ 202 c StGB](https://www.gesetze-im-internet.de/stgb/__202.html) bestraft.

#### Verletzung des Privatgeheimnisses
Nach [§ 203 StGB](https://www.gesetze-im-internet.de/stgb/__203.html): strafbar, wer unbefugte private oder geschäftliche Informationen offenbart, die ihm (z.B. als Datenschutzbeauftragter, Arzt, ...) anvertraut worden oder sonst bekanntgeworten sind.


#### Sachbeschädigung
> [§ 303 StGB](https://www.gesetze-im-internet.de/stgb/__303.html) stellt das **Eigentum** unter Schutz. Danach wird eine Sachbeschädigung mit Geldstrafe oder Freiheitsstrafe bis zu zwei Jahren belegt.

> Tathandlung: Zerstören oder Beschädigen einer _fremden_ Sache. 

Eine Sache (jeder körperliche Gegenstand, [§ 90 BGB](https://www.gesetze-im-internet.de/bgb/__90.html)) ist **fremd**, wenn sie im Eigentum eines anderen als des Täters steht.

Eine Sache ist **zerstört**, wenn ihre Brauchbarkeit völlig aufgehoben wurde.

Unter **Beschädigung** versteht man jede (substanzverletzende) Einwirkung, welche die Gebrauchsfähigkeit der Sache mindert.

Strafbar ist nur die **vorsätzliche** Sachbeschädigung. Die fahrlässige Sachbeschädigung steht (mit Ausnahme der fahrlässigen Brandstiftung) nicht unter Strafe.


### Verkehrsdelikte
Der Tatbestand der Gefährdung des Straßenverkehrs stellt besonders gefährliche Verhaltensweisen im Straßenverkehr unter Strafe. Erfasst werden Gefährdungen, die von den Verkehrsteilnehmern selbst ausgehen. 

Zwei Fallgruppen der Gefährdung des Straßenverkehrs:

- Fallgruppe 1:

§ 315 c | Nr. 1 StGB umfasst Fälle, in denen jmd ein Fahrzeug führt, obwohl er **fahruntüchtig** ist. (z.B. infolge von Alkoholgenuss, nicht mehr fähig das Fahrzeug sicher zu führen)

- Fallgruppe 2:

§ 315 c | Nr. 2 StGB umfasst die "7 Todsünden des Straßenverkehrs". (z.B. Nichtbeachten der Vorfahrt, etc.)

Beide Fallgruppen führen nur dann zu einer Strafe, wenn die körperliche Unversehrheit oder das Leben anderer Personen oder Sachen von bedeutendem Wert gefährtet werden.

#### Gefährliche Eingriffe in den Straßenverkehr
Nach [§ 313 b StGB](https://www.gesetze-im-internet.de/stgb/__313.html) sich wg. gefährlichen Eingriffs in Straßenverhekr strafbar, wer die Sicherheit des Straßenverkehrs dadurch beeinträchtigt, dass er

1. Anlagen oder Fahrzeuge zerstört, beschädigt oder beseitigt,
2. Hindernisse bereitet oder
3. einen ähnlichen, ebenso gefährlichen Eingriff vornimmt,

und dadurch Leib oder Leben eines anderen Menschen oder fremder Sachen von bedeutendem Wert gefährtet.

Strafe: Freiheitsstrafe bis zu 5 Jahren oder Geldstrafe.

Für autonom vernetztes Fahren insb. Gefährdung fremder Sachen von bedeutendem Wert (~ >750€) von Bedeutung, da der Tatbestand auch fahrlässig verwirklicht werden kann (§ 315 b Abs. 5 StGB).

#### Trunkenheit im Verkehr
Wer im Verkehr ein Fahrzeug führt, obwohl er

- berauschende Mittel zu sich genommen hat und deshalb
- nicht mehr in der Lage ist, das Fahrzeug sicher zu führen (Fahruntüchtigkeit)

verwirklicht den Tatbestand der Trunkenheit im Verkehr, [§ 316 StGB](https://www.gesetze-im-internet.de/stgb/__316.html).

Für Strafbarkeit reicht es, fahruntüchtig gefahren zu sein. Ob es zu einem Unfall kam, spielt keine Rolle.


## Herausforderungen durch die Autonomik

### Strafrechtliche Produktverantwortung
Bei Herstellung und Vertrieb fehlerhafter Produkte kann es zur Verletzung von Straftatbeständen kommen. In erster Linie sind Straftatvorschriften zu beachten, die _personenbezogene Rechtsgüter_ schützen.

Damit sind v.a. §§ 212, 222 StGB (vorsätzliche bzw. fahrlässige Tötung), §§ 223, 229 StGB (vorsätzliche bzw. fahrlässige Körperverletzung) angesprochenn.

### Strafrechtliche Verantwortung des Unternehmens
Unterschied zum ProdHaftRecht kommt **strafrechtliche Verantwortung** des Rechtsträgers, dem das Unternehmen rechtlich zugeordnet wird, **nicht in Betracht**.

Grund: Schuldprinzip. $\rightarrow$ Setzt die _persönliche Vorwerfbarkeit_ eines Fehlverhaltens voraus, welche einem künstlichen Gebilde (GmbH, AG) nicht entgegengesetzt werden kann. Strafrechtliche Verfolgung trifft somit nur natürliche Personen, also z.B. Mitglieder der Geschäftsleitung oder leitende Angestellte mit Entscheidungsverantwortung.

### Anwendung auf die Automatik
In Automatikbereich kann **Inverkehrbringen** oder **Benutzen** von Produkten als Anknüpfungspunkt für die **Tathandlung** einer (fahrlässigen) Körperverletzung oder einer (fahrlässigen) Tötung herangezogen werden. 

Kausalität schwierig zu beweisen: ob eine bestimmte Handlung zu einem bestimmten Erfolg geführt hat.

Dazu kommt, ob der Täter vorsätzlich oder fahrlässig gehandelt hat und ob fahrlässige Begehung überhaupt strafbar ist.

Letzteres hat v.a. Auswirkungen auf Dokumentations- und Überwachungspflichten, die einen Vorwurf der Fahrlässigkeit _ausschließen_ können. IdR. entfällt strafrechtliche Verantowrtung, wenn nach Stand der Technik alles Mögliche getan, um Fehler zu vermeiden, der zu Schaden führen kann.

> Adressaten strafrechtlicher Haftung: Durch Begriff der "**Ursächlichkeit**" sowohl Entwickler, Hersteller, Programmierer als auch Verkäufer schadensträchtiger Systeme

Problematisch auch, dass in vielen Einsatzfeldern keine **Normen**, die speziell auf autonome Systeme abgestimmte Sorgfaltsmaßnahmen definieren, oder spezifische Rechtssprchung existiert.

**Fahrlässigkeitsmaßstäge** sind dagegen von technischer Entwicklung und gesellschaftlichem Risikoempfinden abhängig und unterliegen anhaltender Veränderung.

Einzelfragen werden nicht gesetzlich beantwortet, sondern 

- durch Rechtsprechung entschieden oder
 - den Beteiligten zur Selbsregulierung (Standardisierung z.B. DIN, ISO) überlassen.

Auch Produktsicherheitsgesetz stellt nur allgemeine Standards auf.

Aber auch existierende technische Normen kaum auf autonome Systeme ausgelegt. \
Problem, dass Rechts- und Normsetzung i.d.R. der technischen Entwicklung nachfolgt.

In wenig gerichtlich behandelten Bereichen (Automatik) ist Sorgfaltsmaßstab durhc **Interessenabwägung** festzulegen.

$\rightarrow$ **Handlungsunsicherheit**, denn möglich, dass Abwägungen der Anwender später vor Gericht korrigiert werden. Gilt umso mehr, als sich kritische Situationen mit Schadenseintritt im Nachhinein oft leichter beurteilen lassen als im Vorfeld.

Speziell im Technikrecht kann ein in _Vergangenheit sorfältiges_ Verhalten **später als fahrlässig** betrachtet werden (z.B. wenn durch technsichen Fortschritt neue Möglichkeiten zur Verhinderung von Gefahren existieren oder neue zuvor nicht diskutierte Gefahren bekannt sind). 

Durch schnellen Fortschritt auch Probleme bei Bestimmung des Sorgfaltsmaßstab.

Zudem sind bei neuen Technologien die dem Anwender drohenden Gefahren (u.U. mangels Praxiserfahrung) nicht abzusehen.

Zu beachten: Umfang der Sorgfaltspflichten auch von **Vorkenntnissen** der Nutzer **abhängig**, an die sich das Produkt richtet. \
(z.B. bei Bedienung eines autonomen Systems von ausschließlich Fachpersonal gilt ein _abgesenkter Sorgfaltsmaß_)

Bei komplexen Neuentwicklungen ist sorgfaltsgemäßes Handeln des Herstellers auch nach Vertrieb des Produkts durch intensive Produktbeobachtung gewährleistet. Diese kann sich auch nur Pflicht zum Rückruf verdichten.

Hat der Betroffene die Rechtsfrage mit der erforderlichen Sorgfalt geprüft, ist es ihm nicht anzulasten, wenn er gleichwohl einem Rechtsirrtum unterlieg.


### Nachweisproblematik
Im Strafprozess müssen dem Täter nachgewiesen werden: 

- Tatbeitrag, 
- die insoweit wirkenden Ursachenzusammenhänge und
- der damit verbundene Schuldvorwurf im Einzelnen.

Unklarheiten in Aufklärung wirken getreu dem Grundsatz "_in dubio pro reo_" zugunsten des Angeklagten. \
$\rightarrow$ Einstellung des Verfahrens oder Freispruch

Durch _Arbeitsteilung_ bedingte Verlagerung von Zuständigkeiten und Kompetenzen auf Mehrzahl von Beteiligten oder Gremien ist Aufklärung der Sachverhalte und strafrechtilche Würdigung schwierig.


## Relevante Urlteile

::: definition
BGH (1999), Lederspray-Fall:

Vorwurf keine hinreichenden Mapnahmen zur Gefahrenabwehr für vertriebenes Lederspray, obwohl Kenntnis übermögliche gesundheitliche Ausiwrkungen. \
Einwand: Ursachenzusammenhang zw. Beschwerden und Auswirkungen des Produkts nicht eindeutig bewiesen. \
Gericht sah jedoch als erwiesen, dass Ursache der Vorfälle nur in toxikologischen Wirkungsmechanismen der Rohstoffe des Produkts allein oder in Kombination mit anderen zu sehen ist. -> keine andere Fehlerursache ersichtlich, die als alleinige Ursache für den Verletzungserfolg in Betracht kam. -> strafrechtliche Verurteilung bestätigt
:::


::: definition 
OLG (Karlsruhe, 1999): Bergpanzer

Wer sich über Unfallverhütungsvorschriften hinwegsetzt wird sich i.d.R. nicht darauf berufen können, für ihn sei ein durch Verletzung der Vorschriften verursachter Unfall nicht vorhersehbar gewesen. \
Zuwiderhandeln gg. derartige Vorschriften stellt mithin ein Beweiszeichen dür Voraussehbarkeit des Erfolgs dar.
:::



## Fallbeispiele zur strafrechtlichen Verantwortlichkeit

### Fall 1: Trunkenheit im Verkehr und automatisierte Parkfunktion

### Fall 2: Gefährdung des Straßenverkehrs und automatisiertes Fahren


# Datenschutz und Datensicherheit

## Rechtshistorische und -politische Hintergürnde des Datenschutzrechts

### Allgemeines Persönlichkeitsrecht
Ist Ausgangspunkt für das Datenschutzrecht.

Artikel 1 Abs. 1 GG: "Die Würde des Menschen ist unantastbar. Sie zu achten und zu schützen ist die Verpflichtung aller staatlicher Gewalt."

Artikel 2 Abs. 1 GG: "Jeder hat das Recht auf die freie Entfaltung seiner Persönlichkeit, soweit er nicht die Rechte anderer verletzt und nicht gegen die verfassungsmäßige Ordnung oder das Sittengesetz verstößt."

Fallgruppen zum Allgemeinen Persönlichkeitsrecht:

Neben dem entwickelten Recht auf informationelle Selbstbestimmung gilt

- das Recht auf Selbstdarstellung in der Öffentlichkeit,
- der Schutz eines abgeschirmten Bereichs persönlicher Lebensgestaltung,
- das Recht am eigenen Bild und Wort und
- das Computergrundrecht (Recht auf Vertraulichkeit und Integrität informationstechnischer Systeme)

### Entstehung Datenschutzgesetz
> Zweck (nach DSGVO): schützt Grundrechte und Grundfreiheiten natürlicher Personen und insbesondere deren Recht auf Schutz personenbezogener Daten

Resultat einer historischen Entwicklung im Datenschutzrecht, begonnen in 1970ern.

Auch von Bedeutung ist das **Volkszählungsurteil** des BVerfG 1983: Vereinbarkeit einer Volkszählung mit allgemeinem Persönlichkeitsrecht.

Kernaussagen: 

- Datenschutz ist **Grundrechtsschutz**
- Wegen der Möglichkeit von Datenveredelung gibt es keine belanglosen Daten mehr
- Datenübermittlung und -erhebung müssen einer strikten **Zweckbindung** unterliegen
- Es existiert ein Recht auf informationelle Selbstbestimmung (schützt persönliche Lebensphäre und Recht über öffentliches In-Erscheinung-treten zu bestimmen)

Datenschutzrecht ist eine **Querschnittsmaterie**.
(weil es sowohl Verhältnisse zw. Staat und Bürgern als auch zwischen Privaten regelt)

### Dimensionen des Datenschutzrechts 
Neben öffentlich-rechtlichen und zivilrechtlichen Dimension des Datenschutzrechtes finden sich auch Reihe von Strafnormen, (z.B. in DSGVO), die dem Nebenstrafrecht zuzuordnen sind oder aus dem kernstrafrechtlichen StGB stammen.

Beispiele für Normen zum Datenschutz aus unterschiedlichen Gesetzen:

- Datenschutz-Grundverordnung (DSGVO)
  - Art. 83 Allgemeine Bedingungen für Verhänung von Geldbußen
  - Art. 84 Sanktionen (i.V.m. § 42 BDSG-neu)
- Strafgesetzbuch (StGB)
  - § 203 Verletzung von Privatgeheimnissen
  - § 353b Verletzung des Dienstgeheimnisses
- Sozialgesetzbuch (SGB X)
  - § 85 Bußgeldvorschrift
- Gesetz gg. unlauteren Wettbewerb (UWG)
  - ~~§ 17 Verrat von Geschäfts- und Betriebsgeheimnissen~~
  - Seit 2019: ausgelagert in eigenes Gesetzbuch GeschGehG (aufgrund EU-Richtlinie)

Im öffntlichen Recht existieren datenschutzrechtliche Normen auf Ebene des Bundes- und Landesrechts.

Datenschutzrecht beruht auf unterschiedlichen Rechtsquellen mit unterschiedlichen Implikationen. $\rightarrow$ Grundgesetz, DSGVO, Bundesdatenschutzgesetz, landesrechtliche Datenschutzgesetze

### Europäisches Recht

Auf Ebene des Unionsrechts (europaweit):
- EG Datenschutzrichtlinie
- Datenschutzrichtlinie für elektronische Kommunikation
- EU-Grundrechtecharta
- Datenschutz-Grundverordnung

Für Auslegung sind europ. Grundrechte von Bedeutung:

Art. 7: Achtung des Privat- und Familienlebens \
"Jede Person hat das Recht auf Achtung ihres Privat- und Familienlebens, ihrer Wohnung sowie ihrer Kommunikation."

Artikel 8: Schutz personenbezogener Daten \
„(1)   Jede Person hat das Recht auf Schutz der sie betreffenden personenbezogenen Daten. \
 \(2\)   Diese Daten dürfen nur nach Treu und Glauben für festgelegte Zwecke und mit Einwilligung der betroffenen Person oder auf einer sonstigen gesetzlich geregelten legitimen Grundlage verarbeitet werden. Jede Person hat das Recht, Auskunft über die sie betreffenden erhobenen Daten zu erhalten und die Berichtigung der Daten zu erwirken.“

### Internationales Recht
Beispielsweise: Europäische Datenschutzkonvention, Europäische Menschenrechtskonvention

Art. 8: Recht auf Achtung des Privat- und Familienlebens \
„(1) Jede Person hat das Recht auf Achtung ihres Privat- und Familienlebens, ihrer Wohnung und ihrer Korrespondenz.“

### Grundsätze der DSGVO

- Verbot mit Erlaubnisvorbehalt
- Transparenz
- Zweckbindung
- Datenminimierung
- Speicherbegrenzung

#### Verbot mit Erlaubnisvorbehalt
> Die Verarbeitung personenbezogener Daten ist grundsätzlich **verboten**.
> 
> Sie ist nur ausnahmsweise erlaubt, soweit der Betroffene **eingewilligt** hat oder die Verarbeitung durch eine andere Rechtsvorschrift (_Erlaubnistatbestand_) **legitimiert** ist. (Art 6 Abs. 1 DSGVO)

Gilt auch für Datenübermittlungen.

#### Datentransparenz
> Personenbezogene Daten müssen auf "**rechtmäßige** Weise, nach **Treu** und Glauben und in einer für die betroffene Person **nachvollziehbaren** Weise" verarbeitet werden. (Art 5 Abs. 1 DSGVO)

#### Datenminimierung
> Personenbezogene Daten sollen für den verfolgten Zweck "angemessen und erheblich sowie auf das für die Zwecke der Verarbeitung notwendige Maß beschränkt" sein. (Art. 5 Abs. 1 lit c DSGVO)

#### Zweckbindung
> Personenbezogene Daten dürfen nur für festgelegte, eindeutige und rechtmäßige Zwecke erhoben und nur für diese Zwecke weiterverarbeitet werden. 
> 
> Der Zweck muss vor der Datenverarbeitung bestimmt sein und ergibt sich aus der einschlägigen Rechtsgrundlage.

#### Speicherbegrenzung
> Personenbezogene Daten dürfen nur so gespeichert werden, dass die Identifizierung der Person nur bis zum Zweckfortfall möglich ist.

Insbesondere besteht das Recht des Betroffenen auf "Vergessenwerden" $\rightarrow$ Verantwirtlicher muss personenbezogene Daten auf Wunsch löschen.

### Aufbau der DSGVO
Insgesamt 99 Artikel, die sich wie folgt gliedern:

1. Kapitel: Allgemeine Bestimmungen

2. Kapitel: Grundsätze

3. Kapitel: Rechte der betroffenen Personen

4. Kapitel: Verantwortlicher und Auftragsverarbeiter

5. Kapitel: Übermittlung personenbezogener Daten an Drittländer oder an internationale Organisationen

6. Kapitel: Unabhängige Aufsichtsbehörden

7. Kapitel: Zusammenarbeit und Koheränz

8. Kapitel: Rechtsbehelfe, Haftung und Sanktionen

9. Kapitel: Vorschriften für besondere Verarbeitungssituationen

10. Kapitel: Delegierte Rechtsakte und Durchführungsrechtsakte

11. Kapitel: Schlussbestimmungen


## Anwendungsbereich der DSGVO

### Unmittelbare Geltung der DSGVO
DSGVO ist Verordnung $\rightarrow$ in allen Teilen **verbindlich** und **unmittelbar** geltend. Keine weitere Umsetzungsakte (wie bei z.B. EU-Datenschutzrichtlinie)

Durch unmittelbare Geltung: **Anwendugnsvorrang**. \
Steht damit über nationalem Recht (d.h. auch BDSG). 

Enthält Öffnungs- und Spezifikationsklauseln, die Gestaltugnsspielräume eröffnen.

Daher auch als Hybrid zwischen Richtlinie und Verodnung bezeichnet.

Ziele der DSGVO in DE auf Bundesebene mit Neufassung des BDSGS (BDSG n.F.) erreicht. \
Bsp: § 26 BDSG n.F. (Öffnungsklausel in Art. 88 DSGVO) (im Beschäftigungskontext)

### Anwendugnsbereich
Voraussetzungen um anwendbar zu sein. Vor jeder datenschutzrechtlichen Prüfung allgemein fragen, ob Anwendungsbereich der DSGVO eröffnet ist.

Voraussetzungen unterscheiden sich nicht mehr wie in bisheriger Rechtslage, abhängig davon, ob die Datenverarbeitung druch öffentliche oder nicht-öffentliche Stelle erfolgt.

#### Räumlicher Anwendugnsbereich
> **Niederlassungsprinzip** (Art. 3 Abs. 1 DSGVO): das Vorhandensein einer Niederlassung in der Union ist maßgeblich. Der Ort der Datenverarbeitung ist unerheblich. Eine Niederlassung setzt "die effektive und tatsächliche Ausübung einer Tätigkeit durch eine feste Einrichtung" voraus.

Das bedeutet: Hat ein Verantwortlicher nur seinen Hauptsitz und mindestens eine Niederlassung in der Union, ist die DSGVO zu beachten. \
**Unabhängig** vom tatsächlichen **Ort** der Datenverarbeitung.

Hat der Verantwortlicher seinen Hauptsitz außerhalb und eine Niederlassung innerhalb der Union, sit die DSGVO anzuwenden, sofern die Datenverarbeitung im Rahmen der Tätigkeit der Niederlassung durchgeführt wird.

> **Marktortprinzip** (Art. 3 Abs. 2 DSGVO): DSGVO gilt auch, wenn die Datenverarbeitung durch eine nicht in der EU und dem EWR befindlichen Niederlassung vorgenommen wird.

Im Gegensatz zu Abs. 1 muss sich die Verarbeitung der personenbezogenen Daten darauf beziehen, dass sich die betroffene Person – auch nur kurzfristig, unabhängig von ihrer Staatsangehörigkeit – innerhalb der Union befindet. Unabhängig davon, ob die Daten in der EU verarbeitet werden.

##### Beispiel
Die Niederlassungen des Unternehmers U, welcher Sportartikel herstellt, befinden sich ausschließlich außerhalb der Union in den USA. Allerdings benutzt U das Gebiet der EU als Ort („Marktort“), um seine Artikel („Waren oder Dienstleistungen“) anzubieten und das Verhalten seiner Kunden zu beobachten, damit er seine Marktstrategien „ausbauen“ kann. Hierbei ist die DSGVO auch auf das Unternehmen des U – unabhängig vom Standort seiner Niederlassungen – anzuwenden. 

#### Geschützte Daten
DSGVO regelt Umgang mit **personenbezogenen Daten**.

::: indent-hanging
**Art. 4 Nr. 1 DSGVO**: „alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person“) beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, psychologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind“.
:::

#### Sachlicher Anwendungsbereich
DSGVO regelt ganz oder teilweise automatisierte Verarbeitung personenbezogener Daten. (nach Art. 2, Begriffe: Art 4 Nr. 2 DSGVO)

Die nicht-automatisierte Verarbeitung personenbezogener Daten, die nicht in einem Dateisystem gespeichert werden, fallen nicht unter den Anwendungsbereich der DSGVO.

**Dateisystem** (Art. 4 Nr. 6 DSGVO):

- jede strukturierte Sammlung personenbezogener Daten
- nach bestimmten Kriterien zugänglich 
- unabhängig davon, ob zentral, dezentral oder nach funktionalen oder geografischen Gesichtspunkgen geordnet durchgeführt wird

Umfasst manuelle (Akten) und digitale Sammlungen von Daten. Gleichartiger Aufbau, einheitliche Gestaltung der Sammlungen erfordert.


## Erlaubnistatbestände
Auflistung: Art. 6 - 11 DSGVO

### Allgemeines
> **Verbot mit Erlaubnisvorbehalt** (6 Abs. 1 lit a): Verarbeitung grundsätzlich verboten; nur rechtmäßig mit Einwilligung oder sonstige erlaubende Rechtsgrundlage.

#### Einwilligung
Als Ausdruck der Selbstbestimmung ist Einwilligung der betroffenen Person in die DV möglich.

::: indent-hanging
**Art. 4 Ne. 11 DSGVO**: Einwilligung bezeichnet jede freiwillig für bestimmten Fall in informativer Weise und unmissverständlich abgegebene Willenserklärung in Form einer Erklärung oder sonstigen Handlung, mit der sie zu verstehen gibt mit DV einverstanden zu sein.
:::

#### Weitere Erlaubnistatbestände
Bsp.: Gemäß Art. 6 Abs. 1 lit f DSGVO wird eine DV zur Wahrung berechtigter Interessen des Verantowortlichen oder eines Dritten ermöglicht. 

DV muss erforderlich und im Rahmen einer Verhältnismäßigkeitsprüfung angemessen sein.

### Verarbeitung besonderer Katergorien personenbezogener Daten
> Bei DV **besonderer Kategorien** (z.B. Gesundheitsdaten): generelles **Datenverarbeitungsverbot** (Art. 9 Abs. 1 DSGVO). Absatz 2 enthält abschließende Aufzählung verschiedener Ausnahmefälle des Abs. 1.

### Auftragsverarbeitung
- **Auftragsverarbeiter**: natürliche oder juristische Person, Behörden oder andere Stellen, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeiten
- **Auftragsverarbeitung**: Erheben, Verarbeiten, Nutzen von persbez. Daten durch Aruftragsverarbeiter der für Datenverarbeitung verantwortlichen (Auf Vertragsgrundlage)
  - häufig im Geschäftsleben relevant (z.B. Ablegen von Daten in Cloud)
  - Cloud Speichern fällt auch - wenn DSGBVO anwendbar ist - unter Art. 18 DSGVO
  - Nutzer der Cloud-Services ist selbst für Einhaltung der Vorschriften über Datenschutz verantwortlich => Cloud-Anbieter sorgfältig auswählen



## Rechte und Pflichten

### Rechte des Betroffenen
Jeder nat. Person, deren Daten durch einen Verantwortlichen verarbeitet werden stehen folgende Rechte zu (Art. 13 ff. DSGVO):

- **Informationspflichten** (13, 14)
- **Auskunftsrecht** (15): Recht zu erfahren, ob persbez. Daten verarbeitet werden und unter welchen Umständen 
- Recht auf **Vergessenwerden** (17): Unternehmen müssen persbez Daten auf Wunsch des Betroffenen Löschen
- Recht auf **Datenübertragbarkeit** (20): Betroffene können betreffenden Daten von einem Dienstleister zu anderem Netzwerk mitnehmen $\rightarrow$ mehr Kontrolle über Daten
- **Widerspruchsrecht** (21): Recht auf Einschränkung der Verarbeitung und das Recht auf Berichtigung. 

### Pflichten der Verantwortlichen
Dem stehen folgende Pflichen des Verantwortlichen gegenüber:

- Der Verantwortliche trägt volle **Verantwortung** für die persbez. Daten
- Der Verantwortliche wird verpflichtet, die technischen und organisatorischen Maßnahmen unter Berücksichtigung seiner als auch der Interessen des Betroffenen (Risikoabschätzung) so auszurichten, dass die Datenschutzgrundsätze wirksam umgesetzt werden.
- Interne Maßnahmen sollen vor und während der Datenverarbeitung insb. durch datenschutzfreundliche Voreinstellungen (privacy by default) und den Grundsatz des Datenschutzes durch Technik (privacy by design) sichergestellt werden.
- Meldungen von **Datenschutzverletzungen** nach Art. 33 DSGVO an die Aufsichtsbehörde
- **Dokumentationspflicht** (Verzeichenn aller Verarbeitungstätigkeiten unter seiner Zuständigkeit)
- Datenschutz-**Folgeabschätzung** bei Verarbeitungsvorgängen mit hohem Risiko für die Rechte und Freiheiten natürlicher Personen (Art. 35)
- Ggfs. das Benennen eines **Datenschutzbeauftragten** (Art. 37 DSGVO)


### Rechtsfolgen - Schadensersatz
> **Schadensersatzanspruch** nach Art. 82 Abs. 1 DSGVO. 
>
> Jede Person, die bei Verstoß gegen die DSGVO bei DV materiellen oder immateriellen Schaden erleidet, kann Anspruch auf Schadensersatz gegen den Verantwortlichen oder den Auftragsverarbeiter geltend machen
 
Voraussetzungen für Anspruch:

- ein Verstoß gegen die DSGVO,
- ein materieller oder immaterieller Schaden und
- ein Verschulden des Verantwortlichen oder des Auftragsverarbeiters (Nachweispflicht des Verarbeiters, Art. 82 Abs. 3 DSGVO)

Bei Verstößen Bußgelder von bis zu 20 Mio Euro oder bis zu 4% ihres weltweiten Jahresumsatzes.


### Rechtsfolgen - Strafbarkeit
> **Strafbarkeit** als Rechtsfolge unzulässiger Datenverarbeitungen nach Art. 84 DSGVO i.V.m. § 42 BDSG 

Auch Tatbestände im StGB: §§ 202a und 203 StGB.

#### Ausspähen von Daten
§ 202a StGB stellt das **Ausspähen von Daten**, die besonders gesichert sind, unter Strafe.

"Verschaffen des Zugangs": Kopieren einer Datei auf eigenen Datenträger oder Abfotografieren von sichtbar gemachten Daten.

Unter § 202a StGB fällt auch das sog. **Phishing** (Identitätsdiebstahl). Gilt jedoch nicht, wenn Opfer seine Daten dem Täter selbst übermittelt.

Daten sind nicht für Täter bestimmt, wenn dieser nach Willen des Berechtigten keinen Zugang zu ihnen haben soll.

Als taugliche Zugangssicherungen gelten Erkennungsgeräte (z.B. Fingerabdruck), sowie Passwörter und Datenverschlüsselungen

#### Verletzung von Privathegeimnissen
Nach [§ 203 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__203.html) strafbar, wer unbefugt ein fremdes Geheimnis, namemtlich ein zum persönlichen Lebensbereich gehörendes Geheimnis oder ein Betriebs-/Geschäftsgeheimnis offenbart.
Diese Geheimnis muss ihm als Angehöriger einer bestimmten Berufsgruppe (Arzt, Anwalt) anvertraut worden sein.

> **Geheimnis**: Tatsachen, die nur einem bestimmten Personenkreis bekannt sind und an deren Geheimhaltung derjenige, den sie betreffen, ein von seinem Standort aus sachlich begründetes Interesse hat oder bei eigener Kenntnis der Tatsachen haben würde.

Es muss dabei ein innerer Zusammenhang mit der Ausübung des Berufs bestehen und das Geheimnis muss unbefugter Weise an einen anderen gelangt sein.

::: indent-hanging
**§ 203 Abs. 2a StGB**: Ein Datenschutzbeauftragter macht sich strafbar, wenn er unbefugt ein fremdes Geheimnis offenbart, von denen er im Rahmen seiner Tätigkeit als solcher Kenntnis erlangt. Das Geheimnis muss dabei nicht ihm selbst, sondern einem Angehörigen der in § 203 Abs. 1 und 2 StGB genannten Berufsgruppen anvertraut oder bekannt geworden sein. $\rightarrow$ **Abgeleitete Verschwiegenheitspflicht**
:::

## Datensicherheit
> **Technisches Ziel**, Daten jeglicher Art in ausreichendem Maße vor Missbrauch, Verlust, Manipulation und anderen Bedrohungen zu schützen.

Datenschutz schützt die Menschen.
Gesellschaft ist Informationsgesellschaft $\rightarrow$ Daten $\equiv$ Macht $\rightarrow$ umkämpft

Hinreichende Datnsicherung ist Voraussetzung für effektiven Datenschutz.

Verhältnis Datensicherheit - Datenschutz: **akzessorisch**. $\rightarrow$ Datensicherheit als Instrument des Datenschutzes gesetzlich geregelt. (z.B. in Art. 5 Abs. 1 lit. f und Art. 32 DSGVO)

Für Datensicherheit u.A. folgende Schutzmöglichkeiten:

- Pseudonymisierung und Verschlüsselung
- Zugangs- und Zugriffsschutz
- Message Authentication Codes
- Digitale Signaturen zum erkennen von Verfälschungen, Heterogenität



## Herausforderungen durch die Autonomik
Bei autonomer DV ist zu prüfen, welche Rechtsgrundlage zu beachten ist. Bisher keine Spezielregelung von Datenschutzrichtlinien für autonome Systeme.

Grundsätzlich gilt, dass personenbezogene Daten **nur dann erhoben**, verarbeitet oder gespeichert werden dürfen, wenn der Betroffene dem zustimmt oder eine gesetzliche Regelung es **erlaubt**. 

Bsp: Angestellter muss Verarbeitung zustimmen. Auch im Rahmen eines Arbeitsvertrags möglich.

Für bessere Mensch-Maschine-Kooperation und Vermeidung von Haftungsfällen $\rightarrow$ automatisierte Maschinen und Geräte mit **zahlreichen Sensoren** ausgerüstet, die in **großem Umfang** **Umgebungsdaten aufnehmen**, verarbeiten, speichern und sichern. 

Vielzahl der aufgenommenen Daten $\rightarrow$ erhebliche datenschutzrechtliche Probleme.
Zunächst bei Schutz der **Arbeitnehmerdaten**. Unter Umständen wird deren **Arbeitsleben** (Pausenzeiten, Bewegungsmuster) umfassend aufgezeichnet. Zur Leigitmation besondere Vereinbarungen nötig.

Probleme im Ungang personenbezogener Daten Dritter, wenn diese (unausweichlich) ebenfalls aufgezeichnet werden.
Die Einhaltung der dem BDSG zugrundeliegenden Prinzipien (_Datensparsamkeit und Zweckbindung_) werden dann problematisch, wenn die datenaufnehmenden teilautonomen Systeme über das Internet verknüpft sind.

Z.B. bei „Big Data“ werden aus größtmöglichen Datenmengen mittels zweckmäßiger Analysen **Prognosen** u.a. über das **Verhalten** von Personen(-gruppen) abgeleitet. $\rightarrow$ direkter **Widerspruch** zu den Prinzipien der _Datensparsamkeit_ und _Zweckbindung_.

Nun möglich aus großen Datenmengen tragfähige Prognosen über Verhalten einzelner Personen zu formulieren $\rightarrow$ Konzept der _„personenbezogenen Daten“_ selbst **fragwürdig**.

Heute jedes Datum, jede von Computern analysierbare Information, auf konkrete Personen beziehbar und damit „personenbezogen“. \
$\rightarrow$ Kategoriale **Unterscheidung** zwischen _„personenbezogenen“_ und _„nicht personenbezogenen“_ Daten und damit die wesentliche Grundlage des bisherigen Datenschutzrechts **fragwürdig**. 

Dazu ähnliche Probleme wie beim Cloud-Computing: Daten dürfen nicht beliebig outgesourct werden. Die Datenübertragung unterliegt vielmehr – auch wenn sie im Rahmen einer Auftragsdatenverarbeitung erfolgt – engen rechtlichen Beschränkungen bis hin zur strafrechtlichen Haftung.

Problematisch auch der Umgang mit sensiblen Unternehmensdaten, die nicht nur in der vernetzten Fabrik sondern auch bei Vertragspartnern bereitgestellt werden müssen. \
$\rightarrow$ weitreichenden _Verteilung von Unternehmensdaten_ \
$\rightarrow$ geeignete Maßnahmen zur _Absicherung der Kommunikation_ und zum Schutz der Dateninhalte. 

Beispielsweise **technische Sicherungsmaßnahmen** (Zugangskontrollen und Einsatz starker Verschlüsselung) und entsprechende **vertragliche Vereinbarungen** (insb. mit Outsourcing-Partnern und Zulieferern).


## Relevante Urteile

::: definition
BVerfG (1983), Volkszählungsurteil:

Mit Recht auf informationelle Selbstbestimmung wären eine Gesellschaftsordnung und eine diese ermöglichende Rechtsordnung nicht vereinbar, in der Bürger nicht mehr wissen können, wer was wann und bei welcher Gelegenheit über sie weiß. \
Bei Unsicherheit über Dokumentation abweichender Ver
haltensweisen, wird versucht nicht durch diese Verhaltensweisen aufzufallen. Dies würde indiv. Entfaltungschancen und Gemeinwohl beeinträchtigen, da Selbstbestimmung eine elementare Funktionsbedinung eines auf Handlungs- und Mitwirkungsfähigkeit seiner Bürger begründeten Gemeinwesens ist. \
-> Schutz d. Einzelnen gg. unbegrenzte Erhebung, Speicherung und Verwendung persbez. Daten. \
-> Grundrecht: Befugnis d. Einzelnen über Preisgabe/Verwendung der pers. Daten seiner selbst zu bestimmen.
:::

::: definition
BGH (1984), Berechtigtes Interesse:

weniger als rechtliches Interesse (wirtschaftl. Interesse kann genügen) \
berechtigtes Interesse nur insofern und soweit Kenntnis über Daten für die von dem Empfänger beabsichtigte Ziele und Zwecke erforderlich ist. \
Es fehlt somit immer bezügl. solcher Informationen, die der Emfänger nicht benötigt.
:::

::: definition 
BAG (1979), technische Einrichtung:

Fahrtenschreiber ist eine technische Einrichtung \
Ist auf obj. Eignung der Einrichtung zur Überwachung von Arbeitnehmern abzustellen; nicht etwa auf subj. zielsetzung des Arbeitgebers bei der die Überwachung von Arbeitnehmern nur ein (unbeabsichtigter) Nebeneffekt sein kann.
:::

::: definition 
BAG (1983), Überwachung:

Vorgang, durch den Informationen über Verhalten oder Leistung des Arbeitnehmers erhoben und i.d.R. aufgezeichnet werden, damit diese Informationen auch der menschlichen Wahrnehmung zugänglich gemacht werden. \
Bildschirmgerät mit Rechner zur Überwachung aber nur anhand der verwendeten Programme zu beantworten. \
Erst ein Programm, das solche Daten erfasst und Aufzeichnet lässt Bildschirmgeräte und Rechner zur Überwachung eignen.
:::

## Fallbeispiele zum Datenschutz


# Fahrassistenzsysteme im Straßenverkehr

## Einführung
**Vorteile** (teil-)autonomer Fahrzuege

- Steigerung der Verkehrssicherheit (keine Flüchtigkeitsfehler, Ermüdung)
- Erheblicher Komfortgewinn für den Fahrer
- Verbesserte Mobilität für nicht fahrtüchtige Personen (Behinderte, Akte, Kranke)

### Problem
> Für Hersteller und Nutzer essentiell auf verlässlichen **normativen Rahmen** angewiesen. (um zu wissen welche Anforderungen ein System erfüllen muss und wer für Schäden einsteht)

Frage der Vereinbarkeit von Fahrassistenzsystemen mit geltendem Recht.

## Verkehrs- und Zulassungsrecht

### Die 5 Stufen der Automatisierung
Für sinnvolle rechtliche Differenzierung:

- Stufe 0: **Driver Only** - Fahrer führt Quer- und Längsführung aus
- Stufe 1: **Assistiert** - Fahrer führt Quer- oder Längsführung aus, die andere wird in Grenzen vom Assistenzsystem ausgeführt.
- Stufe 2: **Teilautomatisiert** - System übernimmt für gewissen Zeitraum oder Situation Quer- und Längsführung, Fahrer muss das Sytem überwachen und Steuerung jederzeut übernehmen können.
- Stufe 3: **Hochautomatisiert** - System übernimmt für gewissen Zeitraum oder Situation Quer- und Längsführung, Fahrer muss nicht mehr dauerhaft überwachen, Übernahme erst nach Aufforderung mit Zeitreserve.
- Stufe 4: **Vollautomatisiert** - System übernimmt Quer- und Längssteuerung vollständig in definiertem Anwendungsfall, Fahrer muss nicht überwachen, bei Ausbleiben der Übernahme überführt das System selbsttätig in risikominimalen Zustand.
- Stufe 5: **Fahrerlos** - Ssytem übernimmt Fahraufgabe vollumfänglich bei allen Bedingungen

Der autonomisierung standen bislang 2 Hürden entgegen:

### Hürde 1: Unionsrechtliche Vorgaben der RL 2007/46/EG
In Deutschland nur Betreiben von zugelassenen Kraftfahrzeugen. $\rightarrow$ Prüfung, ob Fahrzeug genehmigtem Typ entspricht.

EG-Typengenehmigung (RL 2007/46/EG) verweist in Anhang IV auf die sog. UN/ECE-Regeln, welche die _technischen Anforderungen_ statuieren.

Für auomatisiertes Fahren relevant: EDE-Regeln 13-H (Bremsen) und 79 (Lenken)

ECE-Regel 13-H steht automatisierten Bremsung nicht entgegen. \
Nach **ECE-Regel 79**, liegt aber die Hauptverantwortung für Lenkung immer beim **Fahrzeugführer**. \
Eine automatisierte Lenkung ist nur bei niedrigen Geschwindigkeiten (< 12 km/h) und Parkvorgängen zulässig. 

Nach diesen Richtlinien sind Fahrzeuge der Automatisierungsstufe 3-5 nach Unionsrecht **nicht zulassungsfähig**.


### Hürde 2: Das sog. Wiener Übereinkommen über den Straßenverkehr von 1968
BRD 1968 in WÜ Verpflichtung zu Verkehrs- und Zulassungsregeln: 

$\rightarrow$ Übertragen der Vorgaben der WÜ in StVO $\rightarrow$ Automatisiertes Fahren nur möglich, wenn auch in WÜ zulässig

Problematisch nach Art. 8 Abs. 5 und Art. 13 Abs. 1 S. 1 WÜ und § 3 StVO der Führer sein Fahrzeug ständig beherrschen bzw. in der Lage sein muss, alle ihm obliegenden Fahrbewegungen auszuführen. \
Straßenverkehrsrecht nach Leitbild eines menschengesteuerten Fahrzeugs. Schöpfer des Automobilrechts haben autonome Fahrzeuge nicht vorhergesehen.

Viele sehen Fahrer als verpflichtet an Assistenzsysteme zu überwachen. \
Sinn der Autonomie im Fahrzeug ist aber Einstellung der Beobachtung des Verkehrs und Nebentätigkeit.

Autonome Fahrzeuge die vom Fahrer nicht ständig überwacht werden müssen, sind nach WÜ genauso wenig vereinbar wie mit den ECE-Regeln.


#### Relevante Normen
Art. 1 WÜ: **Begriffsbestimmung**

::: indent
v) "Führer" ist jede Person, die ein KFZ oder anders Fahrzeug lenkt.
:::

Art. 8 WÜ: **Führer**

::: indent
\(1\) Jedes Fahrzeug und miteinander verbundene Fahrzeuge müssen, wenn sie in Bewegung sind, einen Führer haben. \
(5) Jeder Führer muss dauernd sein Fahrzeug beherrschen können. \
(6) Der Führer eines Fahrzeugs muss alle anderen Tätigkeiten als das Führen seines Fahrzeugs vermeiden.
:::

Art. 13 WÜ: **Geschwindigkeit und Abstand zwischen Fahrzeugen**

::: indent
\(1\) Jeder Fahrzeugführer muss unter allen Umständen sein Fahrzeug beherrschen, um den Sorgfaltspflichten genügen zu können und um ständig in der Lage zu sein, alle ihm obliegenden Fahrbewegungen auszuführen.
:::

§ 3 StVO: **Geschwindigkeit**

::: indent
\(1\) Wer ein Fahrzeug führt, darf nur so schnell fahren, dass das Fahrzeug ständig beherrscht wird.
:::


## Änderungen des Wiener Übereinkommens März 2016

### Änderung 
> Zur Überwindung der Hürden März 2016 folgende Änderungen des WÜ: \
Art. 8 WÜ wurde um Absatz 5bis ergänzt.

$\rightarrow$ problematischen Anforderungen der Art. 8 Abs. 5 und 13 Abs. 1 WÜ nun erfüllt, wenn ein Fahrzeugsystem entweder die Anforderungen der **ECE-Regeln erfüllt** oder durch den Fahrer **übersteuerbar oder abschaltbar** ist.

Führer muss nicht ständig zur Übersteuerung in der Lage sein; es genügt die theoreische Möglichkeit.

Art. 8 Abs. 5 und 13 Abs. 1 keine Hürden mehr für Einführung automatisierter Fahrzeuge i.S.d. Stufen 3 und 4, da sie Führer **Nebentätigkeiten gestatten**.

Weiterhin ausgeschlossen: gänzlich vollautonome Fahrzeuge (Stufe 5) $\leftarrow$ nach Art. Abs. 1 WÜ muss ein **menschlicher Fahrer vorhanden sein**


### Ausblick
Die Änderung des WÜ als Zäsur auf dem Weg zu autonomen Fahrzeugen (Wiener Übereinkommen und Vorgaben der ECE-Regel 79).

Zukünftig sind beliebige mit den ECE-Regeln zu vereinbarende Fahrzeuge auch nach dem WÜ als zulässig und benutzbar anzusehen. 

Die Grundsatzentscheidung über die generelle Zulässigkeit automatisierter Fahrzeuge ist also vorrangig im europäischen Recht zu treffen.

Momentan enthält die ECE-Regel 79 zwar ähnliche Einschränkungen wie das WÜ. Aber zeitnahe Änderung und Anpassung an technischen Fortschritt zu erwarten.



## Rechtliche Auswirkungen des Betriebs von automatisierten Fahrzeugen auf die zivilrehtliche Haftung


### Zivilrechtliche Haftung im Straßenverkehr nach aktuellem Stand
Erinnerung: 

- Fahrzeughalter haftet verschuldensunabhängig für durch Fahrzeug verursachte Schäden (**Gefährdungshaftung**, § 7 Abs. 1 StVO)
- Farzeugführer muss nur für vermutetes Verschulden einstehen und kann sich exkulpieren, wenn er den Unfall nicht verschuldet hat (§ 18 Abs. 1 S. 2 StVO)

Zur Deckung aller Schäden ist Halter zum Abschluss einer **Versicherung** für sich und Fahrer verpflichtet (§ 1 PflVG).

Sofern Unfall durch **Fahrzeugfehler** verursacht, kann Versicherung beim **Hersteller** schadlos halten, welcher nach _Produkt- und Produzentenhaftung_ haftet.

Halter und Versicherung haften hauptsächlich für Fahrfehler; Hersteller dagegen für Produktionsfehler

Bislang Unfälle: 

- 90% wg. menschlicher Fehler
- 9% wg. umweltbedingten Ursachen
- nur 1% wg. technischem Versagen oder Wartungsmängel

Haftung des Herstellers nur bei techn. Versagen also weniger als 1% der Unfälle in Betracht.


### Haftungsverschiebung
Bei automatisierter Steuerung: Haftungsverschiebung.

Bei jedem Unfall Frage: Hersteller verantwortlich wegen Produktfehler? Z.B. als Konstruktionsfehler der Steuerung.

> **Konstruktionsfehler**: Produkt infolge fehlerhfafter Konzeption oder Planung für gefahrlose Benutzung ungeeignet

Hersteller müsste somit für bislang vom Fahrer zu verantwortenden Steuerungsfehler aufkommen.

Selbst bei erwarteter deutlichen Abnahme der Gesamtzahl an Unfällen ist enorme Haftungsverschiebung zu erwarten.


### Rechtsunsicherheit
Einführung automatisierter Fahrzeuge unter bestehendem Haftungsregime -> Rechtsunsicherheit

Im Schadensfall: ist besimmter Fahrfehler der automatisierten Steuerung ein Produktfehler?


### Beweisschwierigkeit
Teilautomatisierte Fahrzeuge bewältigen zunächst nur bestimmte Situationen und können übersteuert weren.

-> Fahrfehler kann entweder durch Fahrzeug selbst oder auch durch Fahrer verursacht werden.

Halter bzw. Hersteller müssten beweisen, dass der jeweils andere für Schaden verantwortlich. -> **Beweisschwierigkeit**

Auch bei vollautonomen Fahrzeugen, da Fahrer evtl. Nebentätigkeiten nachgehen und Unfallhergang nicht schildern können.

-> **Unfalldatenspeicherung** für nachträgliche Rekonstuktion



## Relevante Urteile



## Fallbeispiele


AG (München, 2007):
: Bei Benutzung eines Fahrzeugs (insb. beim Rückwärtsfahren) sind hohe Anforderungen an Sorgfaltsmaßstab des Fahrers zu stellen. Dieser darf sich nicht auf Einparkhilfe verlassen. Er muss zusätzlich durch eigene Beobachtung sichergehen, dass Rückwärtsfahren möglich.


BGH (2013):
: Verkehrsraum ist öffentlich, wenn er für jedermann oder zumindest bestimme größere Personengruppen zur Benutzung zugelassen ist und so genutzt wird. Öffentlichkeit des Verkehrsraums endet mit eindeutigen, manifestierten Handlung des Verfügungsberechtigten, die erkennbar macht, dass öffentlicher Verkehr nicht (mehr) gedultet ist.

# Providerhaftung


## Einführung
Einfache Anonymität im Internet -> Verletzter kann sich nicht direkt an Schädiger wenden

Verletzter hat Möglichkeit, sich mit seinen Abwehransprüchen an die Internet-Anbieter (Provider) zu wenden, welche "Zugangstor" zum WWW darstellen.

Zu jeden Kommunikationsvorgang im Internet sind immer mehrere (nat. und jur.) Personen involviert.

Beispiel Website: 5 Personen

1. Anbieter: muss Datei auf Webserver hochladen
2. Network-Provider: ermöglicht dem Anbieter Dateien auf Webserver zu übertragen
3. Host-Service-Provider: stellt dem Anbieter den Notwendigen Speicherplatz auf Webserver zur Verfügung
4. Nutzer: greift für Abruf der Daten auf den
5. Access-Provider zurück, der über den Nutzer Verbindung mit Internet herstellt.

Beteiligung mehrerer Personen problematisch wenn rechtswidrige Inhalte verbreitet werden.

Wer ist für Kommunikationsvorgang verantwortlich?



## Telemediengesetz (TMG)
> Das TMG regelt seit 2007 die **Verantwortlichkeit** von Internet-Providern

> **Provider** (§ 2 Nr. 1 TMG): jede natürliche oder juristische Person, die eigene oder fremde Telemedien zur Nutzung bereithält oder Zugang zur Nutzung vermittelt.

- Gibt funktionale Einteilung der Anbieter vor. 
- Telekomm.-Unternehmen vereinen häufig sämtliche Anbieterfunkitonen, weshalb sich Tätigkeiten meist überschneiden
- Zur Verantwortlichkeitsermittlung des Providers ist im konkreten Fall nicht abstrakt auf Status sondern konkret auf die jeweilige Tätigkeit abzustellen.



### Provider-Typen
TMG unterscheidet folgende Provider:

- **Access-Provider**: Anbieter des Zugangs zur Nutzung fremder Inhalte (Betrieb von Rechnern, über die Nutzer Zugang zum Internet erhält)
- **Network-Provider**: Anbieter, die fremde Informationen in Kommunikationsnetz übermitteln (Betrieb von Daten-Leitungen)

=> Beide nur an **Durchleitung von informationen** beteiligt (§ 8 TMG).


<!-- ::: note
**Randnotiz**

Über die Geschichte des Gesetzes. Es ist nämlich 2016 in Wien entstanden und später verdreifacht.
::: -->

- **Content-Provider**: Anbieter eigener Informationen auf eigenen Servern, Servern von Online-Diensten oder Host-Service-Providern bereithalten. Inhaber einer Website ist auch ein Inhalts-Anbieter.
- **Host-Service-Provider**: Anbieter fremder Informationen auf eigenem Server. (Stellt z.B. Anbieter einer Website Speicherplatz auf einem Server zur Verfügung)



### Nutzer
> Natürliche oder juristische Person, die **Telemedien in Anspruch** nehmen, insb. um Informationen zu erlangen oder zugänglich zu machen (§ 2 Nr. 3 TMG)

Es besteht kein Ausschlussverhältnis von Nutzer und Anbieter \
z.B. ist auch der Content-Provider ein Nutzer, sofern er seine Inhalte auf Servern eines Host-Service-Providers speichert. Ode der Host-Provider ist Nutzer, sobald er die Leistung eines Network-Providers in Anspruch nimmt.

Hier ist Anbieter auch gleich Nutzer.


### Einzelfälle
Frage der Verantwortlichkeit bei Nutzung von **nicht heimischen** Rechnern (CIP-Pool, Internet-Café) 

Indem sie die Nutzung der Rechner gestatten könnten sie den Zugang vermitteln.

Allerdings folgender Unterschied zu Anbietern: Anbieter sind im Sinne des TMG Bestandteile des Netzes, wohingegen die Betreiber z.B. eines Internet-Cafés "außerhalb" des Nutzers stehen.

Letztere vermitteln nicht den **Zugang zur Nutzung**, sondern die **Nutzung eines Zugangs**. Gleiches gilt für Inhaber eines ungesicherten WLAN.

TMG gilt auch für Inhaber privater Websiten, welche als Nutzer Anbieterdienste in Anspruch nehmen und selbst Anbieter Telemedien offerieren.



## Verantwortlichkeit der Anbieter nach dem TMG
> Die Verantwortlichkeit der Provider (rechtliches Einstehenmüssen) ist in §§ 7-10 TMG geregelt

- Normen des TMG keine selbstständigen Anspruchsgrundlagen der Provider
- Haftungsgrundlagen ergeben sich aus allgemeinen Regelungen (Strafrecht, Bürgerliches Recht und Öffentliches Recht)
- TMG bestimmt lediglich unter welchen Voraussetzungen für welche Anbieter eine Haftung nach allg. Vorschriften in Betracht kommt
- Sofern eine Regelung des TMG eingreift, scheidet eine Haftung des Providers nach den allgemeinen Regelungen aus.
-> Damit wird die Verantwortlichkeit durch das TMG nicht begründet, sondern vielmehr beschränkt


> **Abgestuftes Haftungsprinzip**: Je näher ein Anbieter bestimmten Informationen im Internet steht, desto eher soll er für diese Informationen rechtlich verantwortlich sein.

Der Haftungsumfang richtet sich demnach als welcher Provider-Typ der Anbieter gehandelt hat.

- _Content-Provider_ nach allg. Gesetzen für eigene Informationen, die sie zur Nutzung bereithalten, **voll verantwortlich** (§ 7 Abs. 1 TMG) \
  - Haftet also für eigene als auch für von ihm zu verantwortende veröffentlichte rechtsverletzende Inhalte; keine Unterschiede zu Offline-Medien
- _Host-Provider_ grundsätzlich nicht für fremde, rechtswidrige Inhalte verantwortlich (§ 10 TMG) \
  - entscheidend: bei den Inhalten handelt es sich nicht um ein eigenes Angebot des Anbieters \
  - Privilegierung greift nur, wenn Anbieter **keine Kenntnis** von rechtswidrigen Inhalten hat (§ 10 Satz 1 Nr. 1 TMG) \
  - Privilegierung bei **Kenntnis** nur, wenn **unverzüglich** Informationen entfernt oder Zugang gesperrt wird \
  - Dabei genügt der ernsthafte Versuch
  - Trotz Verpflichtung zu Tätigwerden bei Kenntnis keine Überwachungspflicht (§ 7 Abs. 2 TMG)
  - Zur Bejahung der Kenntnis muss dem Anbieter die genaue Fundstelle des rechtswidrigen Inhalts bekannt sein
- _Access- und Network-Provider_ sind grundsätzlich **nicht verantwortlich** (§ 8 TMG)
  - § 8 Abs. 1 TMG privilegiert die reine Durchreichung von Informationen
  - Anbieter haften grundsätzlich nicht für die Durchleitung fremder Informationen, sofern sie
    - die Übermittlung nicht veranlasst, 
    - den Adressaten der übermittelten Informationen nicht ausgewählt und
    - die übermittelten Informationen nicht ausgewählt oder verändert haben.
  - _Kenntnis_ über Inhalte unerheblich
  - Privileg entfällt bei absichtlicher _Zusammenarbeit_ des Anbieters mit einem Nutzer seines Dienstes, um rechtswidrige Handlungen zu begehen
- _Caching-Provider_ sind unter **bestimmten Voraussetzungen** nicht verantwortlich (§ 9 TMG)
  - Verantwortlichkeit bei automatischer kurzzeitiger Zwischenspeicherug geregelt in § 8 Abs. 2 und § 9 TMG

### § 8 Abs. 2 TMG: Zwishenspeicherung im Rahmen der Zugangsvermittlung
> Dienstanbieter grundsätzlich nicht für fremde Informationen verantwortlich, die automatisch kurzzeitig zwishengespeichert werden, wenn Speicherung **nur zur Übermittlung** im Kommunikationsnetz geschieht und nicht länger als erforderlich ist.

Speicherung wenige Stunden &rarr; sonst Durchleitung verneint und nicht privilegiertes Bereithalten von Informationen bejahen

Kurzzeitige Zwischenspeicherung nach § 8 Abs. 2 TMG verweiset auch auf Abs. 1, daher müssen auch die Bedingungen einer Durchleitung gelten. (Übermittlung, Adressat und Inhalt nicht selbst bestimmt)

### § 9 TMG: Zwishenspeicherung in Proxy-Cache-Servern
> Anbieter Gemäß § 9 Satz 1 TMG für automatische, zeitlich begrenzte Zwischenspeicherung, die allein der Effizienz der Übermittlung fremder Informationen dient (sog. Proxy-Caching), unter best. Voraussetzungen **nicht verantwortlich**.

Voraussetzungen für Privilegierung in § 9 Abs. 1 Nr. 1 bis 5 TMG geregelt (z.B. nicht Verändern der Informationen)

Privilegierung entfällt auch hier bei Zusammenarbeit  mit Nutzer, um rechtswidrige Handlungen zu begehen

### Sonderfall Hyperlinks
> Verantwortlichkeitsregeln des TMG sind auf Hyperlinks **nicht anwendbar**

Unabhängig davon, ob verknüpfte Inhalte für Linksetzenden als eigene oder fremde gelten.

Grund: Wortlaug §§ 8 ff. TMG und Wille des Gesetzgebers

Somit haftet der Linksetzende **nach allgemeinen Vorschriften**. I.d.R. wird er aber wegen fehlender Herrschaft über verlinkte Daten nur wegen Beihilfe strafbar sein

### Sonderfall Suchmaschinen
> Auch Suchmaschinen unterfallen **nicht** dem TMG und werden nach allgemeinen Vorschriften bewertet. 

Dies gilt auch für Metasuchmaschinen.


<br>
<br>
<br>
<br>
<br>


Thanks for reading.

Hope you enjoyed :wink:

<!-- :wink:

Esse aliquip tempor dolor est in velit mollit velit deserunt aliquip elit aute labore incididunt.

i. Ex culpa irure aliqua non tempor consectetur sunt deserunt amet.
i. Nostrud anim quis sunt Lorem ea duis eu ex ad anim ipsum.
i. Aliquip amet aute tempor sunt qui culpa laborum amet adipisicing deserunt magna veniam consequat.

sdf sd fsd fs df

a. Ut veniam aliqua occaecat sint excepteur qui id fugiat ipsum elit.
b. sdf sd fsdf
c. sdf sd fsd fs f

sd fsd fs df d

- [ ] Id labore laboris fugiat magna amet amet tempor.
- [X] Nostrud proident excepteur ea pariatur sit proident sint aliqua.
- [ ] Adipisicing laborum Lorem cupidatat sunt fugiat ipsum sint.

1) Two
2) Three
3.  Four
*   Five

Term 1

:   Definition 1




sddfgdfg sdfg dfg 


<table>
<tr>
<td>*one*</td>
<td>[a link](https://google.com)</td>
</tr>
</table>

Table: Here's the caption. It, too, may span
multiple lines.
Term 2 with **inline markup**

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2. -->

<!-- 
::: row
::: col
### Pro
Qui eu eiusmod officia cupidatat sunt laboris commodo incididunt et. Esse anim laboris commodo aliquip exercitation laboris eu. Nostrud ut fugiat quis quis sit ut voluptate labore duis minim adipisicing nulla enim. Adipisicing aliqua sit occaecat anim velit nisi nisi. Nostrud nulla officia pariatur magna aute qui esse elit dolor.
:::

::: col
### Contra
Magna fugiat consectetur incididunt adipisicing commodo aute anim culpa consectetur id voluptate commodo elit ipsum. Ea nostrud nostrud laborum tempor culpa officia esse ullamco non ipsum amet proident irure fugiat.
:::
:::



| Pro                           | Con                                      |
|-------------------------------|------------------------------------------|
| Es erlaubt einem dinge zu tun | es ist ziemlich bescheiden in den kosten |
| ein weiterer pro punkt        | ein weiterer minus mpuntk                |

 -->

