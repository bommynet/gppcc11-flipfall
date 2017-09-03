# '&lt;Flip Fall&gt;' f&uuml;r die Game++ #11 CC
Thema der GPPCC 11 - Thema 'Nach unten fallen'

## Idee meiner Frau

* Prinzip: Flipperkugel fällt nach unten
* Ziel: Falle so tief du kannst
* Hindernisse
    * ~~Platten - an denen du abprallst (Tempo runter)~~
    * 'Bumper' - die dich weg schleudern (Tempo links, rechts, rauf / extrem beschleunigt)
    * Flipper - die dich wieder nach oben katapultieren (Hindernisse von unten ignorieren?)
    * Fallen/Fallrohre - die dich fangen und das Spiel ist vorbei (?)
    * Fliegenfänger - verlangsamen dich eine Zeit lang
    * Stangen, Hütchen, Pinöpel - die dich abbremsen
    * Katapultflächen - die dich in eine bestimmte Richtung weg schießen
    * Schienen - die dich leiten und du so lange nicht steuern kannst
* Steuerung
    * mit Pfeiltasten o.ä.
    * Kugel wird in die gewünschte Richtung beschleunigt, nicht direkt bewegt
* Bonus
    * Combo-Punkte, wenn du fällst ohne etwas zu berühren
    * Tiefen-Punkte, je weiter du kommst desto mehr Punkte gibts (Faktor oder feste Bonuspunkte?)
    
    
## Steuerung und Bewegung
Der Spieler (Kugel) kann nur nach rechts und links bewegt werden.

Da die Kugel permanent fallen wird, kann dies auch durch eine Aufwärtsbewegung des Hintergrunds erreicht werden. Die Kugel hat also einen festen y-Wert und der Hintergrund bewegt sich.

So braucht das Spiel nur einen einzigen Bewegungsvektor, welcher die Geschwindigkeit vorgibt. An diesem können alle Objekte berechnet und positioniert werden. Der Spieler nur durch den x-Wert und alle Objekte und der Hintergrund durch den y-Wert.