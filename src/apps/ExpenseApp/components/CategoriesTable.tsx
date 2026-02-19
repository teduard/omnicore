import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";

import {useDatabase} from "../../../db/hooks/useDatabase.tsx"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseRoutes from "../../../routes/ExpenseRoutes.tsx";
import { Icon } from "@cloudscape-design/components";

interface CategoryItem {
    category_id: number;
    user_id: number;
    name: string;
    created_date: string;
}

function CategoriesTable() {
  const { execute, isReady, Database } = useDatabase();
  const navigate = useNavigate();

  const empty = [
    {
        name: "empty",
        created_date: "2026/02/19",
    }
  ]

  const [items, setItems] = React.useState<Array<CategoryItem>>(empty);

    const fetchCat = () => {

    const catData:Array<CategoryItem> = new Array<CategoryItem>();

    const res = execute("SELECT * FROM Categories");
    console.log("fetch categories. res = ", res);
    if(!res || res.length === 0) {
        console.log("no categories");
    } else {
        res[0].values.map(row => {
            catData.push({
                category_id: row[0],
                user_id: row[1],
                name: row[2],
                created_date: row[3]
            })
        })
        console.log("catData:", catData);

        setItems(catData);
    }
    
    }

    useEffect(() => {
        if(isReady) {
            fetchCat();
        }
    }, [isReady]);

  const [
    selectedItems,
    setSelectedItems
  ] = React.useState([]);

  const handleDropdownClick = (event:any) => {
    const actionId = event.detail.id;

    // Use a switch or if/else to trigger specific logic
    switch (actionId) {
      case "edit":
        console.log("edit category");
        break;
      case "delete":
        console.log('delete category');
        console.log(event.detail)
        console.log("selectedItems = ", selectedItems)
        
        execute(`DELETE FROM Categories where category_id = '${selectedItems[0].category_id}'`);
        
        fetchCat();
        break;
      default:
        break;
    }
  };

  return (
    <>
    <Table
      renderAriaLive={({
        firstIndex,
        lastIndex,
        totalItemsCount
      }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      onSelectionChange={({ detail }) =>
        setSelectedItems(detail.selectedItems)
      }
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: () => "select all",
        itemSelectionLabel: ({ selectedItems }, item) =>
          item.name
      }}
      columnDefinitions={[
        {
          id: "variable",
          header: "Name",
          cell: e => e.name,
          isRowHeader: true
        },
        {
          id: "value",
          header: "Creation date",
          cell: e => e.created_date,
        },
        {
          id: "description",
          header: "Number of expenses",
          cell: e => 0
        }
      ]}
      columnDisplay={[
        { id: "variable", visible: true },
        { id: "value", visible: true },
        { id: "type", visible: true },
        { id: "description", visible: true }
      ]}
      enableKeyboardNavigation
      items={items}
      loadingText="Loading categories"
      selectionType="single"
      trackBy="name"
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No category</b>
            <Button onClick={() => navigate(`${ExpenseRoutes.path}/categories/add`)}>Add category</Button>
          </SpaceBetween>
        </Box>
      }
      header={
        <Header
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + `/${items.length})`
              : `(${items.length})`
          }
          actions={
            <SpaceBetween
              direction="horizontal"
              size="xs"
            >
              <ButtonDropdown
                onItemClick={handleDropdownClick}
                items={[
                  {
                    text: "Edit",
                    id: "edit",
                    disabled: false
                  },
                  {
                    text: "Delete",
                    id: "delete",
                    disabled: false
                    
                  }
                ]}
              >
                Actions
              </ButtonDropdown>
              <Button variant="primary" 
                onClick={() => navigate(`${ExpenseRoutes.path}/categories/add`)}>
                    Add category
                </Button>
                {/* <Button variant="primary" 
                onClick={() => navigate(`${ExpenseRoutes.path}/categories/add`)}>
                    Refresh
                </Button> */}
                <Button onClick={fetchCat}> <Icon name="refresh" /></Button>
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

export default CategoriesTable