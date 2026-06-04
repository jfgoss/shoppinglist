
export const AddItem = ({list, setList}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    const data = Object.fromEntries(formData)
    const maxOrder = list.sort((a, b) => b.order - a.order)[0].order
    list.push({order: maxOrder+1, price: Number.parseFloat(data.price), title: data.title})
    // Make a copy of list to trigger the rerender on the useState hook
    setList(list.slice(0))
  }

  // TODO: Validation on price/title fields
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item: <input name="title" />
      </label>
      <label>
        Price: <input name="price" />
      </label>
      <button type="submit">Add</button>
    </form>
  )
}