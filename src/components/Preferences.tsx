
import {
  Box,
  Button,
  Popover,
  RadioGroup,
  SpaceBetween,
} from '@cloudscape-design/components';

export interface Preferences {
  appearance: "light" | "dark";
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