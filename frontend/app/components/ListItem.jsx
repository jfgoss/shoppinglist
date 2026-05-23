import React from "react"

export const ListItem = ({listItem, onDelete}) => {
  // TODO: Only render if data is valid. Need to confirm requirements on how to handle this.
  if (listItem?.title && listItem?.price) {
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
            <td>
              <button onClick={() => onDelete(listItem.order)}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
