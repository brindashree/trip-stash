import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ProjectCreate, ProjectEdit, Projects } from "./pages/projects";
import { supabaseClient } from "./utility";
import { ForgotPassword, Login, Register, ResetPassword } from "./pages/auth";
import {
  ItineraryCreate,
  ItineraryEdit,
  ItineraryList,
} from "./pages/itineraries";
import { Home } from "./pages/home";
import { Invite } from "./pages/projects/invite";

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
                name: "projects",
                list: "/projects",
                create: "/projects/create",
                edit: "/projects/edit/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "itineraries",
                list: "/:projectId/itinerary",
                create: "/:projectId/itinerary/create",
                edit: "/:projectId/itinerary/edit/:id",
                show: "/:projectId/itinerary/show/:id",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route index path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<ResetPassword />} />
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
                <Route path="/projects">
                  <Route
                    index
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Projects />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ProjectCreate />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="edit/:id"
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ProjectEdit />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="invite/:id"
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Invite />
                      </Authenticated>
                    }
                  />
                </Route>
                <Route path="/:projectId/itinerary">
                  <Route
                    index
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ItineraryList />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ItineraryCreate />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="edit/:id"
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ItineraryEdit />
                      </Authenticated>
                    }
                  />
                </Route>
              </Route>
            </Routes>

            <RefineKbar />
            <DocumentTitleHandler />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
