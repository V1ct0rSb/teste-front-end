interface ProductImageProps {
  source: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
}

export function ProductImage({ source, alt, className, loading = 'eager' }: ProductImageProps) {
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading={loading}
    />
  )
}
