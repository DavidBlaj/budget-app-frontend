import React, {useEffect, useState} from 'react';
import {ExpenseControllerApi, Expense, ExpenseCategoryFromJSON, ExpenseCategory, ExpenseCategoryToJSON} from "../api";
import exp from "constants";


const ExpenseComponent = () => {
    const expenseContorollerApi = new ExpenseControllerApi();
    const [expensesState, setExpenses] = useState<Expense[]>([]);
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await expenseContorollerApi.findAllExpenses();
                setExpenses(data);
            } catch (err) {
                console.error(err);
            } finally {
            }
        };

        fetchExpenses();
    }, []);

    const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
    useEffect(() => {
        const fetchExpenseCategories = async () => {
            try {
                const data = await expenseContorollerApi.findAllExpenseCategories();
                setExpenseCategories(data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchExpenseCategories();
    }, []);

    console.log(expenseCategories)

    return (
        <div className="App">
            <header className="App-header">
                <table>
                    <th>Id</th>
                    <th>Amount</th>
                    <th>Notes</th>
                    <th>SubCategory</th>
                    <th>Date</th>
                    <th>Category</th>
                    <tbody>
                    {expensesState.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.id}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.notes}</td>
                            <td>{expense.subCategory}</td>
                            <td>{expense.dateAdded?.toDateString()}</td>
                            <td>{expense.category?.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </header>
        </div>
    )

}

export default ExpenseComponent;