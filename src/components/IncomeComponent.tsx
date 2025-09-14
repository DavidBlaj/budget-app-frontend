import React, {useEffect, useState} from 'react';
import {IncomeControllerApi, Income, IncomeCategory} from "../api";


const IncomeComponent = () => {
    const incomes = new IncomeControllerApi();
    const [incomesState, setIncomes] = useState<Income[]>([]);
    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const data = await incomes.findAllIncomes();
                setIncomes(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchIncomes();
    }, []);

    const [incomeCategories, setIncomeCategories] = useState<IncomeCategory[]>([]);
    useEffect(() => {
        const fetchIncomeCategories = async () => {
            try {
                const data = await incomes.findAllIncomeCategories();
                setIncomeCategories(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchIncomeCategories();
    }, []);

    console.log(incomeCategories);

    return (
        <div className="App">
            <header className="App-header">
                <table>
                    <th>Id</th>
                    <th>Amount</th>
                    <th>Notes</th>
                    <th>Date</th>
                    <th>Category</th>
                    <tbody>
                    {incomesState.map((income) => (
                        <tr key={income.id}>
                            <td>{income.id}</td>
                            <td>{income.amount}</td>
                            <td>{income.notes}</td>
                            <td>{income.dateAdded?.toDateString()}</td>
                            <td>{income.category?.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </header>
        </div>
    )

}

export default IncomeComponent;