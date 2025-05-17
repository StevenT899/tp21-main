## 👥 Project Team
**Team ID:** TP-21
**Project Name:** SchoolMate – Your School Search Companion
**Target Audience:** Migrant families in Victoria, Australia
**Live Website:** https://schoolmatetp21.click/
**Website Access**:
- Username: `user`
- Password: `tp21-newbee`
  
Our team is committed to building an intuitive platform that supports parents in navigating the local education system with confidence. The platform focuses on location-based school search, zone checking, comparison tools, and accessible bilingual information.

---
## 📘 Project Description
SchoolMate is an inclusive web application designed to support **migrant families in Victoria, Australia** with selecting and applying to primary schools. While Victoria offers a strong multicultural education system, many migrant parents face challenges such as fragmented information sources, language barriers, and unfamiliar school processes.
SchoolMate simplifies this experience by bringing together essential educational information — including school zones, enrolment procedures, and education pathways — into one accessible, bilingual platform.
##### 👨‍👩‍👧 Target Users
Our primary users are **migrant parents with primary-school-aged children** who:
- Are unfamiliar with the Victorian school system
- Encounter **language or cultural barriers**
- Seek **clear, trustworthy** information on enrolment, zoning, and education pathways
- Want their children to maintain connections with their cultural heritage
##### 🎯 Project Goals
- Reduce confusion and stress in school selection and enrolment
- Promote **equitable access** to education for culturally and linguistically diverse communities
- Support **informed, confident decision-making** through culturally appropriate and multilingual content
- Strengthen families’ sense of **control, inclusion, and belonging**
  
## 🚀 Project Features
This web application is designed to support migrant families in Victoria, Australia in selecting primary schools through interactive tools, comparison dashboards, and informative guidance. Below are the main features of the platform:
##### 🏠 Home Page
- Explore government and non-government primary schools on an interactive map.
- Search by school name or address to locate specific schools or determine catchment zones.
- Check if an entered residential address falls within a school zone using Mapbox and Google APIs.
- Add schools directly to the comparison dashboard by clicking map icons.
- Offers bilingual interface (Mandarin / English) for accessibility.
##### 📊 Compare Page
- Compare up to three schools side-by-side using both numerical indicators and visual charts.
- View key school metrics including:
  - Total enrolments
  - Language background
  - ICSEA score
  - Staff-student ratio
- Ability to remove and re-add schools dynamically, with-session-based storage to preserve state.
##### 📚 Resource Page
- Will provide curated resources for migrant parents on topics such as:
  - Understanding the Victorian education system
  - Translation help
  - Application assistance and government services
- Categorized and multilingual resource list with links to trusted sources.
##### ❓ Support Page
- Will feature a searchable Q&A module to address frequently asked questions.
- Questions grouped by educational stage (e.g., Prep, Primary, Secondary).
- Answers will include:
  - Clear bilingual explanations
  - Visual indicators for key terms (ICSEA, NAPLAN, etc.)
  - Source references and licensing details
##### 🏫 School Detail Page
- Displays detailed information about a selected school:
  - School name, type, suburb, enrolment numbers
  - Programs offered (e.g., language immersion)
  - Charts visualizing student background and staff ratios
- Links to add/remove the school from the comparison list
- Entry point from either the map or comparison view
---


## 🛠️ Project Technologies
SchoolMate is a full-stack web application built with modern web technologies, deployed on a cloud-based infrastructure to ensure performance, scalability, and maintainability.
##### 🌐 Frontend
**Framework**: Vue.js 3  
**Build Tool**: Vite  
**Styling**: Tailwind CSS   
**Routing**: Vue Router  
**Internationalization**: vue-i18n  

**Other Utilities**:  
- `axios` for HTTP requests  
- `lodash.debounce` for optimized input  
- `mapbox-gl` for map rendering  
- `docxtemplater`, `exceljs`, `file-saver` for file export  

**Build Modes**:  
Multiple build modes (`build:iter1`, `build:iter2`, `build:iter3`) are configured via `vite.config.js` to support feature isolation per iteration.

##### 🔧 Backend
**Language**: Python 3.9+  
**Framework**: Flask  
**Routing and API**: RESTful structure using Flask Blueprints  
**CORS Support**: via `flask-cors`  
**Database Layer**: SQLAlchemy ORM  
**Database Migration**: Flask-Migrate  

**API Structure**:  
- APIs are modularized in `/routes.py`  
- Google Proxy Endpoints for autocomplete and geocode  
- `/articles` endpoint with text search capability  

##### 🗄️ Database
**Database Engine**: MariaDB (MySQL-compatible)  
**ORM Tool**: SQLAlchemy  
**Deployment**: AWS EC2
  

---
## 👉 Project Building process
This project follows an Agile development methodology and was executed over three iterations.
- Each version is associated with a feature-complete milestone based on team-defined Epics and User Stories. Development branches for each iteration can be found here:
  - Iteration 1: [iteration1-dev](https://github.com/StevenT899/tp21-main/tree/iteration1-dev)
  - Iteration 2: [iteration2-dev](https://github.com/StevenT899/tp21-main/tree/iteration2-dev)
  - Iteration 3: [iteration3-dev](https://github.com/StevenT899/tp21-main/tree/iteration3-dev)
  
##### 📝 Change Log
| Version | Branch Name       | Release Date | Key Features / Changes |
|---------|-------------------|--------------|--------------------------|
| v1.0    | `iteration1-dev`  | 2025-03      | Home page, map search, basic comparison |
| v2.0    | `iteration2-dev`  | 2025-04      | Address-based school zone check, sidebar, school detail page |
| v3.0    | `iteration3-dev`  | 2025-05      | Journey map, bilingual checklist, Q&A article formatting |
- Each version is associated with a feature-complete milestone based on team-defined Epics and User Stories. Development branches can be found here.

##### 💻 Development Members & Roles  
| Name                | Role                  | Responsibility Summary  |  
|---------------------|-----------------------|-------------------------|
| YuHan Chen (MIT)    | Full Stack Developer  | schools/school zones, journey map checklist, Flask APIs, interface pytest|  
| XinWen Tan (MIT)    | Full Stack Developer  | school comparison, Flask APIs, school detail, Q&A module |  

---
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
├── .gitattributes
├── .gitignore
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
└── vite.config.js
```








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
