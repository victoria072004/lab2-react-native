# Aplicație de Clasament cu Componente de Bază
![](lab-example.gif)
## Cerințe Generale
Creează o aplicație de clasament pentru a depista cel mai bun dintr-un set de obiecte.
Tematica e la liberă alegere.
### Configurare Proiect
- Crează un proiect nou `React Native` cu `Expo`.
- Folosește fișiere `.json` pentru a stoca obiectele.
### Stilizare & Interfață Utilizator (UI)
- Implementează stilizarea folosind `StyleSheet` , nu se permite alte librării externe de
stilizare
- Folosește componente de bază `React Native`: `View`, `Text`, `FlatList`, `Pressable`, `Image` , `ScrollView` ...
## Funcționalități
### 1. Sistemul de Clasament
Utilizatorii pot:
- Vizualiza la sfârșit clasamentul obiectelor pentru care a votat.
- Vota pentru obiectul preferat, având de făcut o alegeri a câte 2 până se ajunge la o
selecție finală.
### 2. Sistemul de Votare
Fiecare obiect are:
- Nume și descriere (descrierea e afișată la final pentru obiectul selectat).
- Imagine asociată
     
### 3. Panoul de Statistici
- Afișează istoricul selecției fiecărui utilizator.
- Inițial utilizatorul își include numele, pentru a putea fi salvat rezultatul, în caz că deja
acesta are o selecție, rezultatul e actualizat cu cel nou.

## Barem de notare
| Punctaj | Sarcina |
|---------|--------------------------------------------------------------------------------------------------------------|
| 0.5     | Crearea corectă a proiectului cu React Native și Expo|
| 0.5     | Utilizarea fișierelor JSON pentru salvarea obiectelor|
| 0.5       | Afișarea panoului de rezultate la final|
| 0.5       | Abilitatea de a începe iarăși clasamentul  |              
| 1       | Afișarea corectă a clasamentului cu selecțiile făcute pe parcurs|
| 1       | Crearea și utilizarea corectă a state-ului, efectelor secundare și context-ului, cât și a custom hook-urilor| 
| 2       | Implementarea corectă a logicii de selecție |
| 2        | Afișarea întregului clasament final |
| 2       | Utilizarea a cât mai multe componente de bază React Native|