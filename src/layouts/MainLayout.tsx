import { useNavigate } from "react-router-dom";
import logo from "/assets/logo.svg";
import { useEffect } from "react";

import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";

import {
  AppLayoutToolbar,
  SpaceBetween,
  Icon,
} from "@cloudscape-design/components";

import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import TopNavigation from "@cloudscape-design/components/top-navigation";

import "@cloudscape-design/global-styles/index.css";
import "../Landing.css";
import "../styles/base.scss";
import "../styles/top-navigation.scss";
import { type IMainLayoutProps } from "./interfaces";
import StickyFooter from "../components/StickyFooter";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { DashboardRoutes } from "../routes";
import { AuthContext } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { logger } from "../lib/logger";
import { DataSourceContext } from "../contexts/DataSourceContext";

const LOCALE = "en";

interface IDemoMainBarPortalProps {
  children: ReactNode;
}

const DemoHeaderPortal = ({ children }: IDemoMainBarPortalProps) => {
  const domNode = document.querySelector("#h")!;
  return createPortal(children, domNode);
};

const i18nStrings = {
  searchIconAriaLabel: "Search",
  searchDismissIconAriaLabel: "Close search",
  overflowMenuTriggerText: "More",
  overflowMenuTitleText: "All",
  overflowMenuBackIconAriaLabel: "Back",
  overflowMenuDismissIconAriaLabel: "Close menu",
};

const emptyIcon = (
  <Icon
    svg={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        focusable="false"
        key="0"
      >
        <g></g>
      </svg>
    }
  />
);

const checkedIcon = (
  <Icon
    svg={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        focusable="false"
        key="0"
      >
        <g>
          <path d="m1 9 4 4L15 2"></path>
        </g>
      </svg>
    }
  />
);

function MainLayout(props: IMainLayoutProps) {
  const context = useContext(DataSourceContext);
  const { preferencesService } = context;

  //

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { isAuthenticated, setIsAuthenticated, setUser } = authContext;

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext context is not present");
  }

  const handlePrefClick = async (event, userContext) => {
    const { setTheme, setDensity } = userContext;

    event.preventDefault();
    event.stopPropagation();

    const userPref = await preferencesService.getPreferences();
    logger.debug("userPref = ", userPref);

    switch (event.detail.id) {
      case "theme-light":
        setTheme({ label: "Light", value: "light" });

        preferencesService.updatePreferences({
          preferencesId: userPref.preferencesId,
          theme: "light",
          layoutDensity: userPref.layoutDensity,
          currency: userPref.currency,
        });
        break;
      case "theme-dark":
        setTheme({ label: "Dark", value: "dark" });

        preferencesService.updatePreferences({
          preferencesId: userPref.preferencesId,
          theme: "dark",
          layoutDensity: userPref.layoutDensity,
          currency: userPref.currency,
        });
        break;
      case "layout-normal":
        setDensity({ value: "normal", label: "Comfortable" });
        preferencesService.updatePreferences({
          preferencesId: userPref.preferencesId,
          theme: userPref.theme,
          layoutDensity: "normal",
          currency: userPref.currency,
        });
        break;
      case "layout-compact":
        setDensity({ value: "compact", label: "Compact" });
        preferencesService.updatePreferences({
          preferencesId: userPref.preferencesId,
          theme: userPref.theme,
          layoutDensity: "compact",
          currency: userPref.currency,
        });
        break;
    }
  };

  const handleUserMenuClick = (event, authContext, navigate) => {
    const { setIsAuthenticated, setUser } = authContext;

    event.preventDefault();
    event.stopPropagation();

    if (event?.detail?.id == "signout") {
      setIsAuthenticated(false);
      setUser(null);
    } else if (event?.detail?.id == "preferences") {
      navigate(`/${DashboardRoutes.path}/preferences`);
    } else if (event?.detail?.id == "profile") {
      navigate(`/${DashboardRoutes.path}/profile`);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const { defaultTheme, defaultDensity } = userContext;

  const [toolsOpen, setToolsOpen] = useState(false);

  const handleSignOutClick = (event) => {
    logger.debug("in handleSignOutClick");
    event.preventDefault();
    event.stopPropagation();

    setIsAuthenticated(false);
    setUser(null);
  };

  const handleNavigationClick = (event) => {
    // Prevent default link behavior
    event.preventDefault();
    event.stopPropagation();

    // Handle navigation programmatically
    //navigate("/your-path");

    logger.debug("a btn clicked: ", event);
    //logger.debug(event);

    if (!event.detail.href) {
      navigate("/");
    }

    navigate(event.detail.href);
  };

  const profileActions = [
    {
      id: "profile",
      text: "Profile",
      href: import.meta.env.BASE_URL + `${DashboardRoutes.path}/profile`,
      onClick: handleNavigationClick,
    },
    {
      id: "preferences",
      text: "Preferences",
      href: import.meta.env.BASE_URL + `${DashboardRoutes.path}/preferences`,
      onClick: handleNavigationClick,
    },
    {
      id: "signout",
      text: "Sign out",
      href: "#",
      onClick: handleSignOutClick,
    },
  ];

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <I18nProvider locale={LOCALE} messages={[messages]}>
        <DemoHeaderPortal>
          <TopNavigation
            search={props.search}
            className="custom-main-header"
            i18nStrings={i18nStrings}
            identity={{
              href: "/",
              title: "OmniCore",
              logo: { src: logo, alt: "OmniCore" },
              onFollow: handleNavigationClick,
            }}
            utilities={[
              {
                type: "button",
                text: "About",
                href: "/about",
                onFollow: handleNavigationClick,
              },
              {
                type: "button",
                iconName: "notification",
                ariaLabel: "Notifications",
                badge: true,
                disableUtilityCollapse: true,
              },
              // { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
              // {
              //             type: "button",
              //             // Render our Popover-wrapped gear button by hijacking `text`.
              //             // For a production app prefer the `element` type (see note).
              //             text: <GearPopover prefs={prefs} onChange={handleChange} /> as any,
              //             ariaLabel: "Preferences",
              //           },
              {
                type: "menu-dropdown",
                iconName: "settings",
                ariaLabel: "Settings",
                title: "Settings",
                onItemClick: (event) => handlePrefClick(event, userContext),
                items: [
                  {
                    id: "support",
                    text: "Theme",
                    items: [
                      {
                        id: "theme-light",
                        text: "Light",
                        disabled: false,
                        iconSvg:
                          defaultTheme.value === "light"
                            ? checkedIcon
                            : emptyIcon,
                      },
                      {
                        id: "theme-dark",
                        text: "Dark",
                        disabled: false,
                        iconSvg:
                          defaultTheme.value === "dark"
                            ? checkedIcon
                            : emptyIcon,
                      },
                    ],
                  },
                  {
                    id: "support",
                    text: "Density",
                    items: [
                      {
                        id: "layout-normal",
                        text: "Comfortable",
                        disabled: false,
                        iconSvg:
                          defaultDensity.value === "normal"
                            ? checkedIcon
                            : emptyIcon,
                      },
                      {
                        id: "layout-compact",
                        text: "Compact",
                        disabled: false,
                        iconSvg:
                          defaultDensity.value === "compact"
                            ? checkedIcon
                            : emptyIcon,
                      },
                    ],
                  },
                ],
              },
              {
                type: "menu-dropdown",
                text: "Admin",
                description: "john.doe@gmail.com",
                iconName: "user-profile",
                onItemClick: (event) =>
                  handleUserMenuClick(event, authContext, navigate),
                items: profileActions,
              },
            ]}
          />
        </DemoHeaderPortal>

        <AppLayoutToolbar
          footerSelector="#app-footer"
          headerSelector="#h"
          stickyNotifications
          contentType="table"
          breadcrumbs={props.breadcrumbs}
          maxContentWidth={1400}
          content={<SpaceBetween size="m">{props.content}</SpaceBetween>}
          toolsOpen={toolsOpen}
          onToolsChange={({ detail }) => setToolsOpen(detail.open)}
          tools={props.tools}
          toolsHide={props.toolsHide}
          splitPanelPreferences={{ position: "side" }}
          splitPanel={props.splitPanel}
          navigation={<>{props.navigation}</>}
        />

        <StickyFooter />
      </I18nProvider>
    </>
  );
}

export default MainLayout;
