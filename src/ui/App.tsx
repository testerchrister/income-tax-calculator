import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [income, setIncome] = useState<number | string>("");
  const [slabs, setSlabs] = useState<
    Array<{ slab: string; tax: number; percentage: number }>
  >([]);
  const [taxPayable, setTaxPayable] = useState(0);
  const calculateTax = () => {
    const tempSlabs = [];
    if(income === "") return;
    if (+income > 1275000) {
      tempSlabs.push(
        { slab: "4 to 8 Lakhs", tax: 20000, percentage: 5 },
        { slab: "8 to 12 Lakhs", tax: 40000, percentage: 10 }
      );
      if (+income > 1600000) {
        tempSlabs.push({ slab: "12 to 16 Lakhs", tax: 60000, percentage: 15 });
        if (+income > 2000000) {
          tempSlabs.push({ slab: "16 to 20 Lakhs", tax: 80000, percentage: 20 });
          if (+income > 2400000) {
            tempSlabs.push({ slab: "20 to 24 Lakhs", tax: 100000, percentage: 25 });
            tempSlabs.push({
              slab: "24+",
              tax: (+income - 2400000) * 0.3,
              percentage: 30,
            });
          } else {
            tempSlabs.push({
              slab: "20 to 24 Lakhs",
              tax: (+income - 2000000) * 0.25,
              percentage: 25,
            });
          }
        } else {
          tempSlabs.push({
            slab: "16 to 20 Lakhs",
            tax: (+income - 1600000) * 0.2,
            percentage: 20,
          });
        }
      } else {
        tempSlabs.push({
          slab: "12 to 16 Lakhs",
          tax: (+income - 1200000) * 0.15,
          percentage: 15,
        });
      }
    } else {
      tempSlabs.push({ slab: income.toString(), tax: 0, percentage: 0 });
    }
    const totalTax = tempSlabs.reduce((total, slab) => total + slab.tax, 0);

    setTaxPayable(totalTax);
    setSlabs(tempSlabs);
  };
  useEffect(() => {
    calculateTax();
  }, [income]);

  return (
    <>
      <div>
        <h1>Income Tax Calculator</h1>
        <input
          placeholder="Type your annual income"
          className="income"
          value={income}
          onChange={(e) => {
            const inputValue = e.target.value;

            if (inputValue === "" || (/^[0-9]+$/).test(inputValue))  {
              setIncome(inputValue);
            }
          }}
        />
        <div>
          <h2>Your income tax split</h2>
          <table className="slab-table">
            <thead>
              <tr className="table-header">
                <th>Slab</th>
                <th>Tax Amount</th>
                <th>Tax %</th>
              </tr>
            </thead>
            <tbody>
              {slabs.map((slab) => {
                return (
                  <tr className="">
                    <td>{slab.slab}</td>
                    <td>{slab.tax}</td>
                    <td>{slab.percentage}%</td>
                  </tr>
                );
              })}
              <tr>
                <td><strong>Total Tax Payable</strong></td>
                <td><strong>{taxPayable}</strong></td>
              </tr>
            </tbody>
          </table>
          <div>
            <sub className="powered-by">
              Powerd By <strong>ELLENOID</strong>
            </sub>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
