# React microfrontend boilerplate

## Sitebuilder's Card

|  Field  |  Acceptable value  |
|:-------:|:-------:|
| React Microfrontend name | Counter |
| React app URL | https://serhii-piatak-nbs-lviv.github.io/react-microservice-boilerplate/ |
| Layout theme |  [default, dark] |
|  React application-specific fields ||
| Key | Value |
| counter_title | * |

Sitebuilder's Card - it's a short summary containing details for site builders or content editors with settings for properly integrate micro frontend into container application. This information is presented in the form of a table with a list of fields and acceptable values ​​for them. 

If the field accepts only a single value, it is specified directly (for example, "React Microfrontend name" field accepts `Counter` only).

If the field accepts a set of predefined values ​​- they are entered in the form of an array (for example, "Layout theme" field accepts `default` or `dark`).

If the field accepts whichever value - put the "asterick" wildcard `*` into the Sitebuilder's card (for example, `counter_title` field accepts anything).


## What exactly makes this application to be a microfrontend (MFE)?

Mainly its the same [Create React App](https://github.com/facebook/create-react-app), but it is slightly modified 
to operate as a microfrontend.

### Service Worker
This React Microfrontend Application is inherently a [Progressive Web Application (PWA)](https://blog.logrocket.com/pwa-create-react-app-service-workers/). It means that application contains a service [worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) inside specific file: `serviceWorker.js`. 

Speaking in the simple terms, service worker in this case provides the ability to reach out the `main.js`-file of deployed React microfrontend application without actual visiting the URL where it is hosted. In turn, `main.js` provides two endpoint functions to render as well as unmount the microfrontend. Following convention for endpoint function names used:
-*Render function name: `render{AppName}`*
-*Unmount function name: `unmount{AppName}`*
```
For example: this boilerplate contains a simple counter React app. It's AppName is "Counter". So, function names will be:
- renderCounter
- unmountCounter
```

### React chunking disabled
When the container app tries to load the MFE, everything should be in one JS file. To achieve this we must disable the [chunking](https://blog.logrocket.com/react-dynamic-imports-route-centric-code-splitting-guide/). To do this, we will use the `react-app-rewired` package. Ater this package installed by npm or yarn following two things were done.

..* *In the root level of MFE application `config-overrides.js` file was added with the following content:*
```
module.exports = {
  webpack: (config, env) => {
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    config.output.filename = "static/js/[name].js";

    config.plugins[5].options.filename = "static/css/[name].css";
    config.plugins[5].options.moduleFilename = () => "static/css/main.css";
    return config;
  },
};
```

..* *To use this override above `package.json` was properly instructed:*
```diff
"scripts": {
-  "start": "react-scripts start",   
+  "start": "PORT=3001 react-app-rewired start",
-  "build": "react-scripts build",
+  "build": "react-app-rewired build",
   "test": "react-scripts test",
   "eject": "react-scripts eject"
}
```

### CORS proxy added
As all our microfrontends and container will be hosted in different subdomains, we must enable CORS in all our microfrontends. To do this `src/setupProxy.js` was added with the following content:
```
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
};
```

That's all about MFE specificity. All another stuff - it's just a usual React application spinned up via Create - React - App.


## Additional features of microfrontend

Having this microfrontend app would be foolish to rigidly bind it to a single project. Rather it would be nice to have an availability to embed this MFE into different container websites. In another words it is desirable to have MFE's **cross-projectivity**.

In turn, cross-projectivity means that this microfrontend app could be used for container websites with different languages (e.g. the **localization** capabilities should be available). From another hand, cross-projectivity means that this microfrontend app could be used for container websites with different visual identities (with different color schemes, font garnitures, component layouts). Hence it means that MFE's look&feel by itself needs to be fine tuned to adopt to different container's visual identities (e.g. the **themification** capabilities should be available).

### Localization
To have the React app multi-language there's `react-i18next` (based on `i18next`) packages exists. Both of these packages needs to be installed to localize the React application. Instead of considering all questions here, I'm referencing to this guide: [How to Add Localization (l10n) to Your React App with react-i18next](https://www.freecodecamp.org/news/how-to-add-localization-to-your-react-app/) to get familiar how it works.

All localization settings gathered in `src/i18n` folder. Microfrontend gets acquainted about actual locale of container app via `data.locale` prop.

### Themification
Themification mini-framework allows to switch between color schemes, layouts, font garnitures etc. Themification mini-framework based on following two libraries:
* [Emotion library](https://emotion.sh/docs/introduction) - to control stylings and font assets hosted in project folder structure;
* [Web Font Loader](https://github.com/typekit/webfontloader) - to download web-hosted fonts dynamically.

**Please ensure that you got familiar with both libraries above to successflly proceed themification managing here**

All necessary for MFE themification contains in following locations:
* `src/themes.js` file;
* `src/fonts.js` file;
* `src/app/hooks/useThemifiedComponent.js` file;
* `src/app/fonts` folder.

#### `themes.js` file
It is probably most significant part of themification mini-framework. Main part of theming settings gathered here. This file exports:
* `themes` object which contains all information about themes;
* `fontsLoader` function which responsible for loading project-hosted fonts;
---
`themes` object contains nested objects. Each of those object represents a theme. Key - it's a theme name (when we're switching the theme, we're referencing exactly to those theme keys). Value - it's an theme object by itself. In turn, each **theme-object** contains nested objects as well. Each of those objects represents a UI component. When you're creating a webpage markup, you highlight certain main structural interface components of the page. You assign a names to this components (for example, "counter-title", "counter-value", "increase-button" etc.) Those names will be a keys for **component-objects** in the `themes.js` file. Values for the component-objects - it's a set of styling rules applying immediately to this UI component depending of theme selected. Styling rules writting in SCSS-manner (e.g. can contain nested media queries, nested references to other HTML-elements etc.). There's only one difference here in comparison with plain CSS: while in CSS style selectors are written in `kebab-case`, here the same selectors are written in `camelCase` (for example `font-size` in plain CSS versus `fontSize` here: it's an [object styles](https://emotion.sh/docs/@emotion/css#object-styles) feature of @emotion/css package).

Final keys in each theme-object are font-related. It's mandatory for each theme-object to have `fonts-list` key. It contains an array of font names hosted in project folder structure, which are needs to be uploaded for this specific theme. The `fonts-list` key can be followed by one or more font-related keys. Those keys dedicated for Web Font Loader: if theme using some webfonts, those names sould be listed in these keys; when MFE rendering Web Font Loader will download all this fonts to webpage.

---
`fontsLoader` function responsive for uploading fonts which are hosted in project folder structure. It constructs the list of CSS rules with font names to be uploaded. If you would open `App.js` file, you'll see that `fontsLoader` invoking at very beginning and passing constructed list of fonts to Emotion's [injectGlobal](https://emotion.sh/docs/@emotion/css#global-styles) function. Latter is uploading those fonts in fact.

---

#### `fonts.js` file and `src/app/fonts` folder
The idea behind `fonts.js` file is very simple. It's a registry of fonts which are hosted in project folder structure. It exports `FONTS_REGISTRY` object. Every key in this object - it's a font name. Corresponding value describes this font in details: where it's source file located, which font drawing is etc. On a latter steps the data from `FONTS_REGISTRY` object being used by `fontsLoader` function to construct the rules for project-hosted fonts uploading.
All custom fonts which you want to store in project folder structure should be placed inside `src/app/fonts` folder. Iside this folder fonts are grouped by subfoldes in accordance to their family and format (e.g. font files in 'woff' format should be stored in `src/app/fonts/<font family>/woff` folder, in 'ttf' format - in  in `src/app/fonts/<font family>/ttf` folder and so on). Inside `src/app/fonts/<font family>/specimen` folder you can put image files which shows how your custom font visually looks like.


#### `useThemifiedComponent` hook
This custom hook exported by `src/app/hooks/useThemifiedComponent.js` file and it responsible for actual applying the proper set of CSS rules to UI component (which is React component at the same time) in accordance to theme selected. 

This hook accepts two parameters:
* UI component name (which is key for corresponding component-object from `themes.js` file);
* applied theme name (which is key for corresponding theme-object from `themes.js` file).

On output this hook returns a cascaded set of CSS rules being applied to this UI component. "Cascaded" means following here. First of all styling rules for "default" theme applying to this UI component. Then, if we're using 'non-default' theme and if this theme contains CSS rules for this specific UI component, these will override default ones. This cascaded theme-specific CSS rules assigning to the rendered HTML-element via class name. It's a [cx feature](https://emotion.sh/docs/@emotion/css#cx) of @emotion/css package.

Syntax of using `useThemifiedComponent` hook is following:
```
/*myReactUIComponent.jsx*/

import useThemifiedComponent from "./app/hooks/useThemifiedComponent";

...

const myReactUIComponent = (props) => {
    ...
    const [someClassName] = useThemifiedComponent(<component-object key>, <theme-object key>);

    ...
    return (
        <div className={someClassName}>
          ...
        </div>
    )
}
```

## Which way to code my own React microfrontend on top of this boilerplate?

1. Fork this boilerplate to your own GitHub repository
2. Clone the forked boilerplate from your own repo to your local environment
3. Open the `index.js` file and make following changes:
..* find the lines of code where render- and unmout- endpoint functions are declared. Replace `{AppName}` parts of function names by your own app name:
```diff
...
- window.renderCounter = (containerId, data) => {
+ window.renderMyOwnAppName = (containerId, data) => {

...

- window.unmountCounter = containerId => {
+ window.unmountMyOwnAppName = containerId => {
...
```

..* find the line of code where React app root div presence checking and Replace `{AppName}` part of id by your own app name (it should be the same like in function names):
```diff
...
- if (!document.getElementById('Counter-container')) {
+ if (!document.getElementById('MyOwnAppName-container')) {
...
```

..*  save changes you've made in `index.js` file.
**Remember (it's better to write down in app documentation) the AppName you've assigned to own project: it will need to be specified in container application later.**

4. Open the `package.json` file and make following changes:
..* change the project name:
```diff
...
- "name": "simple_react_counter",
+ "name": "my_project_name",
...
```

..* change the URL of Git- page where your microfrontend will be deployed in following format:
```diff
...
- "homepage": "https://Serhii-Piatak-NBS-Lviv.github.io/react-microservice-boilerplate",
+ "homepage": "https://{username}.github.io/{repo-name}",
...
```
..*  save changes you've made in `package.json` file.

5. Prepare fonts:
* put your custom fonts you want to store in project inside the `src/app/fonts` folder;
* fulfill the `FONTS_REGISTRY` object in `fonts.js` file bu our own fonts descriptions (you can use existing code as reference and delete it after);
* fulfill the array with your custom project-stored font names in "fonts-list" key of theme-objects in `themes.js` file;
* fulfill the array with your custom webfont names in theme-objects in `themes.js` file. Which key names to use here you can find out from [Web Font Loader documentation](https://github.com/typekit/webfontloader).

6. Prepare themes:
* Highlight the main UI components of your applcation. Give names to them;
* Open the `themes.js` file. In 'default' theme-object replace nested objects by your own component-objects with proper styling rules. Remve 'dark' theme-object. Add your own theme-objects (don't forget about font-related keys for each theme, 'fonts-list' key is mandatory!).

7. Develop your own application code: create React components needed, replace boilerplate code inside `App.js` file. Don't forget to use `useThemifiedComponent` hook in your React components to keep these themed.

8. You can use `npm start` to run dev server as for usual React application to test how it works.

9. Fulfill the Sitebuilder's Card as shown above. **Always keep actual information in Sitebuilder's Card**

10. Push your code to your project repository.


## In which way microfrontend obtains data from 'outside'?

All infrormation which needs to be passed from container app to microfrontend arrives via `data` prop. Two fields are mandatory in `data`- prop:
|  prop   |  description                                                         |
|---------|----------------------------------------------------------------------|
| theme   | contains the theme name which needs to be applied when MFE rendering |
| locale  | points to the laguage which needs to be applied when MFE rendering   |

If needed, you can reference any amount of your own custom fields from `data`-prop. This set of fields from container's side known as **specifics**.

Specifics - it's the arbitrary data fields you want to obtain from container application. As mentioned, it could be any amount of such fields. For example, in this counter application we're using just one cpecific. It is a field `counter_title` that contains the title text that should be displyed by MFE.

In the code you should reference specifics by `data.<specific_key>`. Feel free to pre-define any amount of specifics you need for your own micro frontend application. All is need it's to define keys and acceptable values for specifics in Sitebuilder's Card. Sitebuilders or content editors then will include these specifics fields to the MFE's settings on container side. 
**Be sure to enter information about specifics you define into Sitebuilder's Card!**