export default function PageTitle({
  title,
  description,
  quote,
}: {
  title: string
  description?: string
  quote?: string
}) {
  return (
    <div className='mx-auto max-w-4xl sm:text-center px-4'>
      <h1 className='text-5xl font-semibold tracking-tight text-pretty text-white sm:text-6xl sm:text-balance'>
        {title}
      </h1>
      {description && (
        <p className='mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-white sm:text-xl/8'>
          {description}
        </p>
      )}
      {quote && (
        <>
          <p className='text-white italic mt-3'>{quote}</p>
        </>
      )}
    </div>
  )
}
