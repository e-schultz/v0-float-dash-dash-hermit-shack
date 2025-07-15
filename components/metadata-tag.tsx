interface MetadataTagProps {
  type: string
  value: string
}

export function MetadataTag({ type, value }: MetadataTagProps) {
  return (
    <span className="inline-flex items-center text-sm bg-gray-100 dark:bg-gray-700 rounded px-2 py-0.5 mr-1">
      <span className="font-medium text-gray-600 dark:text-gray-300">{type}:</span>
      <span className="ml-1 text-gray-800 dark:text-gray-200">{value}</span>
    </span>
  )
}
