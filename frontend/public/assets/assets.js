import coverpageimg from './coverpageimg.jpg'

import BalckDressCoverpage from './BalckDressCoverpage.jpg'
import bluecoverpage from './bluecoverpage.jpg'
import goldencoverpage from './goldencoverpage.jpg'
import shwagLogo from "./SHWAG LOGO.png"




export const assets = {
    shwagLogo,
    coverpageimg,
    BalckDressCoverpage,
    bluecoverpage,
    goldencoverpage
}


export const products = [
    {
        _id: "aaaaa",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: [coverpageimg],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true
    }
    ,
    {
        _id: "aaaaa",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: [goldencoverpage],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true
    }

]