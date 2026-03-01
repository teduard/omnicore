import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import { useDatabase } from "../../../db/hooks/useDatabase.tsx";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseRoutes from "../../../routes/ExpenseRoutes.tsx";
import { Icon } from "@cloudscape-design/components";
import { AuthContext } from "../../../contexts/AuthContext.tsx";
import { logger } from "../../../lib/logger.ts";
import { type NonCancelableCustomEvent } from "@cloudscape-design/components";
import { useCategories, useDeleteCategory } from "../../../hooks/useCategories";

interface DropdownDetail {
  id: string;
}

function CategoriesTable() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  
  const navigate = useNavigate();

  const { data: categories = [], refetch } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleDropdownClick = (
    event: NonCancelableCustomEvent<DropdownDetail>,
  ) => {
    console.info(event);
    const actionId = event.detail.id;
    if (!selectedItems.length) return;

    switch (actionId) {
      case "edit":
        navigate(
          `/${ExpenseRoutes.path}/categories/edit/${selectedItems[0].categoryId}`,
        );
        break;
      case "delete":
        deleteCategory({ categoryId: selectedItems[0].categoryId });
        setSelectedItems([]);
        break;
    }
  };

  return (
    <>
      <Table
        renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
          `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
        }
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: () => "select all",
          itemSelectionLabel: ({ selectedItems }, item) => item.name,
        }}
        columnDefinitions={[
          {
            id: "variable",
            header: "Name",
            cell: (e) => e.name,
            isRowHeader: true,
          },
          {
            id: "value",
            header: "Creation date",
            cell: (e) => e.createdDate,
          },
          {
            id: "description",
            header: "Number of expenses",
            cell: (e) => e.expenseCount,
          },
        ]}
        columnDisplay={[
          { id: "variable", visible: true },
          { id: "value", visible: true },
          { id: "type", visible: true },
          { id: "description", visible: true },
        ]}
        enableKeyboardNavigation
        //items={items}
        items={categories}
        loadingText="Loading categories"
        selectionType="single"
        trackBy="name"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No category</b>
              <Button
                onClick={() => navigate(`${ExpenseRoutes.path}/categories/add`)}
              >
                Add category
              </Button>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            counter={
              selectedItems.length
                ? "(" + selectedItems.length + `/${categories.length})`
                : `(${categories.length})`
            }
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  onItemClick={handleDropdownClick}
                  items={[
                    {
                      text: "Edit",
                      id: "edit",
                      disabled: false,
                    },
                    {
                      text: "Delete",
                      id: "delete",
                      disabled:
                        selectedItems &&
                        selectedItems[0] &&
                        selectedItems[0].expenseCount == 0
                          ? false
                          : true,
                    },
                  ]}
                >
                  Actions
                </ButtonDropdown>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate(`/${ExpenseRoutes.path}/categories/add`)
                  }
                >
                  Add category
                </Button>
                <Button onClick={refetch}>
                  {" "}
                  <Icon name="refresh" />
                </Button>
              </SpaceBetween>
            }
          >
            Your categories
          </Header>
        }
      />
    </>
  );
}

export default CategoriesTable;
