### Project Team
TP-21

### Project Description
Find the Right Primary School for Child. Explore, compare, and understand Victorian schools. We help migrant families make confident school choices.Use our simple map tool to search schools, see what they offer, and find the best fit for your child — academically, culturally, and practically.

### Project Technologies
- Frontend: vue, vite
- Backend: Python, flask 
- 
### Project Features
1. Home Page
   - Explore primary schools on a map.
   - Check whether the address is in the school zone according to location.
2. Compare Page
   - Compare schools.
3. Resource Page
   - developing...
4. Support Page
   - developing...
5. School Detail Page
   - school details

### Project File Structure
```
Frontend
tp21-main
├── .vscode
├── node_modules
├── public
├── src
│   ├── assets
│   │   └── images
│   │   └── main.css
│   │   └── journey.css
│   │   └── toast.css
│   ├── components
│   │   └── base
│   │     |   └──FooterTeam.vue
│   │     |   └──ModalBox.vue
│   │     |   └──NavBar.vue
│   │     |── chart
│   │     |   └── GenderBarChart.vue
│   │     |   └── GenderBarChartInDetailPage.vue
│   │     |   └── LanguageChart.vue
│   │     |   └── LanguageChartInDetailPage.vue
│   │     └── home
│   │     |   └── CompareSideBar.vue
│   │     |   └── HelpSection.vue
│   │     |   └── HeroSection.vue
│   │     |   └── MapShow.vue      
│   │     |   └── MapZShow.vue 
│   │     │── journey
│   │     │   └── CheckList.vue
│   │     │   └── JourneyMap.vue
│   │     │   └── QuestionList.vue  
│   │     └── support
│   │         └── FrequentAsk.vue 
│   │         
│   │         
│   │     
│   │
│   │
│   ├── locales
│   |   ├── en.js
│   |   └── zh.js
│   ├── router
│   │   └── index.js
│   ├── views
|   |   ├── findSchool
|   |   ├── JourneyMap
|   |   ├── QASupport
|   |   ├── HomeView.vue
│   │   └── LoginView.vue
|   |   
|   |   
│   ├── App.vue
│   ├── auth.js
│   └── main.js
├── .editorconfig
├── .env.development
├── .env.iter1
├── .env.iter2
├── .env.production
├── .gitattributes
├── .gitignore
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
└── vite.config.js
```


### Project Building process
This project follows an Agile development methodology and was executed over three iterations.

Iteration 1
Main pages: HomeView, CompareView
👉 You may refer to the corresponding implementation in the iteration1-dev branch of our GitHub repository for more technical details.



Iteration 2 

For implementation details of this iteration, please refer to the iteration2-dev branch in our GitHub repository.

Iteration 3

For implementation details of this iteration, please refer to the iteration3-dev branch in our GitHub repository.





### Project Support
##### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

##### Customize configuration
See [Vite Configuration Reference](https://vite.dev/config/).

##### Project Setup
```sh
npm install
```

##### Compile and Hot-Reload for Development
```sh
npm run dev
```

##### Compile and Minify for Production
```sh
npm run build
```

##### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```

### Third-Party API Integration

This project uses the following services to support map display and address lookup:

- **Mapbox API**  
  - **Features**: map rendering (vector tiles, static images), interactive markers, custom styles, geocoding  
  - **Use cases**: displaying school locations and boundaries on the map, highlighting selected items  

- **Google Places API**  
  - **Features**: place autocomplete, place details (name, address, coordinates, business hours, etc.)  
  - **Use cases**: offering real-time suggestions as users type an address or school name; retrieving full metadata for the selected place  

- **Geocoding API**  
  - **Features**: forward geocoding (address → coordinates), reverse geocoding (coordinates → address)  
  - **Use cases**:  
    - converting user-entered addresses into map coordinates and marking them on the map  
    - translating map clicks or device location data into human-readable addresses  

> **Notes:**  
> - Store all API credentials (access tokens / API keys) centrally (e.g. environment variables or a managed secrets service) to avoid hard-coding sensitive information.  

### Project License
This project is licensed under the MIT License.
