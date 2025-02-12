import { cn } from "@/lib/utils";
const ProductPrice = ({ value, className }: { value: number; className: string }) => {
  console.log(typeof value,'123');
  const [whole, decimal] = value.toFixed(2).split('.');
  return (
    <p className={cn('text-2xl', className)}>
      <span className="text-xs align-super">$</span>
      {whole}
      <span className="text-xs align-super">.{decimal }</span>

    </p>
   );
}

export default ProductPrice;