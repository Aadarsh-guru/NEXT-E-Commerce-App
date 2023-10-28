export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/account/:path*",
        "/dashboard/:path*",
        "/wishlist",
        "/cart",
        "/checkout",
        "/success",
        "/failed"
    ]
}