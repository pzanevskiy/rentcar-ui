export const CarImage = (props: { src: string, alt: string }) => {
  return (
    <div>
      <img
        style={{ minHeight: '65px', maxHeight: '100%', maxWidth: '100%', display: 'block' }}
        src={props?.src}
        alt={props?.alt}
        loading="lazy"
      />
    </div>
  )
}