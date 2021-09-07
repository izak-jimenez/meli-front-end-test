/**
 * Divider component
 * Renders a div with a specified height
 * @prop {number} height
 * @returns {JSXElement} Divider
 */

const Divider = (props: { height: number }) => {
  const { height } = props
  return <div style={{ height }}></div>
}

export default Divider
