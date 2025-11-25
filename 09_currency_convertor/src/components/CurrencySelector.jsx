export default function CurrencySelector({onSelectCurrency}) {
    return (
        <select onChange={(e) => onSelectCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
        </select>
    )
}