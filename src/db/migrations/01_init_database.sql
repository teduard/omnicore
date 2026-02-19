CREATE TABLE Categories (CategoryID int, UserID int, Name text, CreatedDate date);
CREATE TABLE Budgets (BudgetID int, CategoryID int, Amount real, ForCategoryDate date, CreatedDate date);

'''CREATE TABLE Budget (BudgetID int, CategoryID int, Amount real, ForCategoryDate date, CreatedDate date);