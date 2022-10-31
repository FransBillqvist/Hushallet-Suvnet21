# Inlämning 2- Hushållet

Hushållet- en app för att hålla koll på vilka sysslor som behöver göras i hemmet och vem som har utfört dom! Appen håller även koll på om någon syssla är sen med att göras.


## Skapad av:

- [Tom](https://github.com/Zaai90)
- [Frans](https://https://github.com/FransBillqvist)
- [Daniel T](https://https://github.com/DTSD21)
- [Lucas](https://github.com/LucBen93)
- [Fredrik](https://github.com/FredrikGro)

-[Länk till github-repot](https://github.com/FransBillqvist/Hushallet-Suvnet21)

## Förberedelser för att kunna köra programmet:

Du behöver ha `Node.js` installerat på din dator samt en smartphone alternativt android studio för att kunna testa applikationen.

```
$ git clone https://github.com/FransBillqvist/Hushallet-Suvnet21.git
$ npm install
```

## För att köra programmet:

```
$ npm start
```

Hushållet körs på `localhost:19000` som standard.

# Krav för godkänt

## Kravlista

- [/] En logga, splashscreen och appikon ska designas och användas. *
- [x] Applikationen ska byggas med RN, Expo & TS. *
- [/] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
med produktägare, godkännas och dokumenteras. *

## Hushåll

- [x] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet,
namnet ska gå att ändra. *

## Konto

- [x] En användare ska kunna registrera och logga in sig. *
- [x] En användare ska kunna skapa ett nytt hushåll. *

## Profil

- [x] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. *
- [x] En användare ska kunna ange sitt namn. *
- [x] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. *
- [x] Valda avatarer ska inte kunna väljas av andra användare i hushållet. *
- [x] Avataren ska användas i appen för att visa vad användaren har gjort. *

## Sysslor

- [x] En ägare ska kunna lägga till sysslor att göra i hemmet. *
- [x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en
vikt som beskriver hur energikrävande den är. *
- [x] En ägare ska kunna redigera en syssla. *

## Dagsvyn
- [x] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. *
- [] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar
sedan sysslan gjordes senast samt om den är försenad. *
- [x] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även
med ett enkelt tryck gå att markera sysslan som gjord. *

## Statistik

- [/] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt
hushåll. *
- [/] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt
fördelning av varje enskild syssla. *
- [x] Det ska finnas en statistikvy över ”nuvarande vecka”. *

# Avgränsningar

- Där vi skapar en syssla har vi vi lagt till en knapp där det står "välj" som du kan klicka på för att ändra "Återkommande" samt "Värde" då vi tyckte att det inte var tillräckligt solklart att du kunde klicka på dom för att ändra värdet i dom.