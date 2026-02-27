import { Link } from "@cloudscape-design/components";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import OrganizationLayout from "./FitnessLayout";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import { DashboardRoutes, FitnessRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

const queryClient = new QueryClient();

function Content() {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/organization`;

  const { isPending, error } = useQuery({
    queryKey: ["organization"],
    queryFn: () =>
      fetch(apiUrl, {
        method: "GET",
        credentials: "include",
      }).then((r) => r.json()),
  });

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Oops!</span>;

  return (
    <>
      <Cards
        ariaLabels={{
          itemSelectionLabel: (_e, t) => `select ${t.name}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          header: (item) => (
            <Link href="#" fontSize="heading-m">
              {item.name}
            </Link>
          ),
          sections: [
            {
              id: "description",
              header: "Uses:",
              content: (item) => item.description,
            },
            {
              id: "Image",
              content: () => (
                <>
                  <>
                    <Link href="#">Send message</Link>
                  </>
                </>
              ),
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
        items={[
          {
            name: "Jane",
            alt: "First",
            description: "Expense, Taskify",
            type: "0",
            size: "Small",
          },
          {
            name: "John",
            alt: "Second",
            description: "Expense, Fitness, Taskify",
            type: "1",
            size: "Large",
          },
        ]}
        loadingText="Loading resources"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No resources</b>
              <Button>Create resource</Button>
            </SpaceBetween>
          </Box>
        }
        header={<Header>fitness All members</Header>}
      />
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: DashboardRoutes.path },
        { text: "Fitness", href: FitnessRoutes.path },
        { text: "Members", href: `${FitnessRoutes.path}/members` },
      ]}
    />
  );
}

function FitnessMembers() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <OrganizationLayout
          content={<Content />}
          breadcrumbs={<Breadcrumbs />}
        />
      </QueryClientProvider>
    </>
  );
}

export default FitnessMembers;
