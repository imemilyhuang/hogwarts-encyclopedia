## CSE 204A Web Dev Final Project
I created a Hogwarts Encyclopedia that allows users to explore hundreds of characters, 
potions, and spells introduced in the best-selling *Harry Potter* series by J.K. Rowling.

### Visual Design
The project was styled using SCSS, and I incorporated backgrounds, colors, and effects on 
every single page. The app is responsive so that no matter the size of the screen you're 
viewing the site on, the content fits on the page well. For instance, the navbar items get
condensed into a hamburger menu at a certain breakpoint.

### Interactivity
You can navigate to any of these pages:
- **Landing Page:** /
- **Characters:** /characters
- **Potions:** /potions
- **Spells:** /spells
- I also created a **404 page** if the user tries to use a slug that doesn't exist.

Within the characters, potions, and spells subpages, there are search and filtering 
options, and you can also click on each card to flip it and view more details.

### API Usage
I used two external APIs for this project:
- [https://hp-api.onrender.com/api/characters](https://hp-api.onrender.com/api/characters) for characters
- [https://docs.potterdb.com/](https://docs.potterdb.com/) for [potions](https://docs.potterdb.com/resources/potions) and [spells](https://docs.potterdb.com/resources/spells)

