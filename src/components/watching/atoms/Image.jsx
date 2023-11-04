const Image = ({ className, src, alt }) => {
  return (
    <picture>
      <source srcSet={src} />
      <img className={className} src={src} alt={alt} />
    </picture>
  );
};

export default Image;