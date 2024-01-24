import { lusitana } from '@/app/ui/fonts';
import styles from '@/app/ui/dashboard/dashboard.module.css';
import {
  BankIcon,
  BankClockIcon,
  TotalSalesIcon,
  TotalCustomersIcon
} from '@/app/ui/assets/dashboardIcons/dashboardIcons';
import { FormatMoneda } from '../formatToMoneda/fornatMoneda';
type CardProps = {
  title: string;
  value: Number;
  type: 'invoices'| 'collected'| 'pending'| 'customers';
}

const iconMap = {
  collected: BankIcon,
  pending: BankClockIcon,
  invoices: TotalSalesIcon,
  customers: TotalCustomersIcon
};

export function Card({
  title,
  value,
  type,
}:CardProps) {
  const Icon = iconMap[type]
  return (
  <article className={styles.cardWrap}>
    <div>
      {Icon? <Icon /> : null}
      <h3>{title}</h3>
      
    </div>
    <p><FormatMoneda format={value!}/></p>
  </article>
  );
}
export async function Cards() {
  // const revenue =

}