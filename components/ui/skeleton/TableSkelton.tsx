import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SkeletonTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(2)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}