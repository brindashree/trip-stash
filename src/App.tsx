import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { StoryCreate, StoryEdit, StoryList, StoryShow} from "./pages/stories";
import { supabaseClient } from "./utility";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ChakraProvider theme={RefineThemes.Blue}>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            resources={[
              {
                name: "stories",
                list: "/stories",
                create: "/stories/create",
                edit: "/stories/edit/:id",
                show: "/stories/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2
                    Header={() => <Header sticky />}
                    Title={({ collapsed }) => (
                      <ThemedTitleV2
                        collapsed={collapsed}
                        text="TripStash"
                        icon={<AppIcon />}
                      />
                    )}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="/stories">
                  <Route index element={<StoryList />} />
                  <Route path="create" element={<StoryCreate />} />
                  <Route path="edit/:id" element={<StoryEdit />} />
                  <Route path="show/:id" element={<StoryShow />} />
                </Route>
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
