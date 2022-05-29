export const CarImage = (props: { src: string, alt: string }) => {
  return (
    <div>
      <img
        style={{ minHeight: '65px', maxWidth: '100%', display: 'block', margin: '0 auto' }}
        src={props?.src}
        alt={props?.alt}
        loading="lazy"
      />
    </div>
  )
}