function Hero() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">
          Discover Unique Items
        </h1>
        <p className="text-sm  md:text-xl mb-8">
          Bid on exclusive collectibles, art, and more.
        </p>
        <a
          href="#listings"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-100"
        >
          Explore Listings
        </a>
      </div>
    </section>
  );
}

export default Hero;
