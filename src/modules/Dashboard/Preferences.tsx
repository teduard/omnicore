import {
  Button,
  Container,
  Form,
  FormField,
  Header,
  KeyValuePairs,
  Select,
} from "@cloudscape-design/components";
import Layout from "./Layout";

import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { DashboardRoutes } from "../../routes";

import { UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";
import { DataSourceContext } from "../../contexts/DataSourceContext";

interface IConfigFormProps {
  isVisible: boolean;
  editHandler: () => void;
}

interface IFormProps {
  isVisible: boolean;
  saveHandler: () => void;
  cancelHandler: () => void;
}

function GeneralConfig(props: IConfigFormProps) {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext context is not present");
  }

  const { defaultTheme, defaultDensity, defaultCurrency } = context;

  return (
    <>
      {props.isVisible && (
        <Container>
          <KeyValuePairs
            columns={1}
            items={[
              {
                label: "Currency",
                value: defaultCurrency.label,
              },
              {
                label: "Default theme",
                value: defaultTheme.label,
              },
              {
                label: "Layout density",
                value: defaultDensity.label,
              },
              {
                label: "",
                value: (
                  <Box textAlign="right" variant="p">
                    <Button onClick={props.editHandler}>Edit</Button>
                  </Box>
                ),
              },
            ]}
          />
        </Container>
      )}
    </>
  );
}

function GeneralConfigEditForm(props: IFormProps) {
  const context = useContext(DataSourceContext);
  const { preferencesService } = context;

  const userContext = useContext(UserContext);
  const {
    defaultTheme,
    themeOptions,
    setDefaultTheme,
    defaultCurrency,
    setDefaultCurrency,
    currencyOptions,
    densityOptions,
    setDefaultDensity,
  } = userContext;
  const [currency, setCurrency] = useState(defaultCurrency);

  const [theme, setTheme] = useState(defaultTheme);

  const [density, setDensity] = useState({
    label: "Comfortable",
    value: "normal",
  });

  const saveHandler = async () => {
    const userPref = await preferencesService.getPreferences();

    preferencesService.updatePreferences({
      preferencesId: userPref.preferencesId,
      theme: theme.value,
      layoutDensity: density.value,
      currency: currency.value,
    });

    setDefaultTheme(theme);
    setDefaultDensity(density);
    setDefaultCurrency(currency);

    // needs proper validation
    props.saveHandler();
  };

  return (
    <>
      {props.isVisible && (
        <form onSubmit={(e) => e.preventDefault()}>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  formAction="none"
                  variant="link"
                  onClick={props.cancelHandler}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={saveHandler}>
                  Save
                </Button>
              </SpaceBetween>
            }
          >
            <Container
              header={<Header variant="h2">General configuration</Header>}
            >
              <SpaceBetween direction="vertical" size="l">
                <FormField label="Currency">
                  <Select
                    selectedOption={currency}
                    onChange={({ detail }) => {
                      setCurrency(detail.selectedOption);
                    }}
                    options={currencyOptions}
                  />
                </FormField>
                <FormField label="Default Theme">
                  <Select
                    selectedOption={theme}
                    onChange={({ detail }) => setTheme(detail.selectedOption)}
                    options={themeOptions}
                  />
                </FormField>
                <FormField label="Default Layout Density">
                  <Select
                    selectedOption={density}
                    onChange={({ detail }) => setDensity(detail.selectedOption)}
                    options={densityOptions}
                  />
                </FormField>
              </SpaceBetween>
            </Container>
          </Form>
        </form>
      )}
    </>
  );
}

function AppContent() {
  const [editableForm, setEditableForm] = useState(false);
  const [formProps, setFormProps] = useState(true);

  return (
    <SpaceBetween size="m">
      <Header
        variant="h1"
        actions={<SpaceBetween direction="horizontal" size="xs"></SpaceBetween>}
      >
        Preferences
      </Header>

      <SpaceBetween direction="vertical" size="l">
        <GeneralConfig
          isVisible={formProps}
          editHandler={() => {
            setEditableForm(true);
            setFormProps(false);
          }}
        />
        <GeneralConfigEditForm
          isVisible={editableForm}
          saveHandler={() => {
            setEditableForm(false);
            setFormProps(true);
          }}
          cancelHandler={() => {
            setEditableForm(false);
            setFormProps(true);
          }}
        />
      </SpaceBetween>
    </SpaceBetween>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: "/" + DashboardRoutes.path },
        { text: "Preferences", href: `${DashboardRoutes.path}/preferences` },
      ]}
    />
  );
}

function Preferences() {
  return (
    <>
      <Layout content={<AppContent />} breadcrumbs={<Breadcrumbs />} />
    </>
  );
}

export default Preferences;
