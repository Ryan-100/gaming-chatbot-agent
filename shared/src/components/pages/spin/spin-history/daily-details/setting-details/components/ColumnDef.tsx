import { ColumnDef } from "@tanstack/react-table";
import { SpinBonusListData } from "../../../../../../../types/spin-bonus.types";

export const columnDef: ColumnDef<SpinBonusListData>[] = [
  {
    accessorKey: 'spinCount',
    header: 'Spin Count',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];