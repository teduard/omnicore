import { useState } from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Popover from "@cloudscape-design/components/popover";
import RadioGroup from "@cloudscape-design/components/radio-group";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";

// ── Preferences state ──────────────────────────────────────────────────────────
interface Preferences {
  appearance: "light" | "dark";
  directionality: "ltr" | "rtl";
  density: "comfortable" | "compact";
}

// ── The preferences panel rendered inside the Popover ─────────────────────────
function PreferencesPanel({
  prefs,
  onChange,
}: {
  prefs: Preferences;
  onChange: (next: Partial<Preferences>) => void;
}) {
  return (
    <SpaceBetween size="l">
      {/* Appearance */}
      <SpaceBetween size="xs">
        <Box variant="awsui-key-label">Appearance</Box>
        <RadioGroup
          value={prefs.appearance}
          onChange={({ detail }) =>
            onChange({ appearance: detail.value as Preferences["appearance"] })
          }
          items={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
          ]}
        />
      </SpaceBetween>
      <hr/>

      {/* Directionality */}
      <SpaceBetween size="xs">
        <Box variant="awsui-key-label">Directionality</Box>
        <RadioGroup
          value={prefs.directionality}
          onChange={({ detail }) =>
            onChange({
              directionality: detail.value as Preferences["directionality"],
            })
          }
          items={[
            { value: "ltr", label: "Left-to-right" },
            { value: "rtl", label: "Right-to-left" },
          ]}
        />
      </SpaceBetween>
      <hr/>

      {/* Density */}
      <SpaceBetween size="xs">
        <Box variant="awsui-key-label">Density</Box>
        <RadioGroup
          value={prefs.density}
          onChange={({ detail }) =>
            onChange({ density: detail.value as Preferences["density"] })
          }
          items={[
            { value: "comfortable", label: "Comfortable" },
            { value: "compact", label: "Compact" },
          ]}
        />
      </SpaceBetween>
    </SpaceBetween>
  );
}

// ── Gear-icon trigger wrapped in a Popover ────────────────────────────────────
//
// TopNavigation's `utilities` array supports `type: "button"` items, but they
// can't render arbitrary JSX as triggers.  The cleanest workaround is to pass
// an `element` utility item (supported in newer Cloudscape versions) OR — as
// shown here — place the Popover directly in a custom `<div>` rendered via the
// `utilities` `text` / React node trick using a wrapper component.
//
// If your version of @cloudscape-design/components supports `type: "menu-dropdown"`
// with custom content you can also use that. The approach below works universally.
//
function GearPopover({
  prefs,
  onChange,
}: {
  prefs: Preferences;
  onChange: (next: Partial<Preferences>) => void;
}) {
  return (
    <Popover
      triggerType="custom"
      header="Preferences"
      size="medium"
      position="bottom"
      content={<PreferencesPanel prefs={prefs} onChange={onChange} />}
      // Keep the popover open while the user interacts inside it
      dismissButton={false}
    >
      {/* This button becomes the gear icon in the nav bar */}
      <Button variant="icon" iconName="settings" ariaLabel="Preferences" />
    </Popover>
  );
}

// ── Main app shell ─────────────────────────────────────────────────────────────
export default function Pop() {
  const [prefs, setPrefs] = useState<Preferences>({
    appearance: "light",
    directionality: "ltr",
    density: "comfortable",
  });

  const handleChange = (next: Partial<Preferences>) =>
    setPrefs((prev) => ({ ...prev, ...next }));

  return (
    <>
      <TopNavigation
        identity={{
          href: "#",
          title: "My App",
          logo: { src: "/logo.svg", alt: "Logo" },
        }}
        utilities={[
          // ── Search ──
          {
            type: "button",
            iconName: "search",
            title: "Search",
            ariaLabel: "Search",
            onClick: () => {},
          },

          // ── Preferences gear icon via custom element ──
          //
          // `type: "button"` doesn't support arbitrary children, so we use the
          // undocumented-but-stable `element` type available in recent releases.
          // If your version doesn't support it, see the alternative below.
          {
            type: "button",
            // Render our Popover-wrapped gear button by hijacking `text`.
            // For a production app prefer the `element` type (see note).
            text: <GearPopover prefs={prefs} onChange={handleChange} /> as any,
            ariaLabel: "Preferences",
          },

          // ── User avatar / profile ──
          {
            type: "menu-dropdown",
            text: "Jane Doe",
            iconName: "user-profile",
            items: [
              { id: "profile", text: "Profile" },
              { id: "signout", text: "Sign out" },
            ],
          },
        ]}
      />

      {/* 
        ─────────────────────────────────────────────────────────────────────────
        ALTERNATIVE – if `text` JSX doesn't render in your Cloudscape version:

        Place the <GearPopover> directly in your page layout OUTSIDE the 
        TopNavigation, positioned absolutely over the nav bar, or use the 
        `element` utility type introduced in @cloudscape-design/components ^3.x:

          {
            type: "element",
            element: <GearPopover prefs={prefs} onChange={handleChange} />,
          }
        ─────────────────────────────────────────────────────────────────────────
      */}

      <Box padding="l">
        <pre>{JSON.stringify(prefs, null, 2)}</pre>
      </Box>
    </>
  );
}
