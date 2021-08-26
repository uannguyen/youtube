const HomeIcon = (props) => {
  const { fill, size, stroke, viewBox = 512 } = props
  return <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    fill={fill || '#000'}
    stroke={stroke || 'unset'}
    width={size || '40px'}
    viewBox={`0 0 ${viewBox} ${viewBox}`}
    className={props.className}
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8" class="style-scope yt-icon"></path>
  </svg>
}

export default HomeIcon
