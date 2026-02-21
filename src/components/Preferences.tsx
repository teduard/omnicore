
import {
  Box,
  Button,
  ContentLayout,
  Popover,
  RadioGroup,
  SpaceBetween,
  Link,
} from '@cloudscape-design/components';

export interface Preferences {
  appearance: "light" | "dark";
  // directionality: "ltr" | "rtl";
  density: "comfortable" | "compact";
}

export function PreferencesPanel({
  prefs,
  onChange,
}: {
  prefs: Preferences;
  onChange: (next: Partial<Preferences>) => void;
}) {
  return (
    <SpaceBetween size="l">
      {/* Appearance */}
      <SpaceBetween size="l">
        <Box variant="awsui-key-label">Appearance</Box>
        {/* <h2 className="preferencesTitle">Theme</h2> */}

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

      {/* Directionality 
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
      */}
      
      
      {/* Density */}
      <SpaceBetween size="l">
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

export function GearPopover({
  prefs,
  onChange,
}: {
  prefs: Preferences;
  onChange: (next: Partial<Preferences>) => void;
}) {
  return (
    <Popover
      triggerType="custom"
      // header="Preferences"
      size="large"
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