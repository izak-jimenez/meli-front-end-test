/**
 * MeliLogo component
 * Renders an image with the Meli logo with a specified width
 * @prop {number} width
 * @returns {JSXElement} MeliLogo
 */

const MeliLogo = (props: { width: number }) => {
  const { width } = props
  return <img src="/assets/meli-logo-2.jpg" width={width} alt="meli.logo" />
}

export default MeliLogo
