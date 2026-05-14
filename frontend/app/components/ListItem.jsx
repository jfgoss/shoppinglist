export const ListItem = ({listItem}) => {
  return (
    <table width='300'>
      <tbody>
        <tr>
          <td width='100%'>
            {listItem.title}
          </td>
          <td width='50'>
            {`£${listItem.price.toFixed(2)}`}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
