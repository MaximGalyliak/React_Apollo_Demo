# Apollo Client v3 demo

Apollo is one of the most popular GraphQL libraries available today. With a release of V3 Apollo Client introduced even greater manageability of application state with Reactive variables and new InMemoryCache APIs.

This demo app is scoped to show mechanics of Apollo Client reactive variables and configurable policies for types and fields, and how to use it.

## Definitions

### Apollo Client

Apollo Client is a comprehensive state management library for JavaScript. It enables you to use GraphQL to manage both local and remote data. Apollo Client is view-layer agnostic, so you can use it with React, Vue, Angular, or even vanilla JS.

### Reactive variables

Reactive variables are a useful mechanism for representing local state outside of the Apollo Client cache. Because they're separate from the cache, reactive variables can store data of any type and structure, and you can interact with them anywhere in your application without using GraphQL syntax.

### Local-only fields and field policies

This mechanism allows you to create your client schema. You can extend a server schema or add new fields.
Then, you can define field policies that describe wherefrom data came from. You can use Apollo cache or local storage.
The crucial advantage of this mechanism is using the same API as when you work with server schema.

## Getting started

Clone repository to local machine with `git clone [web_url|SSH-key]`;

Run `npm i` to install node packages

After installation complete run `npm start` which will start the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

After running the app and getting familiar with functionality, it is recommended to explore src/apollo/reactive-vars and src/apollo/index.js files and follow the documentation.

## Demo app stack

- Build with [Create React App](https://github.com/facebook/create-react-app)
- UI components from [React Material UI library](https://mui.com/)
- [Apollo Client v3](https://www.apollographql.com/docs/)
- [React router dom](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)

## Additional Resources

[Configuring Type Policy Fields](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields)

[Customizing the behavior of cached fields](https://www.apollographql.com/docs/react/caching/cache-field-behavior/)

[Managing local state](https://www.apollographql.com/docs/react/local-state/local-state-management/)

[Reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/)

[Front end bits - short and sweet reactive var article](https://rares.uk/apollo-reactive-vars/)
