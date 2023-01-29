export function Tags({ list }: { list: string[] }) {
  return (
    <ul className="h-stack flex-wrap">
      {list.map(it => (
        <li key={it} className="highlighted text-sm mr-3">
          {it}
        </li>
      ))}
    </ul>
  )
}
