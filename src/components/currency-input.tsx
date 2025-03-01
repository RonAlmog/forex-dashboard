import CurrencyInputField, {
  CurrencyInputProps,
} from "react-currency-input-field";

const CurrencyInput = ({ value, onValueChange }: CurrencyInputProps) => {
  return (
    <CurrencyInputField
      value={value}
      onValueChange={onValueChange}
      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      allowDecimals
      decimalSeparator="."
      groupSeparator=","
      decimalsLimit={2}
      maxLength={12}
      prefix="$"
    />
  );
};

export default CurrencyInput;
