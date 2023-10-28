import ProductCarosal from '@/components/carosal/ProductCarosal'
import RelatedCarosal from '@/components/carosal/RelatedCarosal'
import InteractiveSection from '@/components/product/InteractiveSection';
import ShareSection from '@/components/product/ShareSection';
import axios from 'axios'
import React from 'react'

export async function generateMetadata({ params }) {
    const product = await getProductData(params?.id);
    return {
        title: `${product?.title}`,
        description: `${product?.description}`,
        keywords: `${product?.subTitle}`
    };
}

const getProductData = async (id) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get/get-one/${id}`)
        return response.data?.product;
    } catch (error) {
        console.log(error)
    };
}

const ProductPage = async ({ params }) => {

    const product = await getProductData(params?.id);

    const fetchRelatedProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get/related/${product?.category}/${12}`);
            return response.data?.products;
        } catch (error) {
            console.error(error);
        }
    };

    const relatedProductsData = await fetchRelatedProducts();
    const relatedProducts = relatedProductsData?.filter((p) => p._id !== product._id);

    return (
        <div className="w-full md:py-20">
            <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                {/* left column start */}
                <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                    <ProductCarosal product={product} />
                </div>
                {/* left column end */}

                {/* right column start */}
                <div className="flex-1 py-3">
                    <div className="text-[34px] font-semibold mb-2 leading-10 ">
                        {product?.title}
                    </div>
                    <div className="text-lg font-semibold mb-5">
                        {product?.subTitle}
                    </div>
                    <div className="text-lg font-semibold">
                        MRP : {product?.price}
                    </div>
                    <div className="text-md font-medium text-black/[0.5]">
                        Incl. of taxes
                    </div>
                    <div className="text-md font-medium text-black/[0.5] mb-10">
                        {'(Also includes all application duties.)'}
                    </div>
                    {/* Share and add to wishlist section start here.*/}
                    <ShareSection product={product} />
                    {/* Share and add to wishlist section end here.*/}

                    {/* intereactive section starts here */}
                    <InteractiveSection product={product} />
                    {/* intereactive section ends here  */}

                    {/* product details start */}
                    <div className="">
                        <div className="text-lg font-bold mb-5">Product Details</div>
                        <div className="text-md mb-5">
                            <p>
                                {
                                    product?.description
                                }
                            </p>
                        </div>
                    </div>
                    {/* product details end */}
                </div>
                {/* right colimn end */}
            </div>
            <RelatedCarosal products={relatedProducts} />
        </div>
    )
}

export default ProductPage