# Mini Instagram

A Next.js app for sharing posts and images.

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Add a `.env.local` file with required environment variables.
```bash
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_API_KEY=
```

3. Run the development server:

```bash
yarn dev
```

4. Build for production:

```bash
yarn build
```

5. Start the production server:

```bash
yarn start
```

6. Run unit test:

```bash
yarn test
```


## Libraries Used

- Tech: [React](https://react.dev), [Next.js](https://nextjs.org)
- Theme: [minimal](https://docs.minimals.cc/introduction/), [Material UI](https://mui.com) (Dark/Light mode, Responsive Design)
- Data fetching strategies: SSR → Hydrate → CSR revalidate with [SWR](https://swr.vercel.app)
- Unit testing: [jest](https://jestjs.io), [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- Internationalization: [i18next](https://www.i18next.com), [react-i18next](https://react.i18next.com)
- Others: [emoji-picker-react](https://github.com/ealush/emoji-picker-react), [sonner](https://sonner.emilkowal.ski/getting-started)

## Project Structure
- Unit tests: `__tests__/`
- Assets files: `public/assets/`
- Language files: `public/locales/`
- Main app: `src/app/[locale]/page.tsx`
- Components: `src/components/`
- Provider: `src/provider`
- API services: `src/services/api.ts`
- Swr config: `src/swr`
- Theme: `src/theme`  (Everything inside this folder is provided by Minimal.)

--- 
