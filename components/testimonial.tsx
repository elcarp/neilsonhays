export default function Testimonial() {

  return (
    <section className="bg-white px-6 py-10 lg:px-8">
      <figure className="mx-auto max-w-2xl">
        <p className="sr-only">5 out of 5 stars</p>
        <div className="flex gap-x-1 text-teal-500">
          <img src="/quotation.svg" alt="quotation" className="w-10 h-10" />
        </div>
        <blockquote className="mt-10 text-2xl tracking-tight text-white bg-teal-500 p-10 rounded-lg sm:text-2xl/9">
          <p className="italic">
            Neilson Hays Library is a beautiful oasis of calm in the heart of Bangkok - a quiet refuge where history, literature, and community thrive amidst the city&apos;s chaos.
          </p>
          <figcaption className="mt-10 flex items-center gap-x-6">
            <div className="text-sm/6">
              <div className="font-semibold">Michelle Seal</div>
              <div className="mt-0.5">Member since 2021</div>
            </div>
          </figcaption>
        </blockquote>
      </figure>
    </section>
  )
}
