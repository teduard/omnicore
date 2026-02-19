import { useCallback, useContext, useEffect } from "react";
import { DatabaseContext } from "./DatabaseContext";

// organizations: organization_id, name, active, created_date
// users: user_id, organization_id, first_name, last_name, created_date
// categories: category_id, user_id, name, created_date
// expenses: expense_id, category_id, user_id, entry_date, updated_date, amount, comment, could_have_been_avoided
// budget_template: budget_id, user_id, category_id, amount, created_date
// budget: budget_id, user_id, category_id, amount, applies_to_date, created_date

// class OrganizationDTO {
//     organization_id: number;
//     name: string;
//     active: boolean;
//     created_date: Date;

//     public constructor(organization_id:number, name: string, active: boolean, created_date: Date) {
//         this.organization_id = organization_id;
//         this.name = name;
//         this.active = active;
//         this.created_date = created_date;
//     }
// }

// class CategoryDTO {
//     category_id: number;
//     name: string;
//     active: boolean;
//     created_date: Date;

//     public constructor(category_id:number, name: string, active: boolean, created_date: Date) {
//         this.category_id = category_id;
//         this.name = name;
//         this.active = active;
//         this.created_date = created_date;
//     }
// }

// class Categories implements GenericDTO<CategoryDTO> {
//     public constructor()
// }

// interface GenericDTO<T> {
//     items:Array<T>;
//     db: any;
//     execute: any;

//     fetch: () => void;
//     // fetchAll: () => void;
//     // add: (item: T) => boolean;
//     // delete: (item: T) => boolean;
//     // update: (item: T) => boolean;
// }

class CategoryDTO {
    public id: number = 0;
    public name: string = "";
}

class DTO<T> {
    items:Array<T> = new Array<T>();
    db: any;
    execute: any;

    constructor(db: any, execute: any) {
        this.db = db;
        this.execute = execute;
    }

    fetch() {
    const res = this.execute("SELECT * FROM todos");
      if (res.length > 0) {
        //setTasks(res[0].values);

        this.items.length = 0;

        console.log("in fetch:");
        console.log(res);

        //lc - column names
        //values - actual values

        res[0].values.map(item => {
            console.log("item: ", item);
            const newCat:CategoryDTO = {
                id: item[0],
                name: item[1]
            };

            this.items.push(newCat);
        })
      }
    }
}

class DB {
    //public Categories: Array<CategoryDTO> = new Array<CategoryDTO>();
    public Categories: DTO<CategoryDTO>;

    constructor(db:any, execute:any) {
        this.Categories = new DTO<CategoryDTO>(db, execute);
    }
}

const useDatabase = () => {
  //console.log("DatabaseContext:",DatabaseContext);

  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }

  const { db, isReady, persist } = context;

  // Wrapper for executing queries that automatically persists changes
  const execute = useCallback((sql, params = []) => {
    if (!db) return null;
    const result = db.exec(sql, params);
    persist(); // Auto-save to localStorage after every mutation
    return result;
  }, [db, persist]);



  const Database:DB = new DB(db, execute);   

  return { db, isReady, execute, persist, Database };
};

export {useDatabase}