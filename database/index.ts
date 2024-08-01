import pages from "@/database/pages.json"
import products from "@/database/products.json"
import privacy from "@/database/privacy.json"
import videos from "@/database/videos.json"
import gateway from "@/database/gateway.json"
import plan from "@/database/plan.json"
import features from "@/database/features.json"
import planFeatures from "@/database/plan-features.json"
import currency from "@/database/currency-rate.json"
import designs from "@/database/designs.json"
import welcomeProducts from "@/database/welcome-product.json"
import limits from "@/database/limits.json"

const db = {
    limits,
    gateway,
    pages,
    products,
    welcomeProducts,
    privacy,
    designs,
    videos,
    plan,
    features,
    planFeatures,
    currency,
    header: {
        title: "Home - InfodCard",
        myaccount: "My Account",
        signIn: "Sign In",
        signUp: "Sign Up",
        products: "Products",
        videos: "Videos",
        cardDesign: "CardDesign",
        review: "Review",
        pricing: "Pricing",
        contact: "Contact",
        about: "About",
    },
    footer: {
        company: {
            title: "Company",
            about: "About",
            contact: "Contact",
            products: "Products",
            reviews: "Reviews",
            partner: "Partner",
            privacyPolicy: "Privacy Policy",
            termsConditions: "Terms & Conditions",
        },
        address: {
            title: "Address",
            company: "Info Digital Card",
            address: "Albarakah Computer Market, New Market, Stkhira - 9400, Bangladesh.",
            phone: "Phone: +880 1912-662277",
            email: "Email: infodcardbd@gmail.com",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.412128542297!2d89.0664193713224!3d22.71291823384631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff5e75ff3c2c39%3A0x3a5b6b4baca90482!2sOnline%20Computer!5e0!3m2!1sen!2sbd!4v1710264162304!5m2!1sen!2sbd",
        },
        socials: [
            { title: "Facebook", url: "https://www.facebook.com" },
            { title: "WhatsApp", url: "https://wa.me/+8801912662277" },
            { title: "YouTube", url: "https://www.youtube.com/@OnlineComputerBd" },
        ],
        products: [
            { title: "Category One", url: "/shop" },
            { title: "Category Two", url: "/shop" },
            { title: "Category Three", url: "/shop" },
        ],
        copyright: "Infodcard © " + new Date().getFullYear()
    }
};

export default db;