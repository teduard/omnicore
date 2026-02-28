import { useNavigate } from "react-router-dom";
import logo from "/assets/logo.svg";
import { useContext, useEffect } from "react";
import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { ContentLayout, Icon } from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import type { ILandingPageLayoutProps } from "./interfaces";
import StickyFooter from "../components/StickyFooter";
import DashboardRoutes from "../routes/DashboardRoutes";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

import "@cloudscape-design/global-styles/index.css";
import "../Landing.css";
import "../styles/base.scss";
import "../styles/top-navigation.scss";
import { logger } from "../lib/logger";
import { DataSourceContext } from "../contexts/DataSourceContext";

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

const handleUserMenuClick = (event, authContext, navigate) => {
  const { setIsAuthenticated, setUser } = authContext;

  logger.debug("in handleUserMenuClick");
  logger.debug("event:", event);

  event.preventDefault();
  event.stopPropagation();

  if (event?.detail?.id == "signout") {
    logger.debug("log out user");
    setIsAuthenticated(false);
    setUser(null);
  } else if (event?.detail?.id == "preferences") {
    navigate(`/${DashboardRoutes.path}/preferences`);
  } else if (event?.detail?.id == "profile") {
    navigate(`/${DashboardRoutes.path}/profile`);
  }
};

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

function LandingPageLayout(props: ILandingPageLayoutProps) {
  const authContext = useContext(AuthContext);
   if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { isAuthenticated, setIsAuthenticated, setUser } = authContext;

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext context is not present");
  }
  const { defaultTheme, defaultDensity } = userContext;

  const navigate = useNavigate();

  const handleNavigationClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event.detail.href) {
      navigate("/");
    }
    navigate(event.detail.href);
  };

  const handlePrefClick = (event, userContext) => {
    const { setTheme, setDensity } = userContext;

    event.preventDefault();
    event.stopPropagation();

    logger.debug("pref itemClick clicked: ", event);
    switch (event.detail.id) {
      case "theme-light":
        setTheme({ label: "Light", value: "light" });
        break;
      case "theme-dark":
        setTheme({ label: "Dark", value: "dark" });
        break;
      case "layout-normal":
        setDensity({ value: "normal", label: "Comfortable" });
        break;
      case "layout-compact":
        setDensity({ value: "compact", label: "Compact" });
        break;
    }
  };

  const handleSignOutClick = (event) => {
    logger.debug("in handleSignOutClick");
    event.preventDefault();
    event.stopPropagation();

    setIsAuthenticated(false);
    setUser(null);
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
    { id: "signout", text: "Sign out", href: "#", onClick: handleSignOutClick },
  ];
  const [userData, setUserData] = useState({
    type: "button",
    iconName: "user-profile",
    title: "Account",
    ariaLabel: "Account",
    href: "/login",
    onClick: handleNavigationClick,
  });

  const headerVariant = "divider";

  useEffect(() => {
    if (isAuthenticated) {
      setUserData({
        type: "menu-dropdown",
        text: "Admin",
        description: "john.doe@gmail.com",
        iconName: "user-profile",
        onItemClick: (event) =>
          handleUserMenuClick(event, authContext, navigate),
        items: profileActions,
      });
    } else {
      logger.debug("not auth");
      setUserData({
        type: "button",
        iconName: "user-profile",
        title: "Account",
        ariaLabel: "Account",
        href: "/login",
        onClick: handleNavigationClick,
      });
    }
  }, [isAuthenticated]);

  const authLinks = [
    {
      type: "button",
      text: "Dashboard",
      href: "/dashboard",
      onFollow: handleNavigationClick,
    },
  ];

  if (!isAuthenticated) {
    authLinks.pop();
  }

  return (
    <>
      <I18nProvider locale={LOCALE} messages={[messages]}>
        <DemoHeaderPortal>
          <TopNavigation
            i18nStrings={i18nStrings}
            identity={{
              href: "/",
              title: "OmniCore",
              logo: { src: logo, alt: "OmniCore" },
              //onFollow: {clickHandler}
              onFollow: handleNavigationClick,
            }}
            utilities={[
              ...authLinks,
              // {
              //   type: "button",
              //   text: "Dashboard",
              //   href: "/dashboard",
              //   onFollow: handleNavigationClick
              // },
              {
                type: "button",
                text: "About",
                href: "/about",
                onFollow: handleNavigationClick,
              },
              // {
              //   type: "button",
              //   text: "Docs",
              //   href: "/blog",
              //   //onClick: handleNavigationClick,
              //   onFollow: handleNavigationClick
              // },
              // { type: 'button',
              //   iconName: 'settings',
              //   title: 'Settings',
              //   ariaLabel: 'Settings'
              // },
              // {
              //   type: "button",
              //   // Render our Popover-wrapped gear button by hijacking `text`.
              //   // For a production app prefer the `element` type (see note).
              //   text: <GearPopover prefs={prefs} onChange={handleChange} /> as any,
              //   ariaLabel: "Preferences aria label",
              //   title: "Preferences title"
              // },
              {
                type: "menu-dropdown",
                iconName: "settings",
                ariaLabel: "Settings",
                title: "Settings",
                onItemClick: (event) => handlePrefClick(event, userContext),
                //onItemFollow: handlePrefFollow,
                items: [
                  {
                    id: "support",
                    text: "Theme",
                    items: [
                      {
                        id: "theme-light",
                        text: "Light", //`${defaultTheme.value === "light" ? "✓ " : "   "}Light`,
                        //itemType: "checkbox",
                        //checked: defaultTheme.value == "light" ? true: false,
                        disabled: false,
                        //iconName: "check"
                        //iconSvg: checkedIcon
                        iconSvg:
                          defaultTheme.value === "light"
                            ? checkedIcon
                            : emptyIcon,
                      },
                      {
                        id: "theme-dark",
                        text: "Dark", //`${defaultTheme.value === "dark" ? "✓ " : "   "}Dark`,
                        //text: `${defaultTheme.value === "dark" ? " x " : "___"}Dark`,
                        //itemType: "checkbox",
                        //checked: defaultTheme.value == "dark" ? true: false,
                        disabled: false,
                        //iconName: "add-plus"
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
                        text: "Comfortable", //`${defaultDensity.value === "normal" ? "✓ " : "   "}Comfortable`,
                        //itemType: "checkbox",
                        //checked: defaultDensity.value == "normal" ? true: false,
                        disabled: false,
                        iconSvg:
                          defaultDensity.value === "normal"
                            ? checkedIcon
                            : emptyIcon,
                      },
                      {
                        id: "layout-compact",
                        text: "Compact", //`${defaultDensity.value === "compact" ? "✓ " : "   "}Compact`,
                        //itemType: "checkbox",
                        //checked: defaultDensity.value == "compact" ? true: false,
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
              userData,
            ]}
          />
        </DemoHeaderPortal>
        {/* <SpaceBetween size="m">
              {props.header}
              {props.content}
            </SpaceBetween> */}

        {/* <div
      style={{
        backgroundImage:  '/assets/google_header_svg.svg',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right",
        backgroundSize: "300px", // adjust as needed
      }}> */}
        <ContentLayout
          headerVariant={headerVariant}
          header={props.header}
          defaultPadding={true}
          maxContentWidth={1400}
          disableOverlap={true}
        >
          <main className="product-page-content">{props.content}</main>
        </ContentLayout>
        {/* </div> */}

        {/* <DemoFooterPortal>
        <TopNavigation
          i18nStrings={i18nStrings}
          identity={{
            href: '#',
            title: '© 2026 OmniCore',
          }}
          >
          </TopNavigation>
      </DemoFooterPortal> */}

        {/* <XStickyFooter /> */}
        <StickyFooter />
      </I18nProvider>
    </>
  );
}

export default LandingPageLayout;
