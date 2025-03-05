import React, { ReactNode } from "react";

interface ResponsiveTableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
}

/**
 * ResponsiveTable component that handles horizontal scrolling on mobile
 * and provides consistent styling for tables across the application.
 */
export default function ResponsiveTable({
  headers,
  children,
  className = "",
}: ResponsiveTableProps) {
  return (
    <div className="w-full overflow-x-auto mb-4">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}

// Responsive table row component for consistent styling
export function ResponsiveTableRow({
  children,
  onClick,
  className = "",
  isHighlighted = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  isHighlighted?: boolean;
}) {
  return (
    <tr
      className={`
                ${isHighlighted ? "bg-blue-50" : "hover:bg-gray-50"} 
                ${onClick ? "cursor-pointer" : ""}
                ${className}
            `}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

// Responsive table cell component for consistent styling
export function ResponsiveTableCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm ${className}`}>
      {children}
    </td>
  );
}
