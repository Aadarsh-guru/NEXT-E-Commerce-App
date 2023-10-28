import axios from 'axios';
import MainCarosal from '@/components/carosal/MainCarosal';
import BestSellerCarosal from '@/components/carosal/FeaturedCarosal';
import ProductCard from '@/components/product/ProductCard';

export const metadata = {
  title: `Home - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'this is the book store site.',
}

export const dynamic = 'force-dynamic'

const getBestSellerProducts = async () => {
  try {
    const bestsellerResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get/get-bestseller`);
    return bestsellerResponse.data?.products || [];
  } catch (error) {
    console.log(error);
    return [];
  };
}

const getFeaturedProducts = async () => {
  try {
    const bestsellerResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get/get-featured`);
    return bestsellerResponse.data?.products || [];
  } catch (error) {
    console.log(error);
    return [];
  };
}


const Home = async () => {

  const bestsellerProducts = await getBestSellerProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      <MainCarosal />
      <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
          Discover Worlds Between the Covers
        </div>
        <div className="">
          Elevate Your Mind's Journey with Our Curated Collection: Where Our Books Offer the Literary Comfort You Seek, Providing Elevated Reading Experiences, Page After Page.
        </div>
      </div>
      <div className="md:pb-5 border-b-2">
        <BestSellerCarosal products={bestsellerProducts?.length > 0 ? bestsellerProducts : []} />
      </div>
      <div className="md:block text-2xl md:text-3xl mt-10 font-bold text-center">Featured Products</div>
      {
        featuredProducts?.length === 0 ?
          (
            <div className="w-full min-h-[100vh] flex justify-center items-center">
              <h1 className="text-2xl font-bold text-gray-800">No Product Found.</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {
                featuredProducts?.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))
              }
            </div>
          )
      }
    </div>
  );
};

export default Home;
