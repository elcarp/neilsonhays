export default function Testimonial() {

  return (
    <section className="bg-white px-6 py-10 lg:px-8">
      <figure className="mx-auto max-w-2xl">
        <p className="sr-only">5 out of 5 stars</p>
        <div className="flex gap-x-1 text-teal-500">
          <img src="/quotation.svg" alt="quotation" className="w-10 h-10" />
        </div>
        <blockquote className="mt-10 text-2xl tracking-tight text-white bg-teal-500 p-10 rounded-lg sm:text-2xl/9">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80"
            className="size-12 rounded-full bg-gray-50 float-left mr-3"
          />
          <p className="italic">
            I&apos;ve rediscovered my love of reading thanks to this peaceful haven.
          </p>
          <figcaption className="mt-10 flex items-center gap-x-6">
            <div className="text-sm/6">
              <div className="font-semibold">Susan Richards</div>
              <div className="mt-0.5">Member since 2009</div>
            </div>
          </figcaption>
        </blockquote>
      </figure>
    </section>
  )
}
