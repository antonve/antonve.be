export function Tags({ list: items }: { list: string[] }) {
  return (
    <ul className="h-stack flex-wrap">
      {items.map(it => (
        <li key={it} className="highlighted text-sm mr-3">
          {it}
        </li>
      ))}
    </ul>
  )
}
